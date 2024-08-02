from flask import Blueprint, jsonify, request
# from flask_login import login_required
from app.models import db, Note

note_routes = Blueprint('notes', __name__, url_prefix="/notes") #create blueprint for notes

# READ route - get all notes of current user
@note_routes.route('/')
# @login_required
def get_notes():
    return 'Hello World Check'
    # notes = Note.query.all()
    # return jsonify({'notes' : [book_to_dict() for note in notes]})


# CREATE route - create a note for current user
@note_routes.route('/notes')
@login_required
def create_note(): #need to call userid and notebookid?
#create a new note with a placeholder title of 'Untitled' and blank content
#match the userId and notebookId
#add the new note to the session
#commit the session
#return the note, sending into a dictionary for access later


# UPDATE route - update the note for a current user
@note_routes.route('/:noteId')
@login_required
def update_note(): #need to call userid, notebookid, and id of current note
#need to pull previous notes title and content
#create an updated note variable that matches the correct note through id
#update the title, content, and updated_at
#commit the session
#return the note, sending into the a dictionary for access later

# DELETE route - delete a note for a current user
@note_routes.route('/:noteId')
@login_required
def delete_note(): #need to call the userid and id of current note
#need to pull the note to be deleted by matching ids
#delete the note through the session
#commit the session
#return successful deletion method
