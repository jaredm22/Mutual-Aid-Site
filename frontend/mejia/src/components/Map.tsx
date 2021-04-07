import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";

export class Map extends React.Component {
    render() {
        return (
         <GoogleMap 
            defaultZoom={10} 
            defaultCenter={{lat: 42.360081, lng: -71.058884}} 
            />
        );
    }
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap;