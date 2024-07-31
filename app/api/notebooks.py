from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Notebook

notebook_routes = Blueprint('notebooks', __name__, url_prefix="/notebooks")

# GET all notebooks
@notebook_routes.route('/')
@login_required
def get_notebooks():
    notebooks = Notebook.query.all()
    return {'notebooks': [book.to_dict() for book in notebooks]}

# POST create a new notebook
@notebook_routes.route('/', methods=["POST"])
@login_required
def notebooks():
    newNotebook = Notebook()
    # request

    notebooks = Notebook.query.all()
    return {'notebooks': [book.to_dict() for book in notebooks]}

# PUT update a notebook

# GET a specific notebook
@notebook_routes.route('/:notebookId')
@login_required
def get_notebook_by_id(notebookId):
    notebook = Notebook.query.get(notebookId)
    return notebook.to_dict()

# DELETE a specific notebook
