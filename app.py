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
    return make_response(open('physicscalculator/app/index.html').read())


class CalculatorAPI(restful.Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(CalculatorAPI, '/calculator/api')

if __name__ == '__main__':
    app.run(port=8000)
