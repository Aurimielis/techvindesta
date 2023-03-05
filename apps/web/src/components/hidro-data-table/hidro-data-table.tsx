import * as React from 'react';
import {
  GroupingState,
  useReactTable,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

type HidroData = {
  id: number;
  value1: string;
  value2: string;
  value3: string;
  reading_time: string;
}

interface HidroDataTableProps {
  data: HidroData[];
}

const HidroDataTable: React.FC<HidroDataTableProps> = ({ data }) => {
  const columns = React.useMemo<ColumnDef<HidroData>[]>(
    () => [
      {
        header: 'Data ir laikas',
        columns: [
          {
            accessorKey: 'reading_time',
            header: 'metai-mėnuo-diena valanda:minutė',
            cell: info => info.getValue(),
          }
        ]
      },
      {
        header: 'Vandens lygis aukštutiniame bjefe*',
        columns: [
          {
            accessorKey: 'value1',
            header: 'metrais (centimetro tikslumu)',
            cell: info => info.getValue(),
          }
        ]
      },
      {
        header: 'Vandens lygis žemutiniame bjefe*',
        columns: [
          {
            accessorKey: 'value2',
            header: 'metrais (centimetro tikslumu)',
            cell: info => info.getValue(),
          }
        ]
      }
    ],[])

  const [grouping, setGrouping] = React.useState<GroupingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  })

  console.log(data)
  if (data.length === 0) return (<div>no data</div>)

  return (
    <div>
      <table>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th key={header.id}>
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                </th>
              )
            })}
          </tr>
        ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      }
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default HidroDataTable
