from sqlalchemy.orm import relationship
# from .note_tag import note_tag
from .db import db, environment, SCHEMA
from datetime import datetime

class Tag(db.Model):
	__tablename__ = 'tags'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True, autoincrement = True)
	tag_name = db.Column(db.String(255), nullable = False)
	created_at = db.Column(db.DateTime, default = datetime.utcnow)
	updated_at = db.Column(db.DateTime, default = datetime.utcnow)

	def to_dict(self):
		return {
			'id': self.id,
			'tag_name': self.tag_name,
			'created_at': self.created_at,
			'updated_at': self.updated_at
		}

	# notes = db.relationship('Note', back_populates='tags', secondary = note_tag)
