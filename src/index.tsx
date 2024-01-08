import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AppProvider from './components/Provider';
import UpdateName from './components/profile/UpdateName';
import Root from './routes/root';
import Protected from './routes/Protected';
import Public from './routes/Public';
import Login from './routes/Login';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
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
