import { useEffect, useState } from 'react';
import logo from '../media/logo.svg';
import { Button } from 'flowbite-react';
import { AiOutlineClose } from 'react-icons/ai';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  // const [pos, setPos] = useState(0);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const par = document.querySelector('textarea')?.parentElement;
  //     const grammarly = document.querySelector('grammarly-extension');
  //     const root = document.querySelector('div#crx-root');
  //     if (!par?.lastChild?.isEqualNode(root) || grammarly) {
  //       setPos(10);
  //     }
  //   }
  // }, []);

  const popup = (
    <div className="absolute -top-52 right-16 w-[28rem] bg-gray-100 rounded-lg shadow-lg z-50">
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
        <h4 className='text-xl font-light'>Your message:</h4>
        <div className="bg-gray-200 rounded-lg p-3">
          <p className='text-lg text-gray-700'>
            Hi Zeyao, as an IU alum like yourself, I'm excited to connect with you. I'm Dake, a junior at IU and an incoming Microsoft PM intern. With my experience at a Techstars company, I'm interested in discussing product at Google and learning about your journey. Let's chat!
          </p>
        </div>
        <div className='flex justify-between flex-grow mt-2 gap-x-8'>
          <Button color="purple" fullSized>Copy Text</Button>
          <Button color="purple" outline fullSized>Rewrite</Button>
        </div>
      </div>
    </div>
  )
  return (
    <div className='flex absolute bottom-7 right-0'>
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