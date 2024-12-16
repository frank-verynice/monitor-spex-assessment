import React, { useState } from 'react';

function DataTable({ data, columns, onRowHighlight, rowsPerPage = 10, currentPage = 1, isRealTime = false }) {
  const [sortConfig, setSortConfig] = useState(null);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination logic
  const getTableData = () => {
    if (isRealTime) {
      return sortedData.slice(-rowsPerPage);
    }
    else {
      return sortedData.slice(startIndex, startIndex + rowsPerPage);
    }
  }
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = getTableData();
  

  // Sort handler
  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig && prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return { key, direction: 'ascending' };
    });
  };

  return (
    <div>
      <table className='w-full text-xs md:text-md lg:text-base'>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleSort(col.key)}>
                {col.header}
                {sortConfig?.key === col.key ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              className={onRowHighlight(row) ? 'bg-red-100 text-black' : ''}
            >
              {columns.map((col) => (
                <td className='text-center' key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;