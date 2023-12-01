import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import './ManagerDashboard.css'

const ManagerDashboard = ({ userId }) => {
  const [tickets, setTickets] = useState([]);
  const [newNotification, setNewNotification] = useState({ title: '', message: '' });
  const [notificationDialog, setNotificationDialog] = useState(false);
  const [facilityDialog, setFacilityDialog] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState({ name: '', description: '', available: true });

  useEffect(() => {
    // Fetch all tickets
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/tickets');
        const data = await response.json();
        setTickets(data);

        const facility = await fetch('http://localhost:8000/facilities');
        const dataF = await facility.json();
        setFacilities(dataF);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchData();
  }, []);

  const renderNotificationDialog = () => (
    <Dialog
      header="Create New Notification"
      visible={notificationDialog}
      style={{ width: '50vw' }}
      onHide={() => setNotificationDialog(false)}
      footer={
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={() => setNotificationDialog(false)} className="p-button-text" />
          <Button label="Create" icon="pi pi-check" onClick={handleCreateNotification} autoFocus />
        </div>
      }
    >
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="notificationTitle">Title</label>
          <InputText id="notificationTitle" value={newNotification.title} onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })} />
        </div>
        <div className="p-field">
          <label htmlFor="notificationMessage">Message</label>
          <InputTextarea id="notificationMessage" value={newNotification.message} onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })} rows={4} />
        </div>
      </div>
    </Dialog>
  );
  
  const handleCreateFacility = async () => {
    try {
      const response = await fetch('http://localhost:8000/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFacility),
      });
      if (response.ok) {
        // Clear form and maybe fetch facilities again or update the list
        setNewFacility({ name: '', description: '', available: true });
      }
      setFacilityDialog(false);
    } catch (error) {
      console.error('Error creating facility:', error);
    }
  };

  const renderFacilityDialog = () => (
    <Dialog
      header="Add New Facility"
      visible={facilityDialog}
      onHide={() => setFacilityDialog(false)}
      footer={
        <div>
          <Button label="Cancel" onClick={() => setFacilityDialog(false)} />
          <Button label="Create" onClick={handleCreateFacility} />
        </div>
      }
    >
      {/* Form fields for facility creation */}
      <InputText value={newFacility.name} onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })} placeholder="Facility Name" />
      <InputTextarea value={newFacility.description} onChange={(e) => setNewFacility({ ...newFacility, description: e.target.value })} placeholder="Description" />
    </Dialog>
  );

  const handleCreateNotification = async () => {
    // API call to create a new notification
    try {
      const response = await fetch('http://localhost:8000/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotification),
      });
      if (response.ok) {
        // Clear form and maybe fetch notifications again or update the list
        setNewNotification({ title: '', message: '' });
      }
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  return (
    // <div>
    //   <h1>Manager Dashboard</h1>
      
    //   <Button label="Create Notification" onClick={() => setNotificationDialog(true)} />
    //   {renderNotificationDialog()}

    //   <h2>Available Facilities</h2>
    //   {facilities.map(facility => (
    //     <div key={facility._id}>
    //       <h3>{facility.name}</h3>
    //       <p>{facility.description}</p>
    //     </div>
    //   ))}
    //   <Button label="Add Facility" onClick={() => setFacilityDialog(true)} />
    //   {renderFacilityDialog()}

    //   <h2>All Tickets</h2>
    //   <ul>
    //     {tickets.map(ticket => (
    //       <li key={ticket._id}>
    //         {ticket.subject} - {ticket.description}
    //         {/* Add a button or form to respond to the ticket */}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="dashboard">
      <h1>Manager Dashboard</h1>
      
      {/* Notification Section */}
      <Button label="Create Announcements" onClick={() => setNotificationDialog(true)} />
      {renderNotificationDialog()}

      {/* Facility Section */}
      <h2>Available Facilities</h2>
      <div className="grid">
        {facilities.map(facility => (
          <div key={facility._id} className="grid-item">
            <h3>{facility.name}</h3>
            <p>{facility.description}</p>
          </div>
        ))}
      </div>
      <Button label="Add Facility" onClick={() => setFacilityDialog(true)} />
      {renderFacilityDialog()}

      {/* Tickets Section */}
      <h2>All Tickets</h2>
      <div className="grid">
        {tickets.map(ticket => (
          <div key={ticket._id} className="grid-item">
            <p>{ticket.subject} - {ticket.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
