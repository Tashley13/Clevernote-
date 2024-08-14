from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .note_tag import note_tag

class Note(db.Model):
    __tablename__= 'notes'

    if environment == 'production':
        __table_args__ = {'schema' : SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    notebookId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notebooks.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='notes')
    notebooks = db.relationship('Notebook', back_populates='notes')
    tags = db.relationship('Tag', secondary = note_tag, backref='notes')

    def to_dict(self):
        return {
            'id': self.id,
            'title' : self.title,
            'content' : self.content,
            'notebookId' : self.notebookId,
            'userId' : self.userId,
            'created_at': self.created_at,
            'updated_at' : self.updated_at
        }
