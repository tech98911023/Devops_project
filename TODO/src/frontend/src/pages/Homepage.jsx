import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Calendar, Tag, CheckCircle2, Circle } from 'lucide-react';

/**
 * Task Application
 * * A clean, serif-style ToDo application featuring:
 * - Task creation with categories and due dates
 * - Real-time task listing
 * - Completion toggling and deletion
 * - Responsive design with custom styling
 */

<<<<<<< HEAD
const App = () => {
=======
const fetchTasks = async () => {
  const res = await fetch(`http://backend:5000/api/v1/tasks/`);
  const data = await res.json();
  setTasks(data);
};


const Homepage = () => {
>>>>>>> dev
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance'];

  // Effect to load initial dummy data or handle state setup
  useEffect(() => {
    // Initial dummy data for demonstration
    const initialTasks = [
      
    ];
    setTasks(initialTasks);
  }, []);

<<<<<<< HEAD
  const addTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Creating the new task object
    const newTask = {
      id: Date.now(),
=======
  await fetch(`http://backend:5000/api/v1/tasks/createTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
>>>>>>> dev
      description,
      category,
      due_date: dueDate,
      completed: false
    };

    // Simulate API call delay
    setTimeout(() => {
      setTasks(prev => [newTask, ...prev]);
      setDescription('');
      setCategory('');
      setDueDate('');
      setIsLoading(false);
    }, 500);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-serif">
      <div className="max-w-3xl mx-auto bg-white border border-gray-400 shadow-sm overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-400 py-6 text-center bg-white">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">ToDo App</h1>
        </header>

        {/* Input Form */}
        <form onSubmit={addTask} className="border-b border-gray-400 bg-white">
          <div className="p-4 border-b border-gray-400">
            <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Description</label>
            <input
              type="text"
              placeholder="What do you want to do?"
              className="w-full text-xl outline-none text-gray-800 placeholder-gray-300 italic bg-transparent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-400">
            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-400">
              <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Category</label>
              <select
                className="w-full bg-transparent text-lg outline-none text-gray-700 appearance-none cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="p-4">
              <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Due-Date</label>
              <input
                type="date"
                className="w-full bg-transparent text-lg outline-none text-gray-700 cursor-pointer"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="p-4 flex justify-center gap-4 bg-gray-50/50">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 bg-[#C1FF72] border border-gray-400 hover:bg-[#A8E65F] active:translate-y-0.5 transition-all font-bold text-gray-800 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(156,163,175,1)] hover:shadow-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Plus size={20} /> {isLoading ? 'Adding...' : 'Add Task'}
            </button>
            <button
              type="button"
              onClick={() => {
                setDescription('');
                setCategory('');
                setDueDate('');
              }}
              className="px-8 py-3 bg-white border border-gray-400 hover:bg-gray-100 active:translate-y-0.5 transition-all font-bold text-gray-800 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(156,163,175,1)] hover:shadow-none"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Task List Section */}
        <div className="bg-white min-h-[300px]">
          {tasks.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-xl text-gray-400 italic">No tasks added yet. Start planning your day!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`group p-6 flex items-center justify-between hover:bg-gray-50 transition-all ${task.completed ? 'bg-gray-50/30' : ''}`}
                >
                  <div className="flex items-start gap-5 flex-1">
                    <button 
                      onClick={() => toggleComplete(task.id)}
                      className={`mt-1 transition-colors ${task.completed ? 'text-[#C1FF72]' : 'text-gray-300 hover:text-gray-400'}`}
                    >
                      {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`text-xl font-medium leading-tight ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {task.description}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-2 py-1 rounded text-gray-500 border border-gray-200">
                          <Tag size={10} /> {task.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                          <Calendar size={12} /> {task.due_date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Delete task"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Info */}
      <footer className="max-w-3xl mx-auto mt-8 text-center">
        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">
          Organize your life • One task at a time
        </p>
      </footer>
    </div>
  );
};

<<<<<<< HEAD
export default App;
=======
export default Homepage;
>>>>>>> dev
