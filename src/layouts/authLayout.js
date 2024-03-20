import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Header } from '../components/header';

export const AuthLayout = ({ children }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if (isAuthenticated) {
        
        return <Navigate to={"/"} />
    }

    return (
        <>
            <Header />
            {children}
        </>
    )
}