from app.models import db, Note, User, Tag, Notebook, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    demo_notes= Note(title='Demo Notes', content='Demo content', notebookId=1, userId=3)

    janes_notes = Note(title='Jane\' Notes', content='Jane content', notebookId=1, userId=1)

    pauls_notes = Note(title='Paul\'s Notes', content='Paul content', notebookId=2, userId=2)

    bobbys_notes = Note(title='Bobby\'s Notes', content='Bobby content', notebookId=3, userId=3)

    tag1=Tag(tag_name='tag 1', user_id=1)
    tag2=Tag(tag_name='tag 2', user_id=1)
    tag3=Tag(tag_name='tag 3', user_id=1)
    tag4=Tag(tag_name='tag 4', user_id=1)

    demo_notes.tags.append(tag1)
    janes_notes.tags.append(tag2)
    pauls_notes.tags.append(tag3)
    bobbys_notes.tags.append(tag4)

    db.session.add(bobbys_notes)
    db.session.add(pauls_notes)
    db.session.add(janes_notes)
    db.session.add(demo_notes)

    db.session.add_all([tag1, tag2, tag3, tag4])

    db.session.commit()


def undo_notes():
    if environment == 'production':
         db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
