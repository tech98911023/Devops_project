import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Calendar, Tag, FileText } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchTasks = async () => {
  const res = await fetch(`http://localhost:5000/api/v1/tasks/`);
  const data = await res.json();
  setTasks(data);
};


const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance'];

  const addTask = async (e) => {
  e.preventDefault();

  await fetch(`http://localhost:5000/api/v1/tasks/createTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      category,
      due_date: dueDate
    }),
  });

  setDescription('');
  setCategory('');
  setDueDate('');

  //fetchTasks();
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-serif">
      <div className="max-w-3xl mx-auto bg-white border border-gray-400 shadow-sm overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-400 py-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">ToDo App</h1>
        </header>

        {/* Input Form */}
        <form onSubmit={addTask} className="border-b border-gray-400">
          <div className="p-4 border-b border-gray-400">
            <label className="block text-lg font-medium text-gray-800 mb-1">Description</label>
            <input
              type="text"
              placeholder="what do you want to do?"
              className="w-full text-lg outline-none text-gray-600 placeholder-gray-400 italic"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-400">
            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-400">
              <label className="block text-lg font-medium text-gray-800 mb-1">Category</label>
              <select
                className="w-full bg-transparent text-lg outline-none text-gray-600 appearance-none cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select your category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="p-4">
              <label className="block text-lg font-medium text-gray-800 mb-1">Due-Date</label>
              <input
                type="date"
                className="w-full bg-transparent text-lg outline-none text-gray-600 cursor-pointer"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="p-4 flex justify-center gap-4 bg-gray-50">
            <button
              type="submit"
              className="px-6 py-2 bg-[#C1FF72] border border-gray-400 hover:bg-[#A8E65F] transition-colors font-medium text-gray-800 flex items-center gap-2"
            >
              <Plus size={18} /> Add Task
            </button>
            <button
              type="button"
              onClick={() => {
                setDescription('');
                setCategory('');
                setDueDate('');
              }}
              className="px-6 py-2 bg-[#FFB3B3] border border-gray-400 hover:bg-[#FF9999] transition-colors font-medium text-gray-800 flex items-center gap-2"
            >
              Clear Form
            </button>
          </div>
        </form>

        {/* Task List */}
        <div className="divide-y divide-gray-300">
          {tasks.length === 0 ? (
            <div className="p-12 text-center text-gray-400 italic">
              No tasks added yet. Start planning your day!
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="group p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="w-5 h-5 cursor-pointer accent-[#C1FF72]"
                  />
                  <div className={task.completed ? 'line-through text-gray-400' : 'text-gray-800'}>
                    <p className="text-lg font-medium">{task.description}</p>
                    <div className="flex gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs uppercase tracking-wider bg-gray-200 px-2 py-0.5 rounded text-gray-600">
                        <Tag size={10} /> {task.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={10} /> {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  aria-label="Delete task"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="max-w-3xl mx-auto mt-6 text-center text-gray-500 text-sm">
        Click the checkboxes to mark tasks as completed. Use the buttons to manage your list.
      </div>
    </div>
  );
};

export default Homepage;
