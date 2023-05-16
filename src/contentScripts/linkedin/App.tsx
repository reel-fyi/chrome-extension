import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Spinner } from 'flowbite-react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiInformationCircle } from 'react-icons/hi';
import logo from '../../media/logo.svg';
import state from '../state';
import mixpanel from 'mixpanel-browser';

type MsgProperty = {
  msg: string[],
}

function App() {
  const [message, setMessage] = useState("");
  const [messageCopied, setMessageCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function constructMsgProperty(): MsgProperty {
    const property: MsgProperty = {
      msg: [
        message.slice(0, 255),
        message.slice(255),
      ]
    };

    return property;
  }

  const copyText = async () => {
    await navigator.clipboard.writeText(message);
    setMessageCopied(true);
    mixpanel.track('extension_copy', constructMsgProperty());
  }

  const rewrite = async () => {
    mixpanel.track('extension_rewrite', constructMsgProperty());
    await genMsg();
  }

  const genMsg = async () => {
    setMessageCopied(false);
    setIsLoading(true);
    const msg = await state.genConnMsg();
    if (msg.length > 0) {
      setMessage(msg);
      setIsLoading(false);
    }
  }

  const copyMessageBadge = (
    <Badge color="success">
      <span className="text-lg">
        Copied!
      </span>
    </Badge>
  )

  const noBioAlert = (
    <Alert color="failure" icon={HiInformationCircle}>
      <h3 className='text-red-700 text-lg'>
        <span className="font-medium">
          Please add a bio to your profile.
        </span>
        {'\n'}
        <a href="https://app.reel.fyi/dashboard#bio" target='_blank' className='underline font-semibold text-red-700 visited:text-red-700 hover:text-red-400 hover:visited:text-red-400 focus:text-red-700 focus:hover:text-red-700'>
          Click here to add one
        </a>
      </h3>
    </Alert>
  )

  const loadingSpinner = (
    <Spinner color="purple" aria-label="loading content" size='xl' />
  )

  useEffect(() => {
    if (state.userData && state.userData.bio.length > 0) {
      if (message.length === 0) {
        if (state.connMsg.length > 0) {
          setMessage(state.connMsg);
        } else {
          genMsg().catch(console.error);
        }
      }
    }
  }, []);

  return (
    <div className='bg-gray-100 rounded-lg shadow-lg'>
      <div className="flex flex-col px-8 py-4 gap-4">
        <div className='flex items-center justify-between self-start w-full'>
          <div className='flex items-center'>
            <img src={chrome.runtime.getURL(logo)} className="h-10 w-10" alt="Reel.fyi logo" />
            <h2 className='text-gray-800 text-2xl font-semibold'>Reel.fyi</h2>
          </div>
          <button className='text-2xl' onClick={() => state.appVisible = false}>
            <AiOutlineClose className='fill-gray-800' />
          </button>
        </div>
        {state.userData?.bio.length === 0 ? noBioAlert : <>
          <div className='flex items-center justify-between'>
            <h4 className='text-gray-800 text-xl font-light'>Your message:</h4>
            {messageCopied && copyMessageBadge}
          </div>
          <div className="bg-gray-200 rounded-lg p-3">
            <p className='text-lg text-gray-700'>
              {isLoading ? loadingSpinner : message}
            </p>
          </div>
          <div className='flex justify-between flex-grow mt-2 gap-x-8'>
            <Button color="purple" fullSized onClick={copyText}>
              <span className="flex items-center rounded-md text-lg px-6 py-1">
                Copy Text
              </span>
            </Button>
            <Button color="purple" outline fullSized onClick={rewrite}>
              <span className="flex items-center rounded-md text-lg px-6 py-1">
                Rewrite
              </span>
            </Button>
          </div>
        </>}
      </div>
    </div>
  );
}
export default App;