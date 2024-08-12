from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
	test_tag_1 = Tag(
		tag_name="Test Tag 1", user_id=1
	)
	test_tag_2 = Tag(
		tag_name="Test Tag 2", user_id=1
	)
	demo_tag_1 = Tag(
		tag_name="Demo Tag 1", user_id=1
	)
	demo_tag_2 = Tag(
		tag_name="Demo Tag 2", user_id=1
	)

	db.session.add(test_tag_1)
	db.session.add(test_tag_2)
	db.session.add(demo_tag_1)
	db.session.add(demo_tag_2)
	db.session.commit()


def undo_tags():
	if environment == "production":
		db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
	else:
		db.session.execute(text("DELETE FROM tags"))
	db.session.commit()
