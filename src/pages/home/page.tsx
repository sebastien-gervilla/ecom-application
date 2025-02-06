// Librairies
import { } from 'react';

// Applications
import { Header, PageLayout } from '@/components';
import { useLocalStorage } from '@/hooks';

const HomeScreen = () => {

    const [isReduced, setIsReduced] = useLocalStorage('is-sidebar-reduced', false);

    const handleToggleSidebar = () => setIsReduced(!isReduced);

    return (
        <PageLayout id='home-page' isSidebarReduced={isReduced}>
            <Header
                path={[{
                    to: '/',
                    title: 'Accueil',
                    permission: null,
                }]}
                toggleSidebar={handleToggleSidebar}
            />
            <Home />
        </PageLayout>
    );
};

const Home = () => {
    return (
        null
    );
}

export default HomeScreen;