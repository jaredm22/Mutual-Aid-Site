import React from 'react'
import temp from '../../../images/temp.png';
import prevbutton from '../../../images/nextbutton.png';
import './detailedview.css'

class DetailedView extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.location.name,
            days: this.props.location.days,
            times: this.props.location.times,
            phone: this.props.location.phone,
            address_one: this.props.location.address_one,
            address_two: this.props.location.address_two,
            city: this.props.location.city,
            state: this.props.location.state,
            zip: this.props.location.zip,
            email: this.props.location.email,
            website: this.props.location.website

        }
        this.getLocationDesc = this.getLocationDesc.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
    }

    getLocationDesc() {
        // Handle contact information, day availability, time availabilities         
        var days, times, phone, email, website = ""
        if (this.state.days.length == 0) {
            days = "Not available"
        } else {
            for (let x = 0; x < this.state.days.length; x++) {
                days += this.state.days[x] + ", "
            }
            days = days.substring(0,days.length-2)
        }

        if (this.state.times.length == 0) {
            times = "Not available"
        } else {
            for (let x = 0; x < this.state.times.length; x++) {
                times += this.state.times[x] + ", "
            }
            times = times.substring(0,times.length-2)
        }
    
        if (this.state.phone == "") {
            phone = "Not available"
        } else {
            phone = this.state.phone
        }
        if (this.state.email == "") {
            email = "Not available"
        } else {
            email = this.state.email
        }
        if (this.state.website == "") {
            website = "Not available"
        } else {
            website = this.state.website
        }


        // Handle address information and display corresponding results
        if (this.state.address_one === "") {
            return (
                <div className="location-description">
                    <div>Distribution Days: {days}</div>
                    <div>Distribution Time: {times}</div>
                    <div>Contact: #{phone}</div>
                    <div>Email: {email}</div>
                    <div>Address: Not Available</div>
                    <div><a href={website} target="_blank">Website</a></div>
                </div>
            )
        } else if (this.state.address_two === "") {
            return(
                <div className="location-description">
                    <div>Distribution Days: {days}</div>
                    <div>Distribution Time: {times}</div>
                    <div>Contact: #{phone}</div>
                    <div>Email: #{email}</div>
                    <div>{this.state.address_one}</div>
                    <div>{this.state.city}, {this.state.state} {this.state.zip}</div>
                    <div><a href={website} target="_blank">Website</a></div>
                </div>
            )
        }
    }

    onBackClick() {
        this.props.parentCallback()
    }

    render() {
        return(
            <div className="detailed-view">
                <div className="header">
                    <button className="back-button" onClick={this.onBackClick}><img src={prevbutton}/></button>
                    <div className="location-name">{this.state.name}</div>
                </div>
                <div className="image"><img src={temp} alt="location image"/></div>
                {this.getLocationDesc()}
            </div>
        )
    }
}

export default DetailedView