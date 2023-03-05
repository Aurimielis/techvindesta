import * as React from 'react';
import {
  GroupingState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import styled from "styled-components";

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

const StyledWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  border-spacing: 0;
`

const HidroDataTable: React.FC<HidroDataTableProps> = ({ data }) => {
  const columns = React.useMemo<ColumnDef<HidroData>[]>(
    () => [
      {
        header: 'Data ir laikas',
        columns: [
          {
            accessorKey: 'reading_time',
            header: 'metai-mėnuo-diena valanda:minutė',
          }
        ]
      },
      {
        header: 'Vandens lygis aukštutiniame bjefe*',
        columns: [
          {
            accessorKey: 'value1',
            header: 'metrais (centimetro tikslumu)',
          }
        ]
      },
      {
        header: 'Vandens lygis žemutiniame bjefe*',
        columns: [
          {
            accessorKey: 'value2',
            header: 'metrais (centimetro tikslumu)',
          }
        ]
      }
    ],[])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // debugTable: true,
  })

  if (data.length === 0) return (<div>Duomenų nėra 🤷🏻‍♂️</div>)
  if (data['message']) return (<div>Įvyko klaida, prašome bandyti vėliau 👷</div>)

  return (
    <StyledWrapper>
      <StyledTable>
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
      </StyledTable>
    </StyledWrapper>
  )
}

export default HidroDataTable
