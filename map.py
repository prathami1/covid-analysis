"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
import os
from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
app = Flask(__name__)

with open('updated_data.json') as f:
   states = json.load(f)
   
average_icu = [(x, states[x]['avg_icu'], states[x]['distributed'], states[x]['administered']) for x in states]

@app.route('/')
def home():
    """Render website's home page."""
    return jsonify(average_icu)

if __name__ == '__main__':
    app.run(debug=True)