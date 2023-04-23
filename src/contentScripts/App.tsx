import { useState } from 'react';
import logo from '../media/logo.svg';
import { Badge, Button } from 'flowbite-react';
import { AiOutlineClose } from 'react-icons/ai';
import { clipboard } from '@extend-chrome/clipboard'

const DEFAULT_MESSAGE = "Hi Zeyao, as an IU alum like yourself, I'm excited to connect with you. I'm Dake, a junior at IU and an incoming Microsoft PM intern. With my experience at a Techstars company, I'm interested in discussing product at Google and learning about your journey. Let's chat!"

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [messageCopied, setMessageCopied] = useState(true);

  const copyText = async () => {
    const copied = await clipboard.writeText(message);
    if (copied === message) {
      setMessageCopied(true);
    }
  }

  const copyMessageBadge = (
    <Badge color="success">
      <span className="text-lg">
        Copied!
      </span>
    </Badge>
  )

  const popup = (
    <div className="absolute -top-32 right-16 w-[28rem] bg-gray-100 rounded-lg shadow-lg z-50">
      <div className="flex flex-col px-8 py-4 gap-4">
        <div className='flex items-center justify-between self-start w-full'>
          <div className='flex items-center'>
            <img src={chrome.runtime.getURL(logo)} className="h-10 w-10" alt="Reel.fyi logo" />
            <h2 className='text-2xl font-semibold'>Reel.fyi</h2>
          </div>
          <button className='text-2xl' onClick={() => setShowPopup(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className='flex items-center justify-between'>
          <h4 className='text-xl font-light'>Your message:</h4>
          {messageCopied && copyMessageBadge}
        </div>
        <div className="bg-gray-200 rounded-lg p-3">
          <p className='text-lg text-gray-700'>
            Hi Zeyao, as an IU alum like yourself, I'm excited to connect with you. I'm Dake, a junior at IU and an incoming Microsoft PM intern. With my experience at a Techstars company, I'm interested in discussing product at Google and learning about your journey. Let's chat!
          </p>
        </div>
        <div className='flex justify-between flex-grow mt-2 gap-x-8'>
          <Button color="purple" fullSized>
            <span className="flex items-center rounded-md text-lg px-6 py-1">
              Copy Text
            </span>
          </Button>
          <Button color="purple" outline fullSized>
            <span className="flex items-center rounded-md text-lg px-6 py-1">
              Rewrite
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
  return (
    <div className='flex absolute top-0 -right-2'>
      <img
        src={chrome.runtime.getURL(logo)}
        alt="reel.fyi logo"
        className='w-14'
        onClick={() => setShowPopup(!showPopup)}
      />
      {showPopup && popup}
    </div>
  )
}

export default App;