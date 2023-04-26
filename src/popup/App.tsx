import logo from '../media/logo.svg'
import demo from '../media/demo.svg'
import { Button } from 'flowbite-react'

function App() {
  return (
    <div className="min-w-[350px] font-sans">
      <header className="min-h-[100vh] flex flex-col items-center p-2 gap-4">
        <div className='flex items-center self-start'>
          <img src={logo} className="h-10 w-10" alt="Reel.fyi logo" />
          <h2 className='text-gray-800 text-2xl font-semibold'>Reel.fyi</h2>
        </div>
        <a href="https://reel.fyi"
          target='_blank'
          rel='noopener noreferrer'
          className='flex justify-center w-fit'>
          <img src={demo} className='w-full' alt="Reel.fyi demo" />
        </a>
        <Button color="purple" className='w-11/12 mb-4'>
          <a href="https://app.reel.fyi/dashboard"
            target='_blank'
            rel='noopener noreferrer'>
            Dashboard
          </a>
        </Button>
      </header>
    </div>
  )
}

export default App
