from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Notebook(db.Model):
    __tablename__ = "notebooks"

    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='notebooks')
    notes = db.relationship('Note', back_populates='notebooks')

    def _repr_(self):
          return f'Notebook {self.title}'

    def to_dict(self):
          return {
                'id': self.id,
                'title': self.title,
                'user_id': self.user_id,
                'created_at': self.created_at,
                'updated_at': self.updated_at
          }
