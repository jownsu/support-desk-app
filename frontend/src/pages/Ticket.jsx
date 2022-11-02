import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote } from  '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus, FaTimes } from 'react-icons/fa'
import Backbutton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

const customStyles = {
    content: {
        maxWidth: '600px',
        width: '90%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative'    }
}

Modal.setAppElement('#root')

function Ticket() {
    const [modalisOpen, setModalisOpen] = useState(false);
    const [noteText, setNoteText] = useState('')

    const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.tickets);
    const { ticketId } = useParams();

    const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openModal = () => setModalisOpen(true);
    const closeModal = () => setModalisOpen(false);

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line
    }, [isError, message, ticketId])

    const handleTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    const handleNoteSubmit = e => {
        e.preventDefault()

        dispatch(createNote({noteText, ticketId}))
        setNoteText('')
        closeModal()
    }

    if(isLoading || notesIsLoading){
        return <Spinner />
    }

    if(isError){
        return <h3>Something went wrong</h3>
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <Backbutton url='/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>
            {
                ticket.status !== 'closed' && (
                    <button onClick={openModal} className="btn"><FaPlus /> Add Note</button>
                )
            }

            <Modal isOpen={modalisOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}><FaTimes /></button>
                <form onSubmit={handleNoteSubmit}>
                    <div className="form-group">
                        <textarea 
                            name="noteText" 
                            id="noteText" 
                            className='form-control' 
                            placeholder='Note Text' 
                            value={noteText} 
                            onChange={e => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type='submit'>Submit</button>
                    </div>
                </form>
            </Modal>
            {
                notes.map(note => (
                    <NoteItem key={note._id} note={note} />
                ))
            }
            {
                ticket.status !== 'closed' && (
                    <button onClick={handleTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
                )
            }
        </div>
    )
}

export default Ticket