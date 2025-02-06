// Librairies
import { FC, ReactNode } from 'react';

// Application
import './page-layout.scss';
import { Sidebar } from '@/components';

interface Props {
    id: string;
    children: ReactNode;
    isSidebarReduced?: boolean;
}

const PageLayout: FC<Props> = ({ id, children, isSidebarReduced = false }) => {
    return (
        <section id={id} className='page'>
            <Sidebar isReduced={isSidebarReduced} />
            <main>
                {children}
            </main>
        </section>
    );
};

export default PageLayout;