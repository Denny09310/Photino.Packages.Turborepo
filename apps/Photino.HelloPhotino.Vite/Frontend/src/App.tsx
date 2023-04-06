import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';

import './App.css';

const App = () => {
	return (
		<Suspense fallback={<span>Loading...</span>}>
			{useRoutes(routes)}
			<Toaster />
		</Suspense>
	);
};

export default App;

