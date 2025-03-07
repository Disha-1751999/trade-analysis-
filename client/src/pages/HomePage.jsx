import React, { useEffect } from 'react'
import TableComponent from '@/components/TableComponent'
import ChartComponent from '@/components/ChartComponent'

function HomePage() {
 
  return (
    <div className='flex flex-col items-center mt-6 mb-6'>
    <h1 className='font-semibold text-2xl text-gray-700' >Trade Data Dashboard</h1>
    <ChartComponent/>
    <TableComponent />
  </div>
  )
}

export default HomePage