// Librairies
import { forwardRef, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';

// Application
import './table.scss';

// Table
const Table = forwardRef<
    HTMLTableElement,
    HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
    <div className="table">
        <table
            ref={ref}
            className={className}
            {...props}
        />
    </div>
));

Table.displayName = "Table";

// Header
const TableHeader = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
>(({ ...props }, ref) => (
    <thead
        ref={ref}
        {...props}
    />
));

TableHeader.displayName = "TableHeader";

// Body
const TableBody = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
>(({ ...props }, ref) => (
    <tbody
        ref={ref}
        {...props}
    />
))
TableBody.displayName = "TableBody"

// Footer
const TableFooter = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
>(({ ...props }, ref) => (
    <tfoot
        ref={ref}
        {...props}
    />
))

TableFooter.displayName = "TableFooter"

// Row
const TableRow = forwardRef<
    HTMLTableRowElement,
    HTMLAttributes<HTMLTableRowElement>
>(({ ...props }, ref) => (
    <tr
        ref={ref}
        {...props}
    />
))

TableRow.displayName = "TableRow"

// Head
const TableHead = forwardRef<
    HTMLTableCellElement,
    ThHTMLAttributes<HTMLTableCellElement>
>(({ ...props }, ref) => (
    <th
        ref={ref}
        {...props}
    />
))

TableHead.displayName = "TableHead"

// Cell
const TableCell = forwardRef<
    HTMLTableCellElement,
    TdHTMLAttributes<HTMLTableCellElement>
>(({ ...props }, ref) => (
    <td
        ref={ref}
        {...props}
    />
))

TableCell.displayName = "TableCell"

// Caption
const TableCaption = forwardRef<
    HTMLTableCaptionElement,
    HTMLAttributes<HTMLTableCaptionElement>
>(({ ...props }, ref) => (
    <caption
        ref={ref}
        {...props}
    />
))

TableCaption.displayName = "TableCaption"

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
}