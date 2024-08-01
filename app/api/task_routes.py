from flask import Blueprint, request, jsonify
from app.models import db, Task
from datetime import datetime, timezone
from flask_login import login_required, current_user

task_routes = Blueprint('tasks', __name__)


# Create a new task

@task_routes.route('', methods=['POST'])
@login_required
def create_task():
    data = request.get_json()
    if 'title' not in data or 'description' not in data:
        return jsonify({"message": "Bad Request", "errors": {"title": "Title is required", "description": "Description is required"}}), 400

    task = Task(
        title=data['title'],
        body=data.get('description'),
        status=data.get('status', 'pending') == 'completed',
        due_date=datetime.strptime(data['due_date'], '%Y-%m-%d') if data.get('due_date') else None,
        priority=data.get('priority', 1),
        user_id=current_user.id,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)

    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201


# Get All Tasks

@task_routes.route('', methods=['GET'])
@login_required
def get_tasks():
    tasks = Task.query.filter_by(user_id=current_user.id).all()
    return jsonify([task.to_dict() for task in tasks]), 200


# Get a single task

@task_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_task(id):
    task = Task.query.get(id)
    if not task or task.user_id != current_user.id:
        return jsonify({"message": "Task not found"}), 404
    return jsonify(task.to_dict()), 200


# Update a task

@task_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_task(id):
    task = Task.query.get(id)
    if not task or task.user_id != current_user.id:
        return jsonify({"message": "Task not found"}), 404

    data = request.get_json()
    if 'title' not in data or 'description' not in data:
        return jsonify({"message": "Bad Request", "errors": {"title": "Title is required", "description": "Description is required"}}), 400

    task.title = data['title']
    task.body = data.get('description')
    task.status = data.get('status', task.status)
    task.due_date = datetime.strptime(data['due_date'], '%Y-%m-%d') if data.get('due_date') else task.due_date
    task.priority = data.get('priority', task.priority)
    task.updated_at = datetime.now(timezone.utc)

    db.session.commit()
    return jsonify(task.to_dict()), 200


# Delete a task

@task_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
    task = Task.query.get(id)
    if not task or task.user_id != current_user.id:
        return jsonify({"message": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully."}), 200


# Mark a task as completed

@task_routes.route('/<int:id>/completed', methods=['PATCH'])
@login_required
def mark_task_completed(id):
    task = Task.query.get(id)
    if not task or task.user_id != current_user.id:
        return jsonify({"message": "Task not found"}), 404

    task.status = True
    task.updated_at = datetime.now(timezone.utc)

    db.session.commit()
    return jsonify(task.to_dict()), 200


# Search tasks by title

@task_routes.route('/search', methods=['GET'])
@login_required
def search_tasks():
    title = request.args.get('title', '')
    tasks = Task.query.filter(Task.title.ilike(f'%{title}%'), Task.user_id == current_user.id).all()
    if not tasks:
        return jsonify({"message": "No tasks found"}), 404
    return jsonify([task.to_dict() for task in tasks]), 200


# Filter tasks by status

@task_routes.route('/filter', methods=['GET'])
@login_required
def filter_tasks():
    status = request.args.get('status')
    tasks = Task.query.filter_by(status=(status == 'completed'), user_id=current_user.id).all()
    if not tasks:
        return jsonify({"message": "No tasks found"}), 404
    return jsonify([task.to_dict() for task in tasks]), 200
