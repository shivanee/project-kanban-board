import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

export default function LoginComponent(){

    const [username,setUsername]=useState('')

    const [password,setPassword]=useState('')

    const [errorMessage,setErrorMessage]=useState(false)

    const navigate=useNavigate()

    const authContext=useAuth()

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){       
        setPassword(event.target.value)
    }

    function handleLoginButton(event){
        if(authContext.login(username, password)){
            navigate('./kanban')
        } else {
            setErrorMessage(true)
        }
    }

    return(
        <div className="Login">
            <h1>Login!</h1>
            {errorMessage && <div className='errorMessage'>Authentication Failed. Please check your credentials.</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="loginbutton" onClick={handleLoginButton}>Login</button>
                </div>
            </div>
        </div>
    )
}