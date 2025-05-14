import { useNavigate } from "react-router-dom";


export const Home = () => {

	// const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()
	
	// const handleClick = () => {
	// 	userServices.getInfo().then(data => dispatch({type:'get_info', payload: data}))
	// }

	const handleSignup = () => {
		navigate('/signup')
	}
	const handleSignin = () => {
		navigate('/signin')
	}
	const handleInfo = () => {
		navigate ('/private')
		localStorage.getItem('token')? navigate('/private'): navigate('/signin')
	}

	return (
		<div className="text-center mt-5">
			{/* <h2>Registro Usuario</h2>
			<Register />

			<h2>Login Usuario</h2>
			<Login />
			
			<h3>Renderizar Login</h3>
			<button onClick={handleClick} className="btn btn-primary">Info Login</button>

			{localStorage.getItem('token') && <Private/>} */}
			<h2>Registro Usuario</h2>
			<button className="btn btn-primary" onClick={handleSignup}>SignUp</button>

			<h2>SignIn Usuario</h2>
			<button className="btn btn-primary" onClick={handleSignin}>SignIn</button>

			<h3>Renderizar SignIn</h3>
			<button onClick={handleInfo} className="btn btn-primary">Info SignIn</button>

		</div>
	);
}; 