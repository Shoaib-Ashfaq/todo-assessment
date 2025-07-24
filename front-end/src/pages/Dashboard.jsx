import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import EditTicketModal from '../component/EditTicketModal';
import ViewTicketModal from '../component/ViewTicketModal';
import DeleteConfirmationModal from '../component/DeleteConfirmationModal';
import CreateTicketModal from '../component/CreateTicketModal';

const statusLabels = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

const Dashboard = () => {
  const [columns, setColumns] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      const res = await axios.get('/tickets', { withCredentials: true });

      const grouped = {
        todo: [],
        inprogress: [],
        done: [],
      };

      res.data.forEach(ticket => {
        grouped[ticket.status].push(ticket);
      });

      setColumns(grouped);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/login');
      } else {
        console.error('Failed to fetch tickets', err);
      }
    }
  };

  const handleTicketUpdate = async updatedTicket => {
    try {
      await axios.put(`/tickets/${updatedTicket._id}`, updatedTicket, {
        withCredentials: true,
      });

      fetchTickets();
      setShowEditModal(false);
      setSelectedTicket(null);
    } catch (err) {
      console.error('Failed to update ticket:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/tickets/${ticketToDelete._id}`, {
        withCredentials: true,
      });
      setShowDeleteModal(false);
      setTicketToDelete(null);
      fetchTickets();
    } catch (err) {
      console.error('Failed to delete ticket:', err);
    }
  };

  const handleCreateTicket = async (e, newTicket) => {
    e.preventDefault();
    try {
      await axios.post('/tickets', newTicket, {
        withCredentials: true,
      });
      fetchTickets();
      setShowCreateModal(false);
    } catch (err) {
      console.error('Failed to create ticket:', err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (!e.target.closest('.dropdown-toggle') && !e.target.closest('.dropdown-menu')) {
        setOpenMenus({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDragEnd = async result => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol && source.index === destination.index) return;

    const draggedItem = { ...columns[sourceCol][source.index], status: destCol };

    const updatedSource = Array.from(columns[sourceCol]);
    updatedSource.splice(source.index, 1);

    const updatedDest = Array.from(columns[destCol]);
    updatedDest.splice(destination.index, 0, draggedItem);

    const newColumns = {
      ...columns,
      [sourceCol]: updatedSource,
      [destCol]: updatedDest,
    };

    setColumns(newColumns);

    try {
      await axios.put(
        `/tickets/${draggedItem._id}`,
        {
          status: destCol,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error('Failed to update ticket status', err);
    }
  };

  const toggleMenu = ticketId => {
    setOpenMenus(prev => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  const handleTicketClick = ticket => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTicket(null);
  };

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  return (
    <>
      <Navbar />

      <div className="bg-gray-100">
        <div className="max-w-[2000px] mx-auto p-6 pb-10">
          <div className="flex justify-end items-center bg-transparent">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mt-[20px]"
            >
              Create A New Task
            </button>
          </div>
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Task Dashboard</h1>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(columns).map(([status, tickets]) => (
                <div key={status} className="bg-white min-h-[72vh] rounded-lg shadow p-4">
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
                                  className="relative p-4 bg-indigo-50 rounded shadow hover:bg-indigo-100 cursor-pointer"
                                >
                                  <span
                                    className={`absolute top-2 right-[30px] text-xs font-semibold px-2 py-1 rounded ${
                                      ticket.priority === 'high'
                                        ? 'bg-red-500 text-white'
                                        : ticket.priority === 'medium'
                                        ? 'bg-yellow-400 text-black'
                                        : 'bg-green-300 text-black'
                                    }`}
                                  >
                                    {ticket.priority}
                                  </span>

                                  <div className="dropdown-toggle absolute top-2 right-2">
                                    <button
                                      className="dropdown-toggle"
                                      onClick={() => toggleMenu(ticket._id)}
                                    >
                                      <MoreVertical size={16} />
                                    </button>
                                    {openMenus[ticket._id] && (
                                      <div className="absolute right-0 top-8  bg-white shadow rounded z-10 w-[150px]">
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

                                  <div onClick={() => handleTicketClick(ticket)}>
                                    <h3 className="font-medium text-indigo-700">{ticket.title}</h3>
                                    <p className="text-sm text-gray-600">
                                      {ticket.description?.length > 60
                                        ? `${ticket.description.slice(0, 60)}...`
                                        : ticket.description}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>

      {showEditModal && selectedTicket && (
        <EditTicketModal
          ticket={selectedTicket}
          onClose={() => setShowEditModal(false)}
          onSave={handleTicketUpdate}
        />
      )}

      {showDeleteModal && ticketToDelete && (
        <DeleteConfirmationModal
          ticket={ticketToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showModal && selectedTicket && (
        <ViewTicketModal ticket={selectedTicket} onClose={closeModal} />
      )}

      {showCreateModal && (
        <CreateTicketModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(e, newTicket) => {
            handleCreateTicket(e, newTicket);
            fetchTickets();
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
