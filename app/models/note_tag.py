from sqlalchemy.schema import Column, ForeignKey, Table
from .db import db, add_prefix_for_prod
from .note import Note
from .tags import Tag

note_tag = Table(
	"note_tag",
	db.Model.metadata,
	Column("tag_id", ForeignKey(add_prefix_for_prod("tags.id")), primary_key = True),
	Column("note_id", ForeignKey(add_prefix_for_prod("notes.id")), primary_key = True)
)
