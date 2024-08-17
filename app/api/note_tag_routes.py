from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note, Tag

note_tag_routes= Blueprint('note_tags', __name__)

@note_tag_routes.route('/<int:note_id>/tags', methods=['POST'])
def add_note_tag(note_id):
    note_tag_data=request.get_json() #grab the data
    tag_id=data.get('tag_id') #grab the tag_id
    note = Note.query.get(note_id)
