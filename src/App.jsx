import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import { useAuth } from './hooks/useAuth.js'

const App = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path = "/login" element = {<LoginPage />} />
            <Route 
                path = "/"
                element = {
                    <ProtectedRoute>
                        <DashboardPage/>
                    </ProtectedRoute>
                }            
            />
            <Route 
                path = "*" 
                element = {<Navigate to = {isAuthenticated ? '/' : '/login' } replace />}/>
        </Routes>
    );
};

export default App;