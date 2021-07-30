import React from 'react';
import './bar.css';

export default class Bar extends React.Component {
    render() {
    
        return(
            <div className="display">
                <div className="bar-title">
                    <div className="boston">BOSTON NEIGHBORHOOD</div>
                    <div className="title-bottom">
                        <div className="food">FOOD</div>
                        <div className="program">PROGRAMS</div>
                    </div>
                </div>
                <div className="orange"> </div>
                <div className="blue"></div>
            </div>
        );
    }
}