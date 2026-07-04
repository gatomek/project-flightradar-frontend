import {MainContent} from '../views/MainContent';
import {AircraftsView} from '../views/AircraftsView';
import {SettingsView} from '../views/SettingsView';
import {ProfileView} from '../views/ProfileView';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import {FileNotFoundView} from '../views/FileNotFoundView.tsx';
import {appConfig, PageNotFoundProcessing} from '../AppConfig.ts';

export const browserRouter = createBrowserRouter(
    [
        {
            path: '',
            element: <MainContent />,
            children: [
                {
                    path: '/',
                    element: <Navigate to="/aircrafts" replace />
                },
                {
                    path: '/aircrafts',
                    element: <AircraftsView />
                },
                {
                    path: '/settings',
                    element: <SettingsView />
                },
                {
                    path: '/profile',
                    element: <ProfileView />
                },
                {
                    path: '*',
                    element:
                        appConfig.pageNotFoundProcessing === PageNotFoundProcessing.Info ? (
                            <FileNotFoundView />
                        ) : (
                            <Navigate to="/" />
                        )
                }
            ]
        }
    ],
    {basename: '/project-flightradar-frontend/'}
);
