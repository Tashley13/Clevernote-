from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notebooks import seed_notebooks, undo_notebooks
from .tasks import seed_tasks, undo_tasks
from .notes import seed_notes, undo_notes
from .note_tags import seed_note_tags, undo_note_tags
from .tags import seed_tags, undo_tags

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_notebooks()
        undo_tasks()
        undo_tags()
        undo_note_tags()
    seed_users()
    seed_notebooks()
    seed_users()
    seed_tasks()
    seed_tags()
    seed_note_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_notebooks()
    undo_tasks()
    undo_tags()
    undo_note_tags()
    # Add other undo functions here
