import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket'


function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} ></Route>
                        <Route path='/login' element={<Login />} ></Route>
                        <Route path='/register' element={<Register />} ></Route>
                        <Route path='/new-ticket' element={<PrivateRoute><NewTicket /></PrivateRoute>} />
                        <Route path='/tickets' element={<PrivateRoute><Tickets /></PrivateRoute>} />
                        <Route path='/ticket/:ticketId' element={<PrivateRoute><Ticket /></PrivateRoute>} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
