import { receiveMessage, sendMessage } from '@photino/core';
import { useEffect, useState } from 'react';

import photinoLogo from '../assets/photino.png';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import { Link } from 'react-router-dom';


const Home = () => {
	const [count, setCount] = useState(0);

	useEffect(() => receiveMessage(alert), []);

	const callDotNet = () => sendMessage('Hi .NET! 🤖');


	return (
		<div className='App'>
			<div>
				<a href='https://vitejs.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://reactjs.org' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
				<a href='https://www.tryphotino.io/' target='_blank'>
					<img src={photinoLogo} className='logo photino' alt='Photino logo' />
				</a>
			</div>
			<h1>Vite + React + Photino</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<button onClick={callDotNet}>call backend</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<Link to="/channels">See the IPC in action</Link>
			<p className='read-the-docs'>Click on the Vite, React and Photino logos to learn more</p>
		</div>
	);
};

export default Home;
