import React from 'react';
import Map from './components/map/Map';
import SearchResults from './components/searchresults/SearchResults'
import Bar from './components/bar/Bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			locations: []
		}
	}

	render() {
		return(
			<div className="page">
				<div className="bar"><Bar /></div>
				<div className="body">
					<div className="searchresults"><SearchResults/></div>
					<div className="map-display"><Map /></div>
				</div>
			</div>
		);
	}
}

export default App;
