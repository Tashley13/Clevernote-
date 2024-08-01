from app.models import db, Note, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    demo_notes = Note.query.filter_by(username='Demo').first()
    if not demo_notes:
        demo_notes= Note(title='Demo Notes', content='Demo content', notebookId=4, userId=4)
        db.session.add(demo_notes)

    janes_notes = Note.query.filter_by(user_id=1).first()
    if not janes_notes:
        janes_notes = Note(title='Jane\' Notes', content='Jane content', notebookId=1, userId=1)
        db.session.add(janes_notes)

    pauls_notes = Note.query.filter_by(user_id=2).first()
    if not pauls_notes:
        pauls_notes = Note(title='Paul\'s Notes', content='Paul content', notebookId=2, userId=2)
        db.session.add(pauls_notes)

    bobbys_notes = Note.query.filter_by(user_id=3).first()
    if not bobbys_notes:
        bobbys_notes = Note(title='Bobby\'s Notes', content='Bobby content', notebookId=3, userId=3)
        db.session.add(bobbys_notes)

    db.session.commit()


def undo_notes():
    if environment == 'production'
         db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

        db.session.commit()
