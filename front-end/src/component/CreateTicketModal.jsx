import { useState } from 'react';

const CreateTicketModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('low');

  const handleSubmit = e => {
    e.preventDefault();
    const newTicket = {
      title,
      description,
      status,
      priority,
    };
    onCreate(e, newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        className="relative z-50 bg-white p-6 rounded-lg max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Create New Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded p-2"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
