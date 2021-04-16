import * as React from 'react';
import '../index.css';
import centroid from '@turf/centroid';
import mapboxgl from 'mapbox-gl';
// import MapboxWorker from 'mapbox-worker!/dist/mapbox-gl-csp-worker';
import data from '../../data/neighborhoods'
  
// mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
// function flyToStore(currentFeature) {
//     map.flyTo({
//       center: currentFeature.geometry.coordinates,
//       zoom: 15
//     });
//   }
  
// function createPopUp(currentFeature) {
//     var popUps = document.getElementsByClassName('mapboxgl-popup');
//     /** Check if there is already a popup on the map and if so, remove it */
//     if (popUps[0]) popUps[0].remove();

//     var popup = new mapboxgl.Popup({ closeOnClick: false })
//         .setLngLat(currentFeature.geometry.coordinates)
//         .setHTML('<h3>Sweetgreen</h3>' +
//         '<h4>' + currentFeature.properties.address + '</h4>')
//         .addTo(map);
// }


// function appendData(data) {
//     const neighborhoods = data.features.map( (neighborhood) => {
//         var prop = neighborhood.properties;
//         return prop;
//     })
//     console.log(neighborhoods);
//     data.features.forEach(function(neighborhood, i) {
//     //   console.log(neighborhood);
//       var prop = neighborhood.properties;


  
//       /* Add a new listing section to the sidebar. */
//       var listings = document.getElementById('descriptions');
//       var listing = listings.appendChild(document.createElement('div'));
//       /* Assign a unique `id` to the listing. */
//       listing.id = "listing-" + prop.Neighborhood_ID;
//       /* Assign the `item` class to each listing for styling. */
//       listing.className = 'item';
  
  
//       /* Add details to the individual listing. */
//       var details = listing.appendChild(document.createElement('div'));
//         details.innerHTML = prop.Name;
//     //   if (prop.phone) {
//     //     details.innerHTML += ' · ' + prop.phoneFormatted;
//     //   }
//     //   if (prop.distance) {
//     //     var roundedDistance = Math.round(prop.distance * 100) / 100;
//     //     details.innerHTML +=
//     //       '<p><strong>' + roundedDistance + ' miles away</strong></p>';
//     //   }
//     });
// }
  

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: -70.9,
            lat: 42.35,
            zoom: 9
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/jkym2/ckni1o0zu06zh17qigui0dmuv',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('load', function () {
            map.addSource('neighborhoods', {
                'type': 'geojson', data
            });
                 
                // Add a layer showing the state polygons.

            map.addLayer({
                'id': 'neighborhoods-layer',
                'type': 'fill',
                'source': 'neighborhoods', // reference the data source
                'layout': {},
                'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0.5
                }
            });
                // Add a black outline around the polygon.
            map.addLayer({
                'id': 'outline',
                'type': 'line',
                'source': 'neighborhoods',
                'layout': {},
                'paint': {
                    'line-color': '#000',
                    'line-width': 3
                }
            });

            // appendData(data);
            
            // map.on('click', 'places', function (e) {
            //     var coordinates = e.features[0].geometry.coordinates.slice();
            //     var description = e.features[0].properties.description;
                 
            //     // Ensure that if the map is zoomed out such that multiple
            //     // copies of the feature are visible, the popup appears
            //     // over the copy being pointed to.
            //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            //     }
                 
            //     new mapboxgl.Popup()
            //     .setLngLat(coordinates)
            //     .setHTML(description)
            //     .addTo(map);
            // });

            map.on('click', 'neighborhoods-layer', function (e) {

                var coordinates = e.lngLat;
                console.log(e.features[0]);
                var props = e.features[0].properties;
                const coor = centroid(e.features[0]);
                console.log(coor);

                
                map.flyTo({
                    center: coor.geometry.coordinates,
                    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
                    zoom: 12.5
                });

                
                new mapboxgl.Popup()
                    .setLngLat(coor.geometry.coordinates)
                    .setHTML(e.features[0].properties.Name)
                    .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the states layer.
            map.on('mouseenter', 'neighborhoods-layer', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
                
                // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'neighborhoods-layer', function () {
                map.getCanvas().style.cursor = '';
            });
        });
    }

    render() {
        return (
            <div className="main-container">
                <div className='sidebar'>
                    <div className='heading'>
                        <h1>Boston Mutual Aid</h1>
                        <br></br>
                    </div>
                    <Listings data={data}></Listings>
                </div>
                <div ref={this.mapContainer} className="map" id="map"></div>
            </div>
        );
    }
}


function Listings (props) {
    const data = props.data;
    const neighborhoods = data.features.map( (neighborhood) => {
        console.log(neighborhood.properties);
        var prop = neighborhood.properties;
        return prop;
    });

    return (
        <div className="descriptions" id="descriptions">
            {neighborhoods.map((neighborhood) => {
                return (
                <div id={`listing-${neighborhood.Neighborhood_ID}`} className="item">
                    <h4>{neighborhood.Name}</h4>
                    <div>{neighborhood.Neighborhood_ID}</div>
                    <div>{neighborhood.Acres}</div>
                    <div>{neighborhood.SqMiles}</div>
                </div>)
            })}
        </div>
    );
}