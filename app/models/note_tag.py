# from sqlalchemy.schema import Column, ForeignKey, Table
# from .db import db, environment, SCHEMA

# note_tag = Table(
# 	"note_tag",
# 	db.Model.metadata,
# 	Column("tag_id", ForeignKey("tags.id"), primary_key = True),
# 	Column("note_id", ForeignKey("notes.id"), primary_key = True)
# )

# class Note_Tag(db.Model):
# 	__tablename__ = 'notes_tags'

# 	if environment == "production":
# 		__table_args__ = {'schema': SCHEMA}

# 	id = db.Column(db.Integer, primary_key=True, autoincrement = True)
# 	tag_id = db.Column(db.Integer, nullable = False)
# 	note_id = db.Column(db.Integer, nullable = False)

# 	def to_dict(self):
# 		return {
# 			'id': self.id,
# 			'tag_id': self.tag_id,
# 			'note_id': self.note_id
# 		}
