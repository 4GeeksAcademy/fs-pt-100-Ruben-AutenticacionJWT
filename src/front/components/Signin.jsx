import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import userServices from "../services/flux.js"
import { useNavigate } from "react-router-dom"
import { Private } from "./Private.jsx"




export const Signin = () => {

    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        userServices.login(formData).then(data => data.success && navigate('/private'))
        setFormData({
            email: "",
            password: "",
            username: ""
        })


    }

    const handleClick = () => {
        navigate('/signup')
    }

    return (
        <>
            <form className="container mt-2 w-50" onSubmit={handleSubmit}>
                <div className="card-header text-center d-flex justify-content-between">
                    <h2>Signin</h2>
                   {/* <button type="button" className="btn-close align-self-center" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
                <div className=" mt-3 col-sm-12 col-md-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className=" mt-3 col-sm-12 col-md-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="d-flex justify-content-between gap-3 mt-3">
                    <button className="btn btn-secondary" onClick={handleClick}>Don't have an account? Sign Up here</button>
                    <input type="submit" className="btn btn-primary" />
                </div>

            </form>
        </>


    )
}