from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Notebook, db, Note

notebook_routes = Blueprint('notebooks', __name__, url_prefix="/notebooks")

# GET all notebooks for the current user
@notebook_routes.route('')
# @login_required
def get_notebooks():
    notebooks = Notebook.query.filter_by(user_id=current_user.id).all()
    # notebooks = Notebook.query.all()
    return jsonify({'notebooks': [book.to_dict() for book in notebooks]}), 200

@notebook_routes.route('/notes/<int:notebookId>', methods=["POST"])
# @login_required
def get_notes_by_notebook_id(notebookId): #need to call userid and notebookid?
    notes_by_notebook_id= Note.query.filter_by(user_id=current_user.id, notebook_id=notebookId).all()
    db.session.add(notes_by_notebook_id)
    db.session.commit()
    return jsonify(notes_by_notebook_id.to_dict())

# POST create a new notebook for the current user
@notebook_routes.route('', methods=["POST"])
# @login_required
def create_notebook():
    title = request.json.get('title')

    if not title:
        return jsonify({'error': 'Title is required'})

    new_notebook = Notebook(title=title, user_id=current_user.id)
    db.session.add(new_notebook)
    db.session.commit()

    return jsonify(new_notebook.to_dict()), 201

# PUT update a notebook
@notebook_routes.route('/<int:notebook_id>', methods=['PUT'])
# @login_required
def update_notebook(notebook_id):

    notebook = Notebook.query.filter_by(id=notebook_id, user_id=current_user.id).first()

    if notebook is None:
        return jsonify({'error': 'Notebook not found or not authorized'})

    title = request.json.get('title')
    if title:
        notebook.title = title

    db.session.commit()

    return jsonify(notebook.to_dict()), 200

# GET a specific notebook
@notebook_routes.route('/<int:notebook_id>')
# @login_required
def get_notebook_by_id(notebook_id):
    notebook = Notebook.query.filter_by(id=notebook_id, user_id=current_user.id).first()

    if notebook is None:
        return jsonify({'error': 'Notebook not found or not authorized'})

    return jsonify(notebook.to_dict()), 200

# DELETE a specific notebook
@notebook_routes.route('/<int:notebook_id>', methods=["DELETE"])
# @login_required
def delete_notebook(notebook_id):
    notebook = Notebook.query.filter_by(id=notebook_id, user_id=current_user.id).first()

    if notebook is None:
        return jsonify({'error': 'Notebook not found or not authorized'})

    db.session.delete(notebook)
    db.session.commit()

    return jsonify({'message': 'Notebook deleted successfully'}), 200
