from flask import Flask, request, g, session, make_response, render_template, \
    flash, redirect, url_for
from flask.ext import restful
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__)

app.config["MONGODB_SETTINGS"] = {'DB': "my_log"}
app.config["SECRET_KEY"] = "KeepThisS3cr3t"

db = MongoEngine(app)

api = restful.Api(app)
#http://docs.mongodb.org/ecosystem/tutorial/write-a-tumblelog-application-with-flask-mongoengine/ TODO

@app.route('/')
def home():
    return make_response(open('index.html').read())
@app.route('/calculator')
def calculator():
    return make_response(open('physicscalculator/index.html').read())
@app.route('/physics')
def physics():
    return make_response(open('physics/index.html').read())    
@app.route('/mathJax')
def mathJax():
    return make_response(open('mathJax/index.html').read())
@app.route('/scatterPlot')
def scatterPlot():
	return make_response(open('scatterPlot/index.html').read())

class CalculatorAPI(restful.Resource):
    def get(self):
	slash = "\ ".strip()
	responce = [
		   {'name':'Planck constant', 'expression': slash+"hbar", 'value': '$6.62606957'+slash+'times 10^{-34}', 'unit':'m^{2}kg/s'}\
  		  , {'name': 'Mass of an electron', 'expression': "m_e", 'value':'$9.109534'+slash+'times 10^{-31}', 'unit':'kg'}\
  		  , {'name': 'Mass of an proton', 'expression': "m_p", 'value':'$1.672649'+slash+'times 10^{-27}', 'unit':'kg'}]
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
