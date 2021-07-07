import React from 'react';
import './bar.css';

export default class Bar extends React.Component {
    render() {
        return(
            <nav className="Bar">
              <div className="LeftSide"> 
                <span style="color:blue;font-weight:bold">BOSTON NEIGHBORHOOD 
                </span>
                <br/>
                <span style="color:orange;font-weight:bold">FOOD PROGRAMS</span>
            </div> 
            <div id="RightSide"> </div>
            </nav>
        );
    }
}