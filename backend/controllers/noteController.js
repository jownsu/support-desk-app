const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');



/*
    DESC:   Get ticket notes
    ROUTE:  GET /api/tickets/:ticketId/notes
    ACCESS: Public
*/
const getNotes = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.ticketId);

    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not Authorized');
    }

    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes)
})

/*
    DESC:   create ticket notes
    ROUTE:  POST /api/tickets/:ticketId/notes
    ACCESS: Public
*/
const addNote = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.ticketId);

    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not Authorized');
    }

    const note = await Note.create({
        user    : req.user.id,
        ticket  : req.params.ticketId,
        text    : req.body.text,
        isStaff : false,
    })

    res.status(200).json(note)
}) 


module.exports = {
    getNotes,
    addNote
}