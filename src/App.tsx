import Timer from './components/Timer'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="min-h-screen bg-[#0E0F17] text-white flex items-center justify-center p-4 relative">
      <Timer totalCycles={5} />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default App