import { useState } from 'react'
import './App.css'
import { Button } from '@mui/material'

function App() {

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600">
        Hello Vite + React + Tailwind + MUI!
      </h1>
      <p className="mt-4 text-gray-700">
        This is a Tailwind paragraph.
      </p>
      <Button variant="contained" color="primary" className="mt-4">
        MUI Button
      </Button>
    </div>
  )
}

export default App
