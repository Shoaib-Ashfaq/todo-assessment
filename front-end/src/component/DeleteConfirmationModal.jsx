const DeleteConfirmationModal = ({ ticket, onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-70 z-0" onClick={onCancel}></div>

    <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Delete Ticket?</h2>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete "<strong>{ticket.title}</strong>"?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
