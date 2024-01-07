import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const Public = () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
        return <Navigate to="/" replace={true} />;
    }

    return <Outlet />;
};

export default Public;
