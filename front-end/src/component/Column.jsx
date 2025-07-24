import { Droppable, Draggable } from '@hello-pangea/dnd';
import TicketCard from './TicketCard';

const Column = ({
  status,
  tickets,
  priorityOrder,
  openMenus,
  toggleMenu,
  setShowEditModal,
  setSelectedTicket,
  setShowDeleteModal,
  setTicketToDelete,
  handleTicketClick
}) => {
  const statusLabels = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done',
  };

  return (
    <div className="bg-white min-h-[72vh] rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
        {statusLabels[status]}
      </h2>

      <Droppable droppableId={status}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-[200px]"
          >
            {tickets
              .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
              .map((ticket, index) => (
                <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TicketCard
                        ticket={ticket}
                        index={index}
                        toggleMenu={toggleMenu}
                        openMenus={openMenus}
                        setShowEditModal={setShowEditModal}
                        setSelectedTicket={setSelectedTicket}
                        setShowDeleteModal={setShowDeleteModal}
                        setTicketToDelete={setTicketToDelete}
                        handleTicketClick={handleTicketClick}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
