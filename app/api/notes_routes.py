from flask import Blueprint, jsonify, request #import request
#request allows users to send HTTP/1.1 requests
from flask_login import login_required, current_user
from app.models import db, Note
from datetime import datetime, timezone


notes_routes = Blueprint('notes', __name__, url_prefix="/notes") #create blueprint for notes

#create notes route that pulls from notes of current user
@notes_routes.route('', methods=["GET"])
def get_current_notes():
    notes=Note.query.filter_by(userId = current_user.id).all()
    return jsonify([note.to_dict() for note in notes])

# READ route - get specific note of current user
@notes_routes.route('<int:id>', methods=['GET'])
@login_required
def get_notes(id):
    notes = Note.query.get(id)
    return jsonify([notes.to_dict()])


# CREATE route - create a note for current user
@notes_routes.route('/new', methods=["POST"])
@login_required
def create_note():
    title=request.json.get('title', 'Untitled') #grab the title or create default
    # notebook_id=request.json.get('notebookId') #grab the notebookId
    user_id=current_user.id #grab the userId
    new_note=Note(
        title=title,
        content='', #blank content
        userId=current_user.id,
        # notebookId=notebook_id,
        created_at=datetime.utcnow()
        # updated_at=datetime.now(timezone.utc)
    )
    db.session.add(new_note)
    #add the new note to the session
    db.session.commit()
    #commit the session
    return jsonify(new_note.to_dict())
    #return the note, sending into a dictionary for access later


# UPDATE route - update the note for a current user
@notes_routes.route('/<int:id>/edit', methods=["PUT"]) #need to access the id integer
@login_required
def update_note(id):
    note_to_edit=Note.query.get(id)
    if not note_to_edit or note_to_edit.userId != current_user.id:
        return jsonify({"message": "Note not found"}), 404
    #need to pull previous note and check if it exists
    current_data = request.get_json() #parse to json if not already
    if 'title' not in current_data or 'content' not in current_data:
        return jsonify({"message": "Bad Request", "errors": {"title": "Title is required", "content" : "Content is required"}}), 400
    #begin to update variables
    note_to_edit.title = current_data.get('title')
    note_to_edit.content = current_data.get('content')
    note_to_edit.updated_at = datetime.utcnow()
    #commit the session
    db.session.commit()
    #return the note, sending into the a dictionary for access later
    return jsonify(note_to_edit.to_dict())

# DELETE route - delete a note for a current user
@notes_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_note(id): #need to call the userid and id of current note
    delete_note = Note.query.get(id)
    if not delete_note:
        return jsonify({"message" : "note not found"}), 404
    #need to pull the note to be deleted by matching ids
    db.session.delete(delete_note)
    #delete the note through the session
    db.session.commit()
    #commit the session
    return jsonify({'message' : 'Note successfully deleted'})
    #return successful deletion method
