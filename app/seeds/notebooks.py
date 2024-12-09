from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_notebooks():
    janes_notebook = Notebook(
        title="Jane's Notebook", user_id=1)
    pauls_notebook = Notebook(
        title="Paul's Notebook", user_id=2)
    bobbys_notebook = Notebook(
        title="Bobby's Notebook", user_id=3)
    demo_notebook = Notebook(
        title="Demo's Notebook", user_id=4)

    db.session.add(janes_notebook)
    db.session.add(pauls_notebook)
    db.session.add(bobbys_notebook)
    db.session.add(demo_notebook)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
