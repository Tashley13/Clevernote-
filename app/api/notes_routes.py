from flask import Blueprint, jsonify, request #import request
#request allows users to send HTTP/1.1 requests
from flask_login import login_required, current_user
from app.models import db, Note, Tag
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
@notes_routes.route('', methods=["POST"])
@login_required
def create_note():

    default_notebookId = None
    default_tagId = None

    title=request.json.get('title') #grab the title or create default
    notebook_id=request.json.get('notebookId', default_notebookId) #grab the notebookId
    tag_id = request.json.get('tagId', default_tagId)
    user_id=current_user.id #grab the userId
    new_note=Note(
        title=title,
        content='', #blank content
        userId=current_user.id,
        notebookId=notebook_id,
        tagId=tag_id,
        created_at=datetime.utcnow()
        # updated_at=datetime.now(timezone.utc)
    )
    db.session.add(new_note)
    #add the new note to the session
    db.session.commit()
    #commit the session
    return jsonify(new_note.to_dict())
    #return the note, sending into a dictionary for access later

@notes_routes.route('/tags/<int:noteId>', methods=["POST"])
def add_tag_by_note_id(noteId):
    note=Note.query.get(noteId)
    if not note:
        return jsonify({"errors": "Note not found"}), 400

    tags_by_note = Tag.query.filter_by(user_id=current_user.id, note_id=noteId)
    if not tags_by_note:
        return jsonify({"errors": "Tag not found"}), 404
    note.tags = tags_by_note.to_dict()
    db.session.add(note)
    db.session.commit()
    return jsonify(note.to_dict())

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
    # print(current_data, "CURRENT DATA ======================================================")
    note_to_edit.title = current_data.get('title')
    note_to_edit.content = current_data.get('content')
    note_to_edit.notebookId = current_data.get('notebookId')
    note_to_edit.tagId = current_data.get('tagId')
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
