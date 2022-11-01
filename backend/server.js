const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// MIDDLEWARES
app.use(errorHandler);


app.listen(PORT, () => console.log(`Servert started on port ${PORT}`));