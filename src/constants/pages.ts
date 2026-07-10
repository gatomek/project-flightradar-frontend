export interface PageConfig {
    label: string;
    path: string;
}

export const PAGES: PageConfig[] = [
    {label: 'Radar', path: '/radar'},
    {label: 'Flights', path: '/flights'},
    {label: 'Settings', path: '/settings'},
    {label: 'Profile', path: '/profile'}
];
