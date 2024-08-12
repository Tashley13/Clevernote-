from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, db

tag_routes = Blueprint('tags', __name__, url_prefix="/tags")

#GET returns all tags
@tag_routes.route('', methods=['GET'])
def get_tags():
	tags = Tag.query.filter_by(user_id = current_user.id).all()
	return jsonify([tag.to_dict() for tag in tags])

@tag_routes.route('/<int:id>', methods=['GET'])
def get_details(id):
	tag = Tag.query.get(id)
	return jsonify([tag.to_dict()])

# POST create a new tag
@tag_routes.route('', methods=["POST"])
# @login_required
def create_tag():
	tag_name = request.json.get('tagName')

	if not tag_name:
		return jsonify({'error': "Tag name is required"})

	new_tag = Tag(tag_name=tag_name, user_id=current_user.id)
	db.session.add(new_tag)
	db.session.commit()

	return jsonify(new_tag.to_dict())

# PUT update tag
@tag_routes.route('/<int:id>', methods=["PUT"])
def update_tag(id):
	edit_tag = Tag.query.get(id)

	if edit_tag is None:
		return jsonify({'error': 'Tag not found'})

	tag_name = request.json.get('tag_name')
	if tag_name:
		edit_tag.tag_name = tag_name

	db.session.commit()

	return jsonify(edit_tag.to_dict())

@tag_routes.route('/<int:id>', methods=["DELETE"])
def delete_tag(id):
	dead_tag = Tag.query.get(id)

	if dead_tag is None:
		return jsonify({'error': 'Tag not found'})

	db.session.delete(dead_tag)
	db.session.commit()

	return jsonify({'message': 'Tag deleted successfully'})

@tag_routes.route('/search')
def search_by_tag():
	search_tag = Tag.query.filter(Tag.tag_name.ilike(f'%{tag_name}%'). Tag.user_id == current_user.id).all()

	if not search_tag:
		return jsonify({'error': 'Tag not found'})
	return jsonify([tag.to_dict() for tag in search_tag])
