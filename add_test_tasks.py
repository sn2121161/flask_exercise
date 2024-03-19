from models import Task, db  
from app import app

def insert_sample_tasks():
    
    tasks_to_add = [
    {
        "title": "Upload exchange rates to GCS-O system",
        "description": "1. Download from Refinitiv website its daily exchange rate and send the info via email, update the rates in Access.\n2. Upload into GCS-O.",
        "completed" : True
    },
    {
        "title": "Update Security Price",
        "description": "1. Retrieve securities price from Bloomberg and Refinitiv daily feeds.\n2. Update security price into GCS-O system for each ISIN.",
        "completed" : False
    },
    {
        "title": "Reconciliation",
        "description": "1. Reconcile the ISINs and holdings against our own record.\n2. Place the copies of MT535 with the rest of the voucher.",
        "completed" : True
    },
]
    
    with app.app_context():
        for task_info in tasks_to_add:
            task = Task(title=task_info['title'], description=task_info['description'], completed=task_info['completed'])
            db.session.add(task)
        db.session.commit()
        print("Sample tasks added to the database.")

if __name__ == '__main__':
    
    insert_sample_tasks()
    