from flask import Flask, render_template, request, redirect, url_for  # Fixed import (Flask should be lowercase)
from datetime import datetime

app = Flask(__name__)

# DATE/TIME FORMAT: "dd/mm/yyyy hh:mm"
CurrentDateTime = datetime.now()

class Task:  # Task class for better structure
    def __init__(self, name, assigned_date, due_date):
        self.name = name
        self.assigned_date = assigned_date
        self.due_date = due_date

    def __repr__(self):  # String representation for easy debugging
        return f"Task('{self.name}', Assigned: {self.assigned_date}, Due: {self.due_date})"

class Course:  # Class for Course
    def __init__(self, course_name):
        self.course_name = course_name # Initializing the course name
        self.tasks = [] # A course can have multiple tasks 

    def add_task(self, task_name, assigned_date, due_date):
        task = Task(task_name, assigned_date, due_date)  # Creating a Task object with the given properties
        self.tasks.append(task)

    def remove_task(self, task_name):
        # Remove a task by name (case-sensitive)
        self.tasks = [task for task in self.tasks if task.name != task_name]

    def show_tasks(self):
        return self.tasks


@app.route('/add_task', methods=['POST']) # Function to add tasks, this is triggered when 'Add Task' button is clicked.
def add_task():
    task_name = request.form['task_name']
    assigned_date = request.form['assigned_date']
    due_date = request.form['due_date']
    # I will handle saving of task to database here
    return redirect(url_for('todo'))  # Redirect to your homepage or task list page

@app.route('/')
def todo():
    return render_template('todo.html')

if __name__ == '__main__':
    app.run(debug=True)
