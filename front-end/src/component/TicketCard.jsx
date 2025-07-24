import { MoreVertical } from 'lucide-react';

const TicketCard = ({
  ticket,
  index,
  toggleMenu,
  openMenus,
  setShowEditModal,
  setSelectedTicket,
  setShowDeleteModal,
  setTicketToDelete,
  handleTicketClick,
}) => {
  const getPriorityClass = priority => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-400 text-black';
      case 'low':
      default:
        return 'bg-green-300 text-black';
    }
  };

  return (
    <div
      className="relative p-4 bg-indigo-50 rounded shadow hover:bg-indigo-100 cursor-pointer"
      onClick={() => handleTicketClick(ticket)}
    >
      <span
        className={`absolute top-2 right-[30px] text-xs font-semibold px-2 py-1 rounded ${getPriorityClass(
          ticket.priority
        )}`}
      >
        {ticket.priority}
      </span>

      <div className="dropdown-toggle absolute top-2 right-2" onClick={e => e.stopPropagation()}>
        <button className="dropdown-toggle" onClick={() => toggleMenu(ticket._id)}>
          <MoreVertical size={16} />
        </button>
        {openMenus[ticket._id] && (
          <div className="absolute right-0 top-8 bg-white shadow rounded z-10 w-[150px]">
            <button
              className="w-full text-center py-3 hover:bg-gray-100 text-sm"
              onClick={() => {
                setSelectedTicket(ticket);
                setShowEditModal(true);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                setTicketToDelete(ticket);
                setShowDeleteModal(true);
              }}
              className="w-full text-center py-3 hover:bg-gray-100 text-sm border-t"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <h3 className="font-medium text-indigo-700">{ticket.title}</h3>
      <p className="text-sm text-gray-600">
        {ticket.description?.length > 60
          ? `${ticket.description.slice(0, 60)}...`
          : ticket.description}
      </p>
    </div>
  );
};

export default TicketCard;
