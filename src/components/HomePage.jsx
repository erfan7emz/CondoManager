import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const Home = () => {
  const { userId } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketDialog, setTicketDialog] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', description: '' });
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notificationsResponse = await fetch('http://localhost:8000/notifications');
        const notificationsData = await notificationsResponse.json();
        setNotifications(notificationsData);

        const ticketsResponse = await fetch(`http://localhost:8000/tickets/${userId}`);
        const ticketsData = await ticketsResponse.json();
        setTickets(ticketsData);

        const response = await fetch('http://localhost:8000/facilities');
        const data = await response.json();
        setFacilities(data);

        const responsee = await fetch(`http://localhost:8000/deliveries/${userId}`);
        const dataa = await responsee.json();
        setDeliveries(dataa);

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleCreateTicket = () => {
    setTicketDialog(true);
  };
  const handleTicketSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTicket, createdBy: userId }),
      });
      if (response.ok) {
        setNewTicket({ subject: '', description: '' }); // Reset form
        setTicketDialog(false); // Close dialog
        // Optionally, fetch tickets again to update the list
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const renderTicketDialog = () => (
    <Dialog
      header="Create New Ticket"
      visible={ticketDialog}
      style={{ width: '50vw' }}
      onHide={() => setTicketDialog(false)}
      footer={
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={() => setTicketDialog(false)} className="p-button-text" />
          <Button label="Create" icon="pi pi-check" onClick={handleTicketSubmit} autoFocus />
        </div>
      }
    >
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="subject">Subject</label>
          <InputText id="subject" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} />
        </div>
        <div className="p-field">
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} rows={5} />
        </div>
      </div>
    </Dialog>
  );
  const handleBookFacility = (facilityId) => {
    // Logic to book a facility
  };

  if (loading) return <p>Loading...</p>;

  return (
    // <div>
    //   <h1>User Dashboard</h1>
    //   <Button label="Create Ticket" onClick={handleCreateTicket} />
    //   {renderTicketDialog()}

    //   <h2>Notifications</h2>
    //   <ul>
    //     {notifications.map(notification => (
    //       <li key={notification._id}>{notification.message}</li>
    //     ))}
    //   </ul>

    //   <h2>Available Facilities</h2>
    //   {facilities.map(facility => (
    //     <div key={facility._id}>
    //       <h3>{facility.name}</h3>
    //       <p>{facility.description}</p>
    //       <Button label="Book" onClick={() => handleBookFacility(facility._id)} />
    //     </div>
    //   ))}
    //   <h2>My Tickets</h2>
    //   <ul>
    //     {tickets.map(ticket => (
    //       <li key={ticket._id}>{ticket.subject}</li>
    //     ))}
    //   </ul>
    // </div>
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <Button label="Create Ticket" onClick={handleCreateTicket} />
      {renderTicketDialog()}

      <h2>Announcements</h2>
      <div className="grid">
        {notifications.map(notification => (
          <div key={notification._id} className="grid-item">
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
          </div>
        ))}
      </div>

      <h2>Available Facilities</h2>
      <div className="grid">
        {facilities.map(facility => (
          <div key={facility._id} className="grid-item">
            <h3>{facility.name}</h3>
            <p>{facility.description}</p>
            <Button label="Book" onClick={() => handleBookFacility(facility._id)} />
          </div>
        ))}
      </div>

      <h2>Deliveries for User {userId}</h2>
      <div className="grid">
        {deliveries.map(delivery => (
          <div key={delivery._id} className="grid-item">
            <p>{delivery.description}</p>
          </div>
        ))}
      </div>

      <h2>My Tickets</h2>
      <div className="grid">
        {tickets.map(ticket => (
          <div key={ticket._id} className="grid-item">
            <p>{ticket.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
