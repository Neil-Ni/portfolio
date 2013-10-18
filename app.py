from flask import Flask, request, g, session, make_response, render_template, \
    flash, redirect, url_for
app = Flask(__name__)
@app.route('/')
def home():
    return make_response(open('index.html').read())
@app.route('/blog')
def blog():
    return make_response(open('blog/index.php').read())

if __name__ == '__main__':
    app.run(port=8000)
