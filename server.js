const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user'); // Adjust the path as needed
const Notification = require('./models/notif');
const Ticket = require('./models/ticket');
const Facility = require('./models/facility');
const Delivery = require('./models/delivery');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', // or your specific frontend origin
    optionsSuccessStatus: 200
};
  
app.use(cors(corsOptions));


// mongoose.connect('mongodb+srv://erfansaraj:CytzHE9SI3lpewSO@cluster0.kk6ikm4.mongodb.net/condo');
mongoose.connect('mongodb+srv://condo:Efikhan123@cluster0.hsusjfo.mongodb.net/');



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, password });
      if (user) {
        res.status(200).json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
});



app.post('/users', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
});
  





app.post('/tickets', async (req, res) => {
    const newTicket = new Ticket(req.body);
    try {
      await newTicket.save();
      res.status(201).send(newTicket);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get('/tickets', async (req, res) => {
    try {
      const tickets = await Ticket.find().populate('createdBy', 'name');
      res.status(200).send(tickets);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get('/tickets/:userId', async (req, res) => {
    try {
      const tickets = await Ticket.find({ createdBy: req.params.userId });
      res.status(200).send(tickets);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
app.put('/tickets/:id', async (req, res) => {
    try {
      const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).send(ticket);
    } catch (error) {
      res.status(500).send(error);
    }
});
  


  



app.post('/notifications', async (req, res) => {
    // Assuming Notification model is already defined
    const newNotification = new Notification(req.body);
    try {
      await newNotification.save();
      res.status(201).send(newNotification);
    } catch (error) {
      res.status(500).send(error);
    }
});
  

app.get('/notifications', async (req, res) => {
    try {
      const notifications = await Notification.find().populate('postedBy', 'name');
      res.status(200).send(notifications);
    } catch (error) {
      res.status(500).send(error);
    }
});
  




app.post('/facilities', async (req, res) => {
    try {
      const newFacility = new Facility(req.body);
      await newFacility.save();
      res.status(201).send(newFacility);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});


app.get('/facilities', async (req, res) => {
    try {
      const facilities = await Facility.find();
      res.status(200).send(facilities);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
  
app.get('/deliveries/:userId', async (req, res) => {
    try {
      const deliveries = await Delivery.find({ userId: req.params.userId });
      res.json(deliveries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});



const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
