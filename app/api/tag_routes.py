from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, db

tag_routes = Blueprint('tags', __name__, url_prefix="/tags")


# POST create a new tag
@tag_routes.route('/', methods=["POST"])
# @login_required
def create_tag():
	tag_name = request.json.get('tag_name')

	if not tag_name:
		return jsonify({'error': "Tag name is required"})

	new_tag = Tag(tag_name=tag_name)
	db.session.add(new_tag)
	db.session.commit()

	return jsonify(new_tag.to_dict())

# PUT update tag
@tag_routes.route('/:tagId', methods=["PUT"])
def update_tag(tag_id):
	edit_tag = Tag.query.get(tag_id)

	if edit_tag is None:
		return jsonify({'error': 'Tag not found'})

	tag_name = request.json.get('tag_name')
	if tag_name:
		edit_tag.tag_name = tag_name

	db.session.commit()

	return jsonify(edit_tag.to_dict())

def delete_tag(tag_id):
	dead_tag = Tag.query.get(tag_id)

	if dead_tag is None:
		return jsonify({'error': 'Tag not found'})

	db.session.delete(dead_tag)
	db.session.commit()

	return jsonify({'message': 'Tag deleted successfully'})

