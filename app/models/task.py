from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=True)
    status = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.Date, nullable=True)
    priority = db.Column(db.Integer, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='tasks')

    def __repr__(self):
        return f'<Task {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'status': self.status,
            'due_date': self.due_date,
            'priority': self.priority,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
