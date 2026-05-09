import './index.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { App } from '~/app';

const root = document.getElementById('root');

if (!root) {
	throw Error('There needs to be a `div#root` present to mount your app.');
}

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
