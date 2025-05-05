import React from 'react';

export const Table = ({ 
  children, 
  className = '',
  responsive = true
}) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
    {responsive ? (
      <div className="overflow-x-auto">{children}</div>
    ) : (
      <>{children}</>
    )}
  </div>
);

export const TableHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 ${className}`}>
    {children}
  </div>
);

export const TableTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-white">{children}</h3>
);

export const TableContent = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="w-full table-auto">{children}</table>
  </div>
);

export const TableHead = ({ children }) => (
  <thead>
    <tr className="bg-gray-100 text-left">{children}</tr>
  </thead>
);

export const TableHeadCell = ({ children, className = '' }) => (
  <th className={`px-6 py-3 text-xs font-semibold text-gray-600 tracking-wider ${className}`}>
    {children}
  </th>
);

export const TableBody = ({ children }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

export const TableRow = ({ children, className = '', highlight = false }) => (
  <tr className={`hover:bg-blue-50 transition-colors duration-150 ease-in-out ${highlight ? 'bg-blue-50' : ''} ${className}`}>
    {children}
  </tr>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
    {children}
  </td>
);

export const TableFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

// Usage example:
// <Table>
//   <TableHeader>
//     <div className="flex justify-between items-center">
//       <TableTitle>Crypto Market Data</TableTitle>
//       <button>Refresh</button>
//     </div>
//   </TableHeader>
//   <TableContent>
//     <TableHead>
//       <TableHeadCell>Name</TableHeadCell>
//       <TableHeadCell>Price</TableHeadCell>
//     </TableHead>
//     <TableBody>
//       <TableRow>
//         <TableCell>Bitcoin</TableCell>
//         <TableCell>$50,000</TableCell>
//       </TableRow>
//     </TableBody>
//   </TableContent>
//   <TableFooter>
//     <div>Showing 10 of 100</div>
//   </TableFooter>
// </Table> 