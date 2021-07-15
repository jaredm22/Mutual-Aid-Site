import React from 'react'
import axios from 'axios';
import {temp} from '../../images/temp.png';

class SearchResults extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: [], //receive from parent when search bar is completed
            loading: true
        }
        this.getLocations = this.getLocations.bind(this);
    }

    componentDidMount() {
        this.getLocations()
    }

    getLocations() {
        const options = {
            url: 'http://localhost:5000/listAllLocations',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios(options)
        .then( res => {
            var locations = res.data
            this.setState({locations: locations, loading: false})
        })
        .catch(err => {
            console.log(err)
        })
    }


    render() {
        return(
            <React.Fragment>
                {this.state.loading ? <div>Loading</div> :
                    <div className="result-group">
                        {this.state.locations.map((location, index) => {
                            return (
                            <div className="location">
                                <img src={temp} alt="image"/>
                                <h1>{index+1}{location.name}</h1>
                            </div>
                            )
                        })}
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default SearchResults;