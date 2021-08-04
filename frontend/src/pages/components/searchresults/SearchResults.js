import React from 'react'
import axios from 'axios';
import nextbutton from '../../../images/nextbutton.png';
import searchbutton from '../../../images/searchbutton.png';
import DetailedView from '../detailedview/DetailedView';
import './searchresults.css';


class SearchResults extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: [], //receive from parent when search bar is completed
            loading: true,
            locationsPerPage: 4,
            currentPage: 1,
            maxPage: -1,
            prevDisabled: true,
            nextDisabled: false,
            displayResults: true,
            locationDisplay: {},
            zip: ""
        }
        this.paginate = this.paginate.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPrevClick = this.onPrevClick.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.updateZip = this.updateZip.bind(this);
        this.getAllLocations = this.getAllLocations.bind(this);
        this.parentCallback = this.parentCallback.bind(this);
    }

    componentDidMount() {
        // set locations
        this.getAllLocations();
    }

    // Get a list of all locations
    getAllLocations() {
        var locations = []
        axios({
            url: 'http://localhost:5000/listAllLocations',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        .then((res) => {
            locations = res.data
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
            } else {
                this.setState({nextDisabled: false})
            }

            this.setState({locations: locations, loading: false, maxPage: currentPageIndex})
            })
        .catch((e) => {
            console.log(e)
        });
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
                                <button className="view-button" onClick={()=>this.onViewClick(location)}><img className="next-button" src={nextbutton} alt="next button"/></button>
                            </div>
                        </div>
                    )
                }
            }
        ))
    }

    // fetch data
    fetchData() {
        this.setState({loading: true, currentPage: 1})
        if (this.state.zip.length < 5) {
            this.getAllLocations();
        } else {
            axios({
                url: 'http://localhost:5000/locationInfo/findByZip/' + this.state.zip,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    zip: this.state.zip
                }
            })
            .then((res) => {
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
            .catch((e) => {
                console.log(e)
            });
        }
    }

    // update results
    updateZip(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    // handles functionality when back button is pressed
    parentCallback() {
        this.setState({displayResults: true})
    }

    render() {
        return(
            <React.Fragment>
                <div className="SearchBarContainer">
                    <div className="search-button-div">
                        <button className="search-button" type="submit" onClick={this.fetchData}><img src={searchbutton} alt="Search Button"/></button>
                    </div>
                    <div className="grey-divider"></div>
                    <input
                        type="text"
                        placeholder="Search by Zip Code"
                        className="search-field"
                        maxLength={5}
                        name="zip"
                        value={this.state.zip}
                        onChange={this.updateZip}
                    />
                </div>
                { this.state.displayResults ?
                    this.state.loading ? false :
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


