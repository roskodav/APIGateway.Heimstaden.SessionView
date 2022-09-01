import React from 'react';

const TableColumn = ({ column }) => (
  <th
    style={
        column.id !== 'expander'
          ? { minWidth: 150, maxWidth: 150 }
          : { minWidth: 32 }
      }
    className={
        column.id !== 'expander'
          ? 'd-flex align-items-center text-bold px-3'
          : 'd-flex align-items-center text-bold px-1 stick-to-left'
      }
    {...column.getHeaderProps()}
  >
    <span className="truncate">{column.render('Header')}
      {column.id !== 'expander' && <span className={"resizer"}  {...column.getResizerProps()}/>}</span>
  </th>
);

export default TableColumn;
