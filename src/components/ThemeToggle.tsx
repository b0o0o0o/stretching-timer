import React, { useEffect, useState } from 'react'

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button
      className="text-sm px-2 py-1 border rounded text-gray-400 hover:text-white"
      onClick={() => setDark(!dark)}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle