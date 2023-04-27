import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../index.css'
import logo from '../media/logo.svg';
import state from './state';

function renderApp(reactRoot: ReactDOM.Root, icon: HTMLImageElement) {
  const iconRect = icon.getBoundingClientRect();
  console.log(iconRect);
  reactRoot.render(
    <React.StrictMode>
      <div style={
        {
          visibility: state.appVisible ? 'visible' : 'hidden',
          position: 'fixed',
          top: iconRect.top,
          left: iconRect.right,
          width: '28rem',
          zIndex: 9999999,
        }}>
        <App />
      </div>
    </React.StrictMode>
  );
}

function mountApp() {
  const root = document.createElement('div');
  root.id = "crx-root";
  document.body.appendChild(root);
  const reactRoot = ReactDOM.createRoot(root);

  const iconRoot = document.createElement('div');
  iconRoot.id = "crx-icon-root";
  iconRoot.style.cssText = "position: absolute; top: 0px; right: -8px; z-index: 9999;";

  const icon = document.createElement('img');
  icon.src = chrome.runtime.getURL(logo);
  icon.alt = "reel.fyi logo";
  icon.width = 42;

  iconRoot.appendChild(icon);

  iconRoot.onclick = () => {
    if (!state.appVisible) {
      state.appVisible = true;
    }
  }
  
  const textareaElement = document.querySelector<HTMLElement>('textarea');
  textareaElement?.parentElement?.appendChild(iconRoot);
  document.addEventListener(state.events.appVisible, () => {
    renderApp(reactRoot, icon);
  });

  // fix textarea styles injected by tailwind
  if (textareaElement) {
    textareaElement.style.backgroundColor = 'var(--color-background-none)';
    textareaElement.style.fontSize = 'var(--artdeco-reset-forms-font-size)';
    textareaElement.style.lineHeight = 'inherit';
  }
}

const ADD_NOTE_BTN_QUERY = 'button[aria-label="Add a note"]';
const addNoteBtn = document.querySelector(ADD_NOTE_BTN_QUERY);

if (addNoteBtn) {
  console.log('addNoteBtn found');
  addNoteBtn.addEventListener('click', () => {
    console.log("Add a note button clicked");
    mountApp();
  });
} else {
  const observer = new MutationObserver(() => {
    const btn = document.querySelector(ADD_NOTE_BTN_QUERY);
    if (btn) {
      // figure out how to get icon to show up again after this observer disconnects
      observer.disconnect();
      btn.addEventListener('click', () => {
        console.log("Add a note button clicked");
        mountApp();
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Get linkedin profile info
const EXPERIENCE_QUERY = 'div#experience';
const FIRST_EXPERIENCE_QUERY = 'div.pvs-list__outer-container > ul.pvs-list > li';
const MANY_EXP_QUERY = 'span.pvs-entity__path-node';
const NAME_QUERY = 'div.pv-text-details__left-panel > div > h1';

// name
const nameEl = document.querySelector<HTMLElement>(NAME_QUERY);
if (nameEl) {
  state.connectionName = nameEl.innerText;
  console.log(state.connectionName);
}

// experience
const expDiv = document.querySelector(EXPERIENCE_QUERY);
if (expDiv) {
  // has experiences
  const expSec = expDiv.parentElement;
  if (expSec) {
    // cut off index from the text in the first experience
    let idx = 2;
    // check if there were many experiences at 1 company
    if (expSec.querySelector(MANY_EXP_QUERY)) {
      // the "timeline" effect on linkedin forces us to set this value to be at least 4
      idx = 4;
    }
    const firstExp = expSec.querySelector<HTMLElement>(FIRST_EXPERIENCE_QUERY);
    if (firstExp) {
      const firstExpText = firstExp.outerText.split('\n');
      const exp = Array.from(new Set(firstExpText)).slice(0, idx).join('\n');
      state.connectionInfo = exp;
      console.log(state.connectionInfo);
    }
  }
}


// Clean up some styles on the page, because tailwind messes them up a bit
const FOLLOW_BTN_QUERY = 'div.pvs-profile-actions > button.pvs-profile-actions__action';
const followBtn = document.querySelector<HTMLElement>(FOLLOW_BTN_QUERY);
if (followBtn) {
  followBtn.style.backgroundColor = 'var(--voyager-color-action)';
}