import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { taskService } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getAllTasks();
      if (response.success) {
        setTasks(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch tasks');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch tasks';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const trimmedTitle = taskTitle.trim();
    if (!trimmedTitle) {
      toast.error('Please enter a task title');
      return;
    }

    if (trimmedTitle.length > 200) {
      toast.error('Task title must not exceed 200 characters');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await taskService.createTask(trimmedTitle);
      
      if (response.success) {
        setTasks([response.data, ...tasks]);
        setTaskTitle('');
        toast.success('Task added successfully!');
      } else {
        throw new Error(response.message || 'Failed to create task');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create task';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setDeletingId(id);
      setError(null);
      const response = await taskService.deleteTask(id);
      
      if (response.success) {
        setTasks(tasks.filter((task) => task._id !== id));
        toast.success('Task deleted successfully!');
      } else {
        throw new Error(response.message || 'Failed to delete task');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete task';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className=" text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Task Manager
            </h1>
            <p className="text-gray-600  text-xs sm:text-sm">Organize your tasks efficiently</p>
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter a new task..."
                className="flex-1 px-4 py-2 text-xs sm:text-sm h-8 sm:h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                disabled={loading}
                maxLength={200}
              />
              <button
                type="submit"
                disabled={loading || !taskTitle.trim()}
                className=" h-8 sm:h-10 text-xs sm:text-sm px-4 sm:px-6  w-32 sm:w-auto bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                {loading ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Tasks List */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {loading && tasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-xs sm:text-sm text-gray-600">Loading tasks...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-xs sm:text-sm">No tasks yet. Add one above!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border border-gray-200 text-xs sm:text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-medium break-words">{task.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {formatDate(task.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(task._id)}
                    disabled={deletingId === task._id}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                  >
                    {deletingId === task._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Task Count */}
          {tasks.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Total tasks: <span className="font-semibold">{tasks.length}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

