from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Notebook, db

notebook_routes = Blueprint('notebooks', __name__, url_prefix="/notebooks")

# GET all notebooks
@notebook_routes.route('/')
@login_required
def get_notebooks():
    notebooks = Notebook.query.all()
    return jsonify({'notebooks': [book.to_dict() for book in notebooks]})

# POST create a new notebook
@notebook_routes.route('/', methods=["POST"])
@login_required
def create_notebook():
    title = request.json.get('title')
    user_id = request.json.get('user_id')

    if not title:
        return jsonify({'error': 'Title is required'})

    new_notebook = Notebook(title=title, user_id=user_id)
    db.session.add(new_notebook)
    db.session.commit()

    return jsonify(new_notebook.to_dict())

# PUT update a notebook
def update_notebook(notebook_id):
    notebook = Notebook.query.get(notebook_id)

    if notebook is None:
        return jsonify({'error': 'Notebook not found'})

    title = request.json.get('title')
    if title:
        notebook.title = title

    db.session.commit()

    return jsonify(notebook.to_dict())

# GET a specific notebook
@notebook_routes.route('/:notebookId')
@login_required
def get_notebook_by_id(notebookId):
    notebook = Notebook.query.get(notebookId)

    if notebook is None:
        return jsonify({'error': 'Notebook not found'})

    return notebook.to_dict()

# DELETE a specific notebook
def delete_notebook(notebook_id):
    notebook = Notebook.query.get(notebook_id)

    if notebook is None:
        return jsonify({'error': 'Notebook not found'})

    db.session.delete(notebook)
    db.session.commit()

    return jsonify({'message': 'Notebook deleted successfully'})
