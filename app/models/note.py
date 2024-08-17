from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .db import db, add_prefix_for_prod
from .tags import Tag

note_tag = db.Table(
	"note_tag",
	db.Model.metadata,
	db.Column(
        "tag_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("tags.id"))
        , primary_key = True
    ),
	db.Column(
        "note_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("notes.id")),
        primary_key = True
    )
)

if environment == "production":
    note_tag.schema = SCHEMA

class Note(db.Model):
    __tablename__= 'notes'

    if environment == 'production':
        __table_args__ = {'schema' : SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    notebookId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notebooks.id')))
    tagId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), nullable=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='notes')
    notebooks = db.relationship('Notebook', back_populates='notes')
    tags = db.relationship('Tag', secondary='note_tag', back_populates='notes')

    def to_dict(self):
        return {
            'id': self.id,
            'title' : self.title,
            'content' : self.content,
            'notebookId' : self.notebookId,
            'tagId' : self.tagId,
            'userId' : self.userId,
            'created_at': self.created_at,
            'updated_at' : self.updated_at
        }
