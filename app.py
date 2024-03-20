from flask import Flask, render_template, request, jsonify
from models import Task, db
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, template_folder="template")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return render_template("index.html")

@app.route('/tasks', methods=['GET'])
def list_tasks():
    
    tasks = Task.query.all()
    
    return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed':task.completed} for task in tasks]), 200


@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = Task(title=data['title'], description=data['description'], completed=data['completed'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task added successfully', 'task': {'id': new_task.id, 'title': new_task.title, 'description': new_task.description, 'completed': new_task.completed}}), 201


@app.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = Task.query.get_or_404(id)
    return jsonify({
        'id': task.id,
        'title': task.title,
        'description': task.description
    }), 200
# @app.route('/tasks', methods=['POST'])
# def add_task():
#     data = request.json
#     task = Task(title=data['title'], description=data['description'], completed=data['completed'])
#     db.session.add(task)
#     db.session.commit()
#     return jsonify({'message': 'Task added'}), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.json
    task = Task.query.get_or_404(id)
    task.title = data['title']
    task.description = data['description']
    db.session.commit()
    return jsonify({'message': 'Task updated'}), 200

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'}), 200

if __name__ == "__main__":
    
    app.run(debug=True)
    