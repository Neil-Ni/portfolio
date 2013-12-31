angular.module('scatterPlotApp.directives', [])
.directive("scatterPlot", function() {
    return {
	restrict: 'A',
	link: function(scope, element, attrs){
	if (!Detector.webgl) Detector.addGetWebGLMessage();
	var clock = new THREE.Clock();
	var SCREEN_HEIGHT = parseInt(attrs.height);
	var SCREEN_WIDTH = parseInt(attrs.width);
	var scatterPlot
	var camera, scene, renderer, mesh, meshes = [];
	var p;
	var paused = false;
	var down = false;
	var sx = 0, sy = 0;

	THREE.LeftAlign = 1;
	THREE.CenterAlign = 0;
	THREE.RightAlign = -1;
	THREE.TopAlign = -1;
	THREE.BottomAlign = 1;
	
	init();
	animate();
	function init() {

	    renderer = new THREE.WebGLRenderer({antialias:true});
	    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	    element.append(renderer.domElement);

	    renderer.setClearColorHex(0xEEEEEE, 1.0);

	    scene = new THREE.Scene();

	    camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
	    camera.position.z = 200;
	    camera.position.x = 0;
	    camera.position.y = 10;
	    scene.add(camera);

	    scatterPlot = new THREE.Object3D();
	    scene.add(scatterPlot);

	    scatterPlot.rotation.y = 0.5;
	    function v(x, y, z) {
		return new THREE.Vector3(x, y, z);
	    }

	    var lineGeo = new THREE.Geometry();
	    lineGeo.vertices.push(
		    v(-50, 0, 0), v(50, 0, 0),
		    v(0, -50, 0), v(0, 50, 0),
		    v(0, 0, -50), v(0, 0, 50),

		    v(-50, 50, -50), v(50, 50, -50),
		    v(-50, -50, -50), v(50, -50, -50),
		    v(-50, 50, 50), v(50, 50, 50),
		    v(-50, -50, 50), v(50, -50, 50),

		    v(-50, 0, 50), v(50, 0, 50),
		    v(-50, 0, -50), v(50, 0, -50),
		    v(-50, 50, 0), v(50, 50, 0),
		    v(-50, -50, 0), v(50, -50, 0),

		    v(50, -50, -50), v(50, 50, -50),
		    v(-50, -50, -50), v(-50, 50, -50),
		    v(50, -50, 50), v(50, 50, 50),
		    v(-50, -50, 50), v(-50, 50, 50),

		    v(0, -50, 50), v(0, 50, 50),
		    v(0, -50, -50), v(0, 50, -50),
		    v(50, -50, 0), v(50, 50, 0),
		    v(-50, -50, 0), v(-50, 50, 0),

		    v(50, 50, -50), v(50, 50, 50),
		    v(50, -50, -50), v(50, -50, 50),
		    v(-50, 50, -50), v(-50, 50, 50),
		    v(-50, -50, -50), v(-50, -50, 50),

		    v(-50, 0, -50), v(-50, 0, 50),
		    v(50, 0, -50), v(50, 0, 50),
		    v(0, 50, -50), v(0, 50, 50),
		    v(0, -50, -50), v(0, -50, 50)
	    );
	    var lineMat = new THREE.LineBasicMaterial({color:0x808080, lineWidth:1});
	    var line = new THREE.Line(lineGeo, lineMat);
	    line.type = THREE.Lines;
	    scatterPlot.add(line);

	    var titleX = createText2D('-X');
	    titleX.position.x = -60;
	    scatterPlot.add(titleX);

	    var titleX = createText2D('X');
	    titleX.position.x = 60;
	    scatterPlot.add(titleX);

	    var titleX = createText2D('-Y');
	    titleX.position.y = -60;
	    scatterPlot.add(titleX);

	    var titleX = createText2D('Y');
	    titleX.position.y = 60;
	    scatterPlot.add(titleX);

	    var titleX = createText2D('-Z');
	    titleX.position.z = -60;
	    scatterPlot.add(titleX);

	    var titleX = createText2D('Z');
	    titleX.position.z = 60;
	    scatterPlot.add(titleX);

	    var pointCount = 10000;
	    var groups = 4;
	    var pointGeo = [];
	    for (var x = 0; x < groups; x++) pointGeo[x] = new THREE.Geometry();

	    var color = [0xff0000, 0x00FF00, 0x0000FF, 0xFF00FF];
	    var group = -1;
	    for (var i = 0; i < pointCount; i++) {
		var index = i % groups;
		if (index == 0) group++;
		var x = Math.random() * 100 - 50;
		var y = x * 0.8 + Math.random() * 20 - 10;
		var z = x * 0.7 + Math.random() * 30 - 15;
		pointGeo[index].vertices.push(new THREE.Vector3(x, y, z));
		pointGeo[index].vertices[group].angle = Math.atan2(z, x);
		pointGeo[index].vertices[group].radius = Math.sqrt(x * x + z * z);
		pointGeo[index].vertices[group].speed = (z / 100) * (x / 100);
	    }

	    for (x = 0; x < groups; x++) createMesh(pointGeo[x], scene, color[x]);

	    renderer.render(scene, camera);
	    element.on('resize', onWindowResize);
	    element.on('mousedown', onmousedown);
	    element.on('mousemove', onmousemove);
	    element.on('mouseup', onmouseup);
	}
      function animate() {
        requestAnimationFrame( animate, renderer.domElement);
        render();
      }
	function createMesh(originalGeometry, scene, color) {
	    var i, c;

	    var vertices = originalGeometry.vertices;
	    var vl = vertices.length;

	    var geometry = new THREE.Geometry();
	    var vertices_tmp = [];

	    for (i = 0; i < vl; i++) {
		geometry.vertices[ i ] = new THREE.Vector3(vertices[i].x, vertices[i].y, vertices[i].z);
		vertices_tmp[ i ] = [ vertices[i].x, vertices[i].y, vertices[i].z, 0, 0 ];
	    }

	    mesh = new THREE.ParticleSystem(geometry, new THREE.ParticleBasicMaterial({ size:1.5, color:color }));

	    scatterPlot.add(mesh);

	    meshes.push({
		mesh:mesh,
		vertices:geometry.vertices,
		vertices_tmp:vertices_tmp,
		vl:vl,
		down:0,
		up:0,
		direction:-1,
		speed:{ up:15, down:20},
		started:false,
		dynamic:true
	    });
	}

	function createTextCanvas(text, color, font, size) {
	    size = size || 24;
	    var canvas = document.createElement('canvas');
	    var ctx = canvas.getContext('2d');
	    var fontStr = (size + 'px ') + (font || 'Arial');
	    ctx.font = fontStr;
	    var w = ctx.measureText(text).width;
	    var h = Math.ceil(size);
	    canvas.width = w;
	    canvas.height = h;
	    ctx.font = fontStr;
	    ctx.fillStyle = color || 'black';
	    ctx.fillText(text, 0, Math.ceil(size * 0.8));
	    return canvas;
	}

	function createText2D(text, color, font, size, segW, segH) {
	    var canvas = createTextCanvas(text, color, font, size);
	    var plane = new THREE.PlaneGeometry(canvas.width, canvas.height, segW, segH);
	    var tex = new THREE.Texture(canvas);
	    tex.needsUpdate = true;
	    var planeMat = new THREE.MeshBasicMaterial({
		map:tex, color:0xffffff, transparent:true
	    });
	    var mesh = new THREE.Mesh(plane, planeMat);
	    mesh.scale.set(0.25, 0.25, 0.25);
	    mesh.doubleSided = true;
	    return mesh;
	}

	function onWindowResize(event) {
	    renderer.setSize($(element).innerWidth, $(element).innerHeight);
	    camera.aspect = $(element).innerWidth / $(element).innerHeight;
	    camera.updateProjectionMatrix();
	    camera.lookAt(scene.position);
	}

	function onmousedown(event) {
	    down = true;
	    sx = event.clientX;
	    sy = event.clientY;
	}

	function onmouseup(event) {
	    down = false;
	}

	function onmousemove(event) {
	    if (down) {
		var dx = event.clientX - sx;
		var dy = event.clientY - sy;
		scatterPlot.rotation.y += dx * 0.01;
		camera.position.y += dy;
		sx += dx;
		sy += dy;
	    }
	}

	var j, i, jl, cm, data, vertices, vertices_tmp, vl, d, vt, delta;
	function render() {
	    console.log("rendering");
		renderer.clear();
		delta = 10 * clock.getDelta();
		delta = delta < 2 ? delta : 2;

		for (j = 0, jl = meshes.length; j < jl; j++) {
		    data = meshes[ j ];
		    mesh = data.mesh;
		    vertices = data.vertices;
		    vertices_tmp = data.vertices_tmp;
		    vl = data.vl;

		    mesh.geometry.verticesNeedUpdate = true;
		}
	    
		camera.lookAt(scene.position);
		renderer.render(scene, camera);
	}
	function onmessage(event) {
	    paused = (event.data == 'pause');
	}
	}
    }
});
