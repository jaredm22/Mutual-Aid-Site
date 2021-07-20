import React from 'react'
import axios from 'axios';
import temp from '../../images/temp.png';
import './searchresults.css'
import DetailedView from './DetailedView';


class SearchResults extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: [], //receive from parent when search bar is completed
            loading: true,
            locationsPerPage: 5,
            currentPage: 1,
            maxPage: -1,
            prevDisabled: true,
            nextDisabled: false,
            displayResults: true,
            locationDisplay: {}
        }
        this.getLocations = this.getLocations.bind(this);
        this.paginate = this.paginate.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPrevClick = this.onPrevClick.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
        this.parentCallback = this.parentCallback.bind(this);
    }

    componentDidMount() {
        this.getLocations()
    }

    // Get a list of locations (removed when search bar is functioning)
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
            var currentPageIndex = 1
            var counter = 0
            for (let x = 0; x< locations.length; x++) {
                if (counter-(this.state.locationsPerPage) === 0) {
                    currentPageIndex += 1
                    counter = 0
                }
                locations[x]['page'] = currentPageIndex
                counter++;
            }
            if (currentPageIndex === 1) {
                this.setState({nextDisabled: true})
            }
            this.setState({locations: locations, loading: false, maxPage: currentPageIndex})
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Adjust page when next button is clicked
    onNextClick() {
        if (this.state.currentPage+1 === this.state.maxPage) {
            this.setState({nextDisabled: true})
        }
        this.setState({currentPage: this.state.currentPage+1, prevDisabled: false})
    }

    // Adjust page when previous button is clicked
    onPrevClick() {
        if (this.state.currentPage-1 === 1) {
            this.setState({prevDisabled: true})
        }
        this.setState({currentPage: this.state.currentPage-1, nextDisabled: false})
    }

    // Change display to individual display
    onViewClick(location) {
        this.setState({displayResults: false, locationDisplay: location})
        console.log(location)
    }

    // handles functionality when back button is pressed
    parentCallback() {
        this.setState({displayResults: true})
    }

    // split locations into individual groups based on locations
    paginate() {
        return(
            this.state.locations.map((location, index) => {
                if (location.page === this.state.currentPage) {
                    return (
                        <div className="location" key={location.name}>
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
                                <button className="view-button" onClick={()=>this.onViewClick(location)}>View</button>
                            </div>
                        </div>
                    )
                }
            }
        ))
    }

    render() {
        return(
            <React.Fragment>
                { this.state.displayResults ?
                    this.state.loading ? <div>Loading</div> :
                    <div className="result-group">
                        {this.paginate()}
                        <div className="button-group">
                            <button className="page-button prev" disabled={this.state.prevDisabled} onClick={this.onPrevClick}>Prev</button>
                            <button className="page-button next" disabled={this.state.nextDisabled} onClick={this.onNextClick}>Next</button>
                        </div>
                    </div>
                    :
                    <DetailedView parentCallback={this.parentCallback} location={this.state.locationDisplay}/>
                }
            </React.Fragment>
        )
    }
}

export default SearchResults;