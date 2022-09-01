import React from 'react';

const TableCell = ({ cell }) => (
  <td
    className={
        cell.column.id !== 'expander'
          ? 'd-flex align-items-center ovh px-3'
          : 'd-flex align-items-center px-1 stick-to-left'
      }
    style={
        cell.column.id !== 'expander'
          ? { minWidth: 150, maxWidth: 150 }
          : { minWidth: 32 }
      }
    {...cell.getCellProps()}
  >
    <span className="truncate">{cell.render('Cell')}</span>
  </td>
);

export default TableCell;
