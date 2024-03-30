from flask import render_template
from . import main
import app.blueprints.main.events as events

#First page user sees. Should be a blurb on the game, and direct users towards either logging in, signing up, creating a character, or changing their active character
@main.route('/')
def index():
    return render_template('index.html')