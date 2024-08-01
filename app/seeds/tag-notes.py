from app.models import db, Note, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_note_tags():
	test_note_tag_1 = Note_Tag(
		tag_id=1
        note_id=4
	)
	test_note_tag_2 = Note_Tag(
		tag_id=2
        note_id=3
	)
	demo_note_tag_1 = Note_Tag(
		tag_id=3
        note_id=2
	)
	demo_note_tag_2 = Note_Tag(
		tag_id=4
        note_id=1
	)

	db.session.add(test_note_tag_1)
	db.session.add(test_note_tag_2)
	db.session.add(demo_note_tag_1)
	db.session.add(demo_note_tag_2)
	db.session.commit()


def undo_note_tags():
	if environment == "production":
		db.session.execute(f"TRUNCATE table {SCHEMA}.notes_tags RESTART IDENTITY CASCADE;")
	else:
		db.session.execute(text("DELETE FROM notes_tags"))
	db.session.commit()
