import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const { name, email, password, confirm_password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const  { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch]) 

    const onChange = (e) => {
        setFormData(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(password != confirm_password){
            toast.error('password do not match')
        }else{
            const userData = { name, email, password }
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register 
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            value={name} 
                            onChange={onChange} 
                            required
                            placeholder="Enter your name" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email"
                            value={email} 
                            onChange={onChange}
                            required 
                            placeholder="Enter your email" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            value={password} 
                            onChange={onChange}
                            required 
                            placeholder="Enter password" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            name="confirm_password"
                            value={confirm_password} 
                            onChange={onChange}
                            required 
                            placeholder="Confirm password" 
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register