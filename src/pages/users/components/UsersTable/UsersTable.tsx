// Librairies
import { FC, JSX, ReactNode } from 'react';

// Application
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/Table';
import { OrderService } from '@/services/order-service';

interface Props {
    rows: OrderService.Models.User.Get[];
}

interface Column<TData> {
    key: string;
    header: string | ((context: HeaderContext) => ReactNode);
    cell: string | ((context: CellContext<TData>) => ReactNode);
}

interface HeaderContext {

}

interface CellContext<TData> {
    row: TData;
}

const UsersTable: FC<Props> = ({ rows }) => {

    const columns: Column<OrderService.Models.User.Get>[] = [
        {
            key: 'firstName',
            header: 'Prénom',
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.firstName}
                </div>
            ),
        },
        {
            key: 'lastName',
            header: 'Nom',
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.lastName}
                </div>
            ),
        },
        {
            key: 'email',
            header: 'Email',
            cell: ({ row }) => (
                <div className="lowercase">
                    {row.email}
                </div>
            ),
        },
        {
            key: 'role',
            header: 'Role',
            cell: ({ row }) => (
                <div className="lowercase" style={{ textTransform: 'capitalize' }}>
                    {row.role}
                </div>
            ),
        },
    ];

    const displayHeader = () => {
        let displayed: JSX.Element[] = [];
        for (const column of columns) {
            displayed.push(
                <TableHead key={column.key}>
                    {(
                        typeof column.header === 'string'
                            ? column.header
                            : column.header({})
                    )}
                </TableHead>
            );
        }

        return (
            <TableRow>
                {displayed}
            </TableRow>
        );
    }

    const displayRows = () => {
        if (!rows.length) {
            return '';
        }

        let displayed: JSX.Element[] = [];
        for (const row of rows) {
            displayed.push(
                <TableRow key={row.id}>
                    {getRowCells(row)}
                </TableRow>
            );
        }

        return displayed;
    }

    const getRowCells = (row: OrderService.Models.User.Get) => {
        let displayed: JSX.Element[] = [];
        for (const column of columns) {
            displayed.push(
                <TableCell key={`${column.key}-${row.id}`}>
                    {(
                        typeof column.cell === 'string'
                            ? column.cell
                            : column.cell({ row })
                    )}
                </TableCell>
            );
        }

        return displayed;
    }

    return (
        <Table>
            <TableHeader>
                {displayHeader()}
            </TableHeader>
            <TableBody>
                {rows.length ? (
                    displayRows()
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default UsersTable;