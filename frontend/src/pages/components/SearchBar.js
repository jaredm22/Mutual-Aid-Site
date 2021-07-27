import React, {useState} from 'react';
import axios from 'axios';
import './searchbar.css';

function SearchBar() {
    const [stateSearch, setstateSearch] = useState('');

    const apiURL = "/locationInfo/findByZip/:zip";
    const fetchData = async() => { // a function
        const response = await axios.get(apiURL)
        setstateSearch(response.data) // the data here is JSON
    }

    return(
        <div className="SearchBarContainer">
            <input
            type="text"
            placeholder="Search by Zip Code"
        
            />
            <button type="submit" 
                onClick={fetchData}>Search</button>
        <div className="result">
            

            </div>

        </div>
    );

}

export default SearchBar;



// export default class SearchBar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {inputValue: ''};
//     };
    
    // it receives the value of the event target that 
    // we passed in as an argument to handle input change
    // handleInputChange(event) {
    //     this.setState({
    //         inputValue: event.target.value
    //     })
    // }

    // render() {
    //     return (
    //     <form>
    //         <input  
    //             type="text"
    //             value={this.state.inputValue}
    //             placeholder={'Search By Zipcode'}
    //             onChange={() => this.handleInputChange} />
             
    //     </form>
    //     );
    // }





