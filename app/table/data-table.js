"use client"

import { useState, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DataTable({ columns }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sorting, setSorting] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching users data...');
        
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        
        
        const responseBody = await response.text();
        console.log('Response body:', responseBody);

     
        let result;
        try {
          result = JSON.parse(responseBody);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          throw new Error('Invalid JSON response');
        }

        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch data');
        }

        if (!result.users || !Array.isArray(result.users)) {
          throw new Error('Invalid users data format');
        }

        console.log('Fetched Users:', result.users);

        setData(result.users);
        setLoading(false);
      } catch (err) {
        console.error('Detailed Fetch Error:', {
          message: err.message,
          name: err.name,
          stack: err.stack
        });

        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

 
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="text-gray-600">Loading users data...</span>
      </div>
    )
  }


  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <div className="mt-2 text-sm text-red-500">
          <p>Possible reasons:</p>
          <ul className="list-disc list-inside">
            <li>Network connectivity issue</li>
            <li>Server is down</li>
            <li>Database connection problem</li>
            <li>API route misconfiguration</li>
          </ul>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
        >
          Retry
        </button>
      </div>
    )
  }

 
  if (data.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <h2 className="text-xl text-gray-600 mb-4">No Users Found</h2>
        <p className="text-gray-500">There are currently no users in the system.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="font-semibold text-gray-700">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-50 transition-colors"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}