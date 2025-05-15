import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import userServices from "../services/flux.js"
import { useNavigate } from "react-router-dom"
import { Private } from "./Private.jsx"




export const Signin = () => {

    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer()
    const [formData, setFormData] = useState({
        identify: "",
        username: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await userServices.login(formData)

            if (data?.success) {
                if (formData.identify?.includes("@admin")) {
                    navigate('/admin')
                    setFormData({
                        identify: "",
                        username: ""
                    })
                } else {
                    navigate('/private')
                    setFormData({
                        identify: "",
                        username: ""
                    })

            }} else {
                    alert(data?.error || "Email, contraseña incorrectos")
                }
        } catch (error) {
                console.log("Login error", error);

            }


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
                        <label htmlFor="identify" className="form-label">Email/Username</label>
                        <input type="text" className="form-control" placeholder="Email/Username" name="identify" value={formData.identify} onChange={handleChange} required />
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