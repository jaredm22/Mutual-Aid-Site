import React from 'react';
import './App.css';
import Form from './components/Form';
import WrappedMap from './components/Map';

class App extends React.Component {
	render() {
		console.log(process.env.REACT_APP_GOOGLE_KEY);
		return(
			<div style={{width: '100vw', height: '100vh'}}>
				<WrappedMap 
					googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}'} 
					loadingElement={<div style={{height: '100%'}}></div>}
					containerElement={<div style={{height: '100%'}}></div>}
					mapElement={<div style={{height: '100%'}}></div>}
				/>
			</div>
		)
	}
}

export default App;
