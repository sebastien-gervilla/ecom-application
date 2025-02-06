import { ReactNode } from 'react';

export type RowId = string | number;

export interface Column<TRow> {
    key: string;
    header: string | ((context: HeaderContext) => ReactNode);
    cell: string | ((context: CellContext<TRow>) => ReactNode);
}

export interface HeaderContext {

}

export interface CellContext<TRow> {
    row: TRow;
}