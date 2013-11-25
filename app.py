from flask import Flask, request, g, session, make_response, render_template, \
    flash, redirect, url_for
from flask.ext import restful

app = Flask(__name__)
api = restful.Api(app)
@app.route('/')
def home():
    return make_response(open('index.html').read())
@app.route('/blog')
def blog():
    return make_response(open('blog/index.php').read())
@app.route('/calculator')
def calculator():
    return make_response(open('physicscalculator/index.html').read())
@app.route('/physics')
def physics():
    return make_response(open('physicscalculator/index.html').read())    

class CalculatorAPI(restful.Resource):
    def get(self):
	slash = "\ ".strip()
	responce = [
		   {'name':'Planck constant', 'expression': slash+"hbar", 'value': '$6.62606957'+slash+'times 10^{-34}', 'unit':'m^{2}kg/s'}\
  		  , {'name': 'Mass of an electron', 'expression': "m_e", 'value':'$9.109534'+slash+'times 10^{-31}', 'unit':'kg'}\
  		  , {'name': 'Mass of an proton', 'expression': "m_p", 'value':'$1.672649'+slash+'times 10^{-27}', 'unit':'kg'}]
	print responce
	return responce
api.add_resource(CalculatorAPI, '/calculator/api')

'''    def function():
		  """, {'name': 'epsilon', 'expression': slash+"epsilon"}\
                  , {'name': 'alpha',  'expression':  slash+"alpha"} \
                  , {'name': 'beta',  'expression':  slash+"beta"} \
                  , {'name': 'gamma',  'expression': slash+"gamma"} \
                  , {'name': 'delta',  'expression':  slash+"delta"}  \
                  , {'name': 'zeta',  'expression':  slash+"zeta"}  \
                  , {'name': 'eta',  'expression':  slash+"eta"}  \
                  , {'name': 'theta',  'expression':  slash+"theta"}  \
                  , {'name': 'rho',  'expression':  slash+"rho"}  \
                  , {'name': 'sigma',  'expression':  slash+"sigma"}  \
                  , {'name': 'phi',  'expression':  slash+"phi"}  \
                  , {'name': 'Pi',  'expression':  slash+"Pi"}  \
                  , {'name': 'Xi',  'expression':  slash+"Xi"}]"""
'''
if __name__ == '__main__':
    app.run(port=8000)
