import {createBrowserRouter, Navigate} from 'react-router-dom';
import {MainContent} from './views/MainContent/MainContent';
import {RadarView} from './views/RadarView/RadarView.tsx';
import {SettingsView} from './views/SettingsView/SettingsView';
import {ProfileView} from './views/ProfileView/ProfileView';
import {FileNotFoundView} from './views/FileNotFoundView/FileNotFoundView';
import {appConfig, PageNotFoundProcessing} from './AppConfig.ts';
import {FlightsView} from './views/FlightsView/FlightsView.tsx';

export const browserRouter = createBrowserRouter(
    [
        {
            path: '',
            element: <MainContent />,
            children: [
                {
                    path: '/',
                    element: <Navigate to="/radar" replace />
                },
                {
                    path: '/radar',
                    element: <RadarView />
                },
                {
                    path: '/settings',
                    element: <SettingsView />
                },
                {
                    path: '/flights',
                    element: <FlightsView />
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
    {
        basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
    }
);
