import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import userServices from "../services/flux"
import { useNavigate } from "react-router-dom"




export const Signup = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        phone: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        userServices.register(formData).then(data => data.success && navigate('/signin'))
        setFormData({
            email: "",
            password: "",
            username: "",
            firstname: "",
            lastname: "",
            dateofbirth: "",
            phone: ""
        })
    }

    const handleClick = () => {
        navigate('/signin')
    }

    return (
        <>
            <form className="container mt-2 w-50" onSubmit={handleSubmit}>
                <div className="card-header text-center d-flex justify-content-between">
                    <h2>SignUp</h2>
                </div>
                <div className=" mt-3 col-sm-12 col-md-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className=" mt-3 col-sm-12 col-md-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className=" mt-3 col-sm-12 col-md-12">
                    <label htmlFor="inputUserName" className="form-label">UserName</label>
                    <input type="text" className="form-control" id="inputUserName" placeholder="UserName" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="row mt-3">
                    <div className="col-sm-12 col-md-6">
                        <label htmlFor="inputName" className="form-label">First Name</label>
                        <input type="text" className="form-control" placeholder="First Name" id="inputName" name="firstname" value={formData.firstname} onChange={handleChange} required />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label htmlFor="inputLastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name" id="inputLastName" name="lastname" value={formData.lastname} onChange={handleChange} required />
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-6">
                            <label className="form-label" htmlFor="date-of-birth">
                                Date of Birth
                            </label>
                            <input className="form-control" type="text" inputMode="numeric" id="date-of-birth" name="dateofbirth" placeholder="dd/mm/yyyy" value={formData.dateofbirth} onChange={handleChange} required />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="inputPhone" className="form-label">Phone</label>
                            <input type="number" className="form-control" placeholder="Phone" id="inputPhone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between gap-3 mt-3">
                    <button className="btn btn-secondary" onClick={handleClick}>Already account?</button>
                    <input type="submit" className="btn btn-primary" />
                </div>

            </form>
        </>


    )
}