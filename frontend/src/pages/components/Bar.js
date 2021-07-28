import React from 'react';
import './bar.css';
import img1 from '../../images/header.jpg';

export default class Bar extends React.Component {
    render() {
    
        return(
            <nav className="MyNavContainer">
              <div className="LeftSide">
                  <h1 id="boston">BOSTON NEIGHBORHOOD</h1>
                  <h1 id="food">FOOD</h1>
                  <h1 id="program">PROGRAMS</h1>
              </div> 
            <div id="RightSide"> </div>
            <div id="VerticalOrange"></div>
            </nav>
        );
    }
}