import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../index.css'

function mountApp() {
  const root = document.createElement('div');
  root.id = "crx-root";
  document.querySelector('textarea')?.parentElement?.appendChild(root);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
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
