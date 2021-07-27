import React from 'react';
import Map from './components/Map';
import Bar from './components/Bar';
import SearchBar from './components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return(
		<div>
			<Map />
			<Bar/>	
			<SearchBar/>
		</div>
	);
}

export default App;
