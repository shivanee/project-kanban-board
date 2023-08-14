import './KanbanBoardTodoApp.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HeaderComponent from'./HeaderComponent'
import LoginComponent from './LoginComponent'
import WelcomeComponent from './WelcomeComponent'
import LogoutComponent from './LogoutComponent'
import ErrorComponent from './ErrorComponent'
import AuthProvider, { useAuth } from './security/AuthContext'

function AuthenticatedRoute({children}){
    const authContext=useAuth()

    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/"/>
}

export default function KanbanBoardTodoApp(){
    return(
        <div className="KanbanBoardTodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/welcome/:username' element={
                        <AuthenticatedRoute>
                            <WelcomeComponent/>
                        </AuthenticatedRoute>}/>
                        <Route path='/logout' element={<LogoutComponent/>}/>
                        <Route path='*' element={<ErrorComponent/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}