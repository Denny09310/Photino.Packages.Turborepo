import { PhotinoChannel } from '@photino/core'
import { Link } from 'react-router-dom';

const testChannel = new PhotinoChannel<string>("test-channel")

const Channels = () => {
  const sendMessage = () => testChannel.sendMessage("Hello, World!").then(alert);

  return (
    <div className='App'>
      <h1>Channels</h1>
      <p>The IPC system is a channel architecture to have a more granular control <br />
        on what you send to who</p>

      <div className='hint'>
        <p >It's a singleton pattern. In this way you can create a channel in a page and use it through the entire application</p>
      </div>

      <h2>Let's try</h2>
      <div className="card">
        <button onClick={sendMessage}>Send a message to the test channel</button>
      </div>

      <Link to='/'>Return home</Link>
    </div>
  )
}

export default Channels