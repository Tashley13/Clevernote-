from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Tag(db.Model):
	__tablename__ = 'tags'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True, autoincrement = True)
	tag_name = db.Column(db.String(255), nullable = False)
	user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
	created_at = db.Column(db.DateTime, default = datetime.utcnow)
	updated_at = db.Column(db.DateTime, default = datetime.utcnow)

	user = db.relationship('User', back_populates='tags')

	def to_dict(self):
		return {
			'id': self.id,
			'tag_name': self.tag_name,
			'user_id': self.user_id,
			'created_at': self.created_at,
			'updated_at': self.updated_at
		}
