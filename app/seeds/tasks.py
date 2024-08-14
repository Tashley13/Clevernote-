from app.models import db, Task, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_tasks():
    task1 = Task(
        title='Task 1',
        body='Task 1 body',
        status=False,
        due_date=datetime(2024, 8, 1),
        priority=1,
        user_id=1  # Hardcoded user_id
    )
    db.session.add(task1)

    task2 = Task(
        title='Task 2',
        body='Task 2 body',
        status=True,
        due_date=datetime(2024, 8, 2),
        priority=2,
        user_id=1  # Hardcoded user_id
    )
    db.session.add(task2)

    task3 = Task(
        title='Task 3',
        body='Task 3 body',
        status=False,
        due_date=datetime(2024, 8, 3),
        priority=3,
        user_id=2  # Hardcoded user_id
    )
    db.session.add(task3)

    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")

    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
