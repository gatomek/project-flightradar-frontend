import './styles/index.css';

import {createRoot} from 'react-dom/client';
import keycloak from './keycloak.ts';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import {StrictMode} from 'react';
import {RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {browserRouter} from './browserRouter';

const queryClient = new QueryClient();

const root = document.getElementById('root');
if (root) {
    createRoot(root).render(
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{
                onLoad: 'login-required',
                checkLoginIframe: false
            }}
            LoadingComponent={<></>}
        >
            <StrictMode>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={browserRouter} />
                    </QueryClientProvider>
                </Provider>
            </StrictMode>
        </ReactKeycloakProvider>
    );
}
