import sqlite3

# 🔹 CREATE TASK
def create_task(data, db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO tasks (description, category, due_date, completed)
        VALUES (?, ?, ?, ?)
    """, (
        data.get("description"),
        data.get("category"),
        data.get("due_date"),
        data.get("completed", False)
    ))
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()

    return {
        "id": task_id,
        "message": "Task created"
    }


# 🔹 GET ALL TASKS
def get_all_tasks(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT id, description, category, due_date, completed FROM tasks")
    rows = cursor.fetchall()
    conn.close()

    tasks = []
    for row in rows:
        tasks.append({
            "id": row[0],
            "description": row[1],
            "category": row[2],
            "due_date": row[3],
            "completed": bool(row[4])
        })

    return tasks