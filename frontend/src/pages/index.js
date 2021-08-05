import React from 'react';
import Auth from './components/login';
import Map from './components/Map';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return(
		<div>
			<Auth />
			<Map />
		</div>
	);
}

export default App;
