from flask import render_template
from . import main

#Only page necessary in case someone decides they're going to put the API url in.
@main.route('/')
def index():
    return render_template('index.html')