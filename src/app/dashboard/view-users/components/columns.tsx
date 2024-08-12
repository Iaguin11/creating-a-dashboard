"use client"

import { ColumnDef } from '@tanstack/react-table'
import { AlertTriangle, CheckSquare, ChevronsUpDown, Clock8, FileDown, MoreHorizontal, XCircle } from 'lucide-react'
import Link from 'next/link'


import { Button } from '@/components/ui/button'

export type CreditApplication = {
  id: string
  applicationNumber: string
  clientName: string
  date: Date
  amount: number
  status: string
  download: React.ReactNode
}

export const columns: ColumnDef<CreditApplication>[] = [
  {
    accessorKey: 'clientName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cliente
          <ChevronsUpDown className='ml-2 size-4'/>
        </Button>
      )
    },
    cell: ({ row }) => {
      const clientName: string = row.getValue('clientName')
      
      return (
        <Button asChild variant='link'>
          <Link className='font-medium' href="/employee/credit-applications">{clientName}</Link>
        </Button>

      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Criando em
          <ChevronsUpDown className='ml-2 size-4'/>
        </Button>
      )
    },
    cell: ({ row }) => {
      const date: Date = row.getValue('date')
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
      const year = date.getFullYear().toString();
      const formatted =  `${day}/${month}/${year}`;

      return <div className="font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'status',
    header: () => <div className='text-center'>Status</div>,
    cell: ({ row }) => {
      const status: string = row.getValue('status')

      if (status === 'approved') {
        return (
          <div className="size-9 rounded bg-emerald-400 text-emerald-800 m-auto flex items-center justify-center shadow-sm hover:opacity-80">
            <CheckSquare size={16}/>
          </div>
        )
      }
      if (status === 'pending') {
        return (
          <div className="size-9 rounded bg-amber-400 text-amber-800 m-auto flex items-center justify-center shadow-sm hover:opacity-80">
            <Clock8 size={16}/>
          </div>
        )
      }
      if (status === 'cancelled') {
        return (
          <div className="size-9 rounded bg-rose-400 text-rose-800 m-auto flex items-center justify-center shadow-sm hover:opacity-80">
            <XCircle size={16}/>
          </div>
        )
      }
      if (status === 'quit') {
        return (
          <div className="size-9 rounded bg-slate-400 text-slate-800 m-auto flex items-center justify-center shadow-sm hover:opacity-80">
            <AlertTriangle size={16}/>
          </div>
        )
      }
    }
  },
  {
    accessorKey: 'download',
    header: () => <div className="text-center">Editar</div>,
    cell: () => {
      return (
        <Button 
          className="w-full flex items-center justify-center"
          onClick={() => console.log('download')}
        >
          Editar
        </Button>
      )
    }
  },
]