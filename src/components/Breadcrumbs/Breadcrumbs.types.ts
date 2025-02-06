import { OrderService } from '@/services/order-service';

export type Path = {
    title: string;
    to: string;
    permission: OrderService.Models.User.Role | null;
}[];