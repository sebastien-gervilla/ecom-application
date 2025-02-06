// Librairies
import { JSX } from 'react';

// Application
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/Table';
import { Column, RowId } from './types';

interface Props<TRow> {
    columns: Column<TRow>[];
    rows: TRow[];
    getRowId: (row: TRow) => RowId;
}

const PowerSuppliesTable = <TRow,>({ columns, rows, getRowId }: Props<TRow>) => {

    const displayHeader = () => {
        let displayed: JSX.Element[] = [];
        for (const column of columns) {
            displayed.push(
                <TableHead key={column.key} className={column.key}>
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
        if (!rows.length)
            return null;

        let displayed: JSX.Element[] = [];
        for (const row of rows) {
            displayed.push(
                <TableRow key={getRowId(row)}>
                    {getRowCells(row)}
                </TableRow>
            );
        }

        return displayed;
    }

    const getRowCells = (row: TRow) => {
        let displayed: JSX.Element[] = [];
        for (const column of columns) {
            displayed.push(
                <TableCell key={`${column.key}-${getRowId(row)}`}>
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
        <Table className='datatable'>
            <TableHeader>
                {displayHeader()}
            </TableHeader>
            <TableBody>
                {displayRows()}
            </TableBody>
        </Table>
    )
}

export default PowerSuppliesTable;