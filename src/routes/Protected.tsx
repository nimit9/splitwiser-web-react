import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const Protected = () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default Protected;
