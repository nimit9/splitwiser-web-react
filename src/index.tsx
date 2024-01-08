import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AppProvider from './components/Provider';
import Root from './routes/root';
import Protected from './routes/Protected';
import Public from './routes/Public';
import Login from './routes/Login';
import AddUserName from './routes/AddUserName';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <>Error</>,
        children: [
            {
                path: '/',
                element: <Protected />,
                children: [
                    {
                        path: '/add-name',
                        element: <AddUserName />,
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
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </AppProvider>,
);
