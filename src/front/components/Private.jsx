import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import userServices from "../services/flux"
import { useNavigate } from "react-router-dom"



export const Private = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return navigate('/signin')
        }
        userServices.getInfo().then(data => {
            localStorage.setItem('user', JSON.stringify(data)), dispatch({ type: 'get_info', payload: data })
        })

    }, [])


    const handleLogout = () => {
        dispatch({ type: 'logout' })
        navigate('/')
    }

    return (
        <>
            <div className="container w-50 mt-5 d-flex flex-column align-items-center">
                <div className="card border-light mb-3" >
                    <div className="card-header d-flex justify-content-between">
                        <h4>{store.user?.username} Post!!<span className="fa-solid fa-champagne-glasses"></span></h4>
                        <span>21/02</span>
                    </div>
                    <article>
                        <div className="post__img">
                            <img className="img-fluid w-100" src="https://picsum.photos/500" />
                        </div>
                        <div className="post_icons d-flex justify-content-between">
                            <div className="post_icons_left">
                                <span className="fa-regular fa-heart like ms-2 me-2"></span>
                                <span className="fa-regular fa-comment comment me-2"></span>
                                <span className="fa-regular fa-paper-plane send me-2"></span>
                            </div>
                            <span className="fa-regular fa-bookmark save m-2"></span>
                        </div>
                        <div className="post__liked">
                            <p>Liked by <strong>HTML</strong>, <strong>{store.user?.firstname} {store.user?.lastname}</strong>, <strong>4Geeks Academy</strong>, and <strong>100,000,000 others</strong></p>
                        </div>
                        <div className="post__description">
                            <p>📝 Este es el post de <strong>{store.user?.firstname}</strong>:
                                Comparte, comenta y sé parte de la conversación.
                                ¡Gracias por estar aquí!

                                #PostDelDía #Comunidad #Contenido #Bienvenido</p>
                        </div>
                    </article>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={handleLogout} className="btn btn-primary">SignOut</button>
            </div>
            
        </>
    )
}