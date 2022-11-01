const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

/*
    DESC:   Get user tickets
    ROUTE:  GET /api/tickets
    ACCESS: Private
*/
const getTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets)

}) 

/*
    DESC:   Get user single ticket
    ROUTE:  GET /api/tickets/:id
    ACCESS: Private
*/
const getTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not Authorized');
    }

    res.status(200).json(ticket)

}) 

/*
    DESC:   Create new ticket
    ROUTE:  POST /api/tickets
    ACCESS: Private
*/
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;
    
    const ticket = await Ticket.create({
        user: req.user.id,
        product, 
        description,
        statue: 'new'
    })

    res.status(201).json(ticket);
}) 

/*
    DESC:   Delete Ticket
    ROUTE:  DELETE /api/tickets/:id
    ACCESS: Private
*/
const deleteTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not Authorized');
    }

    await ticket.remove()

    res.status(200).json(ticket)

}) 

/*
    DESC:   Update ticket
    ROUTE:  PUT /api/tickets/:id
    ACCESS: Private
*/
const updateTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not Authorized');
    }

    let updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)

}) 


module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}

