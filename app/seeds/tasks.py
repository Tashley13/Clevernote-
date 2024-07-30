from app.models import db, Task, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_tasks():
    # Retrieve existing users
    user1 = User.query.filter_by(username='Demo').first()
    user2 = User.query.filter_by(username='marnie').first()

    # Check if tasks already exist
    if not Task.query.filter_by(title='Task 1').first():
        task1 = Task(
            title='Task 1', body='Task 1 body', status=False, due_date=datetime(2024, 8, 1), priority=1, user_id=user1.id)
        db.session.add(task1)

    if not Task.query.filter_by(title='Task 2').first():
        task2 = Task(
            title='Task 2', body='Task 2 body', status=True, due_date=datetime(2024, 8, 2), priority=2, user_id=user1.id)
        db.session.add(task2)

    if not Task.query.filter_by(title='Task 3').first():
        task3 = Task(
            title='Task 3', body='Task 3 body', status=False, due_date=datetime(2024, 8, 3), priority=3, user_id=user2.id)
        db.session.add(task3)

    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
