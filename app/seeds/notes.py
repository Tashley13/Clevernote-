from app.models import db, Note, User, Tag, Notebook, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
 # Update Jane's notes to belong to userId=1
    janes_notes = Note(title='Jane\' Notes', content='Jane content', notebookId=1, userId=1)

    pauls_notes = Note(title='Paul\'s Notes', content='Paul content', notebookId=2, userId=2)

    bobbys_notes = Note(title='Bobby\'s Notes', content='Bobby content', notebookId=3, userId=3)

    bobbies_notes2 = Note(title='Bobbie\'s Notes2', content='Bobbie content2', notebookId=1, userId=3)

    bobbies_notes3 = Note(title='Bobbie\'s Notes3', content='Bobbie content3', notebookId=1, userId=3)


    tag1=Tag(tag_name='Test Tag 1', user_id=1)
    tag2=Tag(tag_name='Test Tag 2', user_id=2)
    tag3=Tag(tag_name='Demo Tag 1', user_id=3)


    janes_notes.tags.append(tag1)
    pauls_notes.tags.append(tag2)
    bobbys_notes.tags.append(tag3)

    db.session.add(bobbys_notes)
    db.session.add(pauls_notes)
    db.session.add(janes_notes)
    db.session.add(bobbies_notes2)
    db.session.add(bobbies_notes3)

    db.session.add_all([tag1, tag2, tag3])

    db.session.commit()


def undo_notes():
    if environment == 'production':
         db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
         db.session.execute(f"TRUNCATE table {SCHEMA}.note_tag RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))
        db.session.execute(text("DELETE FROM note_tag"))

    db.session.commit()
