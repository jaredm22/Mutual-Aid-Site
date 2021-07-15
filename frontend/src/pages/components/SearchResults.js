import React from 'react'
import axios from 'axios';
import temp from '../../images/temp.png';
import './searchresults.css'

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
                                <div className="location-index">{index+1}</div>
                                <div className="location-desc">
                                    <div className="location-info title">{location.name}</div>
                                    <div className="location-info">Distribution Days: Wednesday</div>
                                    <div className="location-info">Distribution Time: Varies</div>
                                    {location.phone == '' ? 
                                    <div className="location-info">Contact: Not Available</div> :
                                    <div className="location-info">Contact: #{location.phone}</div>
                                    }
                                </div>
                                <div className="location-button">
                                </div>
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