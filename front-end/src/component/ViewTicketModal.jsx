const ViewTicketModal = ({ ticket, onClose }) => (
  <div className="fixed inset-0 z-50 flex justify-center items-center">
    <div className="absolute inset-0 bg-black opacity-70 z-0" onClick={onClose}></div>
    <div className="relative z-50 bg-white p-6 rounded-lg max-w-lg w-full">
      <button
        className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-black"
        onClick={onClose}
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold mb-2 text-indigo-700">{ticket.title}</h2>
      <div className="flex items-center justify-between">
        <p className="text-sm mb-4">
          Status: <span className="text-gray-500">{ticket.status} </span>
        </p>
        <p className="text-sm mb-4">
          Priority:
          <span
            className={`ml-[10px] text-xs font-semibold px-2 py-1 rounded ${
              ticket.priority === 'high'
                ? 'bg-red-500 text-white'
                : ticket.priority === 'medium'
                ? 'bg-yellow-400 text-black'
                : 'bg-green-300 text-black'
            }`}
          >
            {ticket.priority}
          </span>
        </p>
      </div>
      <p className="text-gray-700">{ticket.description}</p>
    </div>
  </div>
);

export default ViewTicketModal;
