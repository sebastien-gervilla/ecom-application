// Librairies
import { } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Applications
import './page.scss';
import { Header, LoaderWrapper, PageLayout } from '@/components';
import { useLocalStorage, useRequest } from '@/hooks';
import { orderService, OrderService } from '@/services/order-service';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardScreen = () => {

    const [isReduced, setIsReduced] = useLocalStorage('is-sidebar-reduced', false);

    const handleToggleSidebar = () => setIsReduced(!isReduced);

    return (
        <PageLayout id='dashboard-page' isSidebarReduced={isReduced}>
            <Header
                path={[{
                    to: '/',
                    title: 'Accueil',
                    permission: null,
                }, {
                    to: '/dashboard',
                    title: 'Dashboard',
                    permission: null,
                }]}
                toggleSidebar={handleToggleSidebar}
            />
            <Dashboard />
        </PageLayout>
    );
};

const Dashboard = () => {

    const statisticsResponse = useRequest<OrderService.Responses.Order.GetStatistics>({
        request: orderService.orders.getStatistics,
    });
    const statistics = statisticsResponse.response?.is(200) ? statisticsResponse.response.body.data : null;

    const displayStockRemaning = () => {
        if (!statistics)
            return;

        return statistics.stockRemaining.map(product => (
            <div className={`card stock-card ${product.stock <= 0 ? 'low' : 'fine'}`}>
                <h3>{product.name}</h3>
                <p>Stock: {product.stock}</p>
            </div>
        ));
    }

    return (
        <LoaderWrapper className='statistics' isLoading={statisticsResponse.isLoading}>
            {!!statistics && (
                <>
                    <div className="cards">
                        <div className="card total-orders">
                            <h3>Commandes passées</h3>
                            <p className='total'>{statistics.totalOrders}</p>
                        </div>
                        <div className="separator"></div>
                        {displayStockRemaning()}
                    </div>
                    <div className="bar-chart">
                        <Bar
                            data={{
                                labels: statistics.bestSelling.map(product => product.name),
                                datasets: [
                                    {
                                        label: "Units Sold",
                                        data: statistics.bestSelling.map(product => product.quantity),
                                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                                        borderColor: "rgba(75, 192, 192, 1)",
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "top" },
                                    title: { display: true, text: "Best Selling Products" },
                                },
                            }}
                            width={200}
                            height={70}
                        />
                    </div>
                </>
            )}
        </LoaderWrapper>
    );
}

export default DashboardScreen;