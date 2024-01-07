import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import App from './App';
import AppProvider from './components/Provider';
import Protected from './components/routes/Protected';
import UpdateName from './components/profile/UpdateName';
import Public from './components/routes/Public';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Protected />,
                children: [
                    {
                        path: '/update-name',
                        element: <UpdateName />,
                    },
                ],
            },
            {
                path: '/login',
                element: <Public />,
                children: [
                    {
                        path: '/login',
                        element: <Login />,
                    },
                ],
            },
        ],
    },
]);

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <AppProvider>
        <RouterProvider router={router} />
    </AppProvider>,
);
