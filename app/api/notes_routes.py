from flask import Blueprint, jsonify, request #import request
#request allows users to send HTTP/1.1 requests
# from flask_login import login_required
from app.models import db, Note
from datetime import datetime, timezone


notes_routes = Blueprint('notes', __name__, url_prefix="/notes") #create blueprint for notes

# READ route - get all notes of current user
@notes_routes.route('', methods=['GET'])
# @login_required
def get_notes():
    notes = Note.query.all()
    return jsonify({'notes' : [note.to_dict() for note in notes]})


# CREATE route - create a note for current user
@notes_routes.route('/<int:noteId>', methods=["POST"])
# @login_required
def create_note(userId, notebookId): #need to call userid and notebookid?
    new_note= Note(title='Untitled', user_id=userId, notebook_id=notebookId, content="")
    #create a new note with a placeholder title of 'Untitled' and blank content
    #match the userId and notebookId
    db.session.add(new_note)
    #add the new note to the session
    db.session.commit()
    #commit the session
    return jsonify(new_note.to_dict())
    #return the note, sending into a dictionary for access later


# UPDATE route - update the note for a current user
@notes_routes.route('/<int:noteId>', methods=["PUT"]) #need to access the id integer
# @login_required
def update_note(userId, notebookId, id): #need to call userid, notebookid, and id of current note
    #need to pull previous notes title and content
    current_data = request.get_json() #parse to json if not already
    #create an updated note variable that matches the correct note through id
    updated_note = Note.query.filter(Note.id == id).first()
    #update the title, content, and updated_at
    updated_note.title = current_data.get('title', update_note.title)
    updated_note.content = current_data.get('content', update_note.content)
    updated_note.updated_at = datetime.utcnow
    #commit the session
    db.session.commit()
    #return the note, sending into the a dictionary for access later
    return jsonify(update_note.to_dict())

# DELETE route - delete a note for a current user
@notes_routes.route('/<int:noteId>', methods=["DELETE"])
# @login_required
def delete_note(userId, notebookId, id): #need to call the userid and id of current note
    note = Note.query.filter(Note.id == id).first()
    #need to pull the note to be deleted by matching ids
    db.session.delete(note)
    #delete the note through the session
    db.session.commit()
    #commit the session
    return jsonify({'message' : 'Note successfully deleted'})
    #return successful deletion method
