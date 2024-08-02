# from app.models import db, Note, note_tag, Tag, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_note_tags():
# 	test_note_tag_1 = note_tag(
# 		tag_id=1,
#         note_id=4
# 	)
# 	test_note_tag_2 = note_tag(
# 		tag_id=2,
#         note_id=3
# 	)
# 	demo_note_tag_1 = note_tag(
# 		tag_id=3,
#         note_id=2
# 	)
# 	demo_note_tag_2 = note_tag(
# 		tag_id=4,
#         note_id=1
# 	)

# 	db.session.add(test_note_tag_1)
# 	db.session.add(test_note_tag_2)
# 	db.session.add(demo_note_tag_1)
# 	db.session.add(demo_note_tag_2)
# 	db.session.commit()


# def undo_note_tags():
# 	if environment == "production":
# 		db.session.execute(f"TRUNCATE table {SCHEMA}.note_tag RESTART IDENTITY CASCADE;")
# 	else:
# 		db.session.execute(text("DELETE FROM note_tag"))
# 	db.session.commit()
