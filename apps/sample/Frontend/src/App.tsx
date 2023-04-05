import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {sendMessage, receiveMessage} from '@photino/core'

function App() {
  const [count, setCount] = useState(0)

  // const {sendMessage} = useWebviewChannel("service-worker-info-channel")

  useEffect(() => receiveMessage(console.log), []);

  const handleSendMessage = () =>  sendMessage({ version: count + ".0.0" });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <button onClick={handleSendMessage}>Send Message</button>

      {/* FIXME: The message is not updated realtime due the not yet rendered value in react */}
      <p>Open the console to see the message received</p>
    </div>
  )
}

export default App
