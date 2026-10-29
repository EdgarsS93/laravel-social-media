import { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({children}: AppLayoutProps) {
    return (
        <div>
            <h1>Common part</h1>
            <div>{children}</div>
        </div>
    );
}
