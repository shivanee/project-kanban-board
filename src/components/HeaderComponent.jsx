import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function HeaderComponent(){
    const authContext=useAuth();
    const isAuthenticated=authContext.isAuthenticated

    function logout() {
        authContext.logout()
    }

    return(
        <header className='header'>
            <div className='container'>
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="collapse navbar-collapse justify-content-center">
                           {isAuthenticated && <h1>Kanban Board</h1>}
                        </div>
                        <ul className='navbar-nav'>
                            {isAuthenticated && 
                                <li className="nav-item fs-5 card text-bg-danger mb-3"><Link className="nav-link" to="/logout" onClick={logout}>Logout</Link></li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}