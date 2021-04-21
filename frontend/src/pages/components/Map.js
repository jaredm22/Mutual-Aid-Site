import * as React from 'react';
import axios from 'axios';
import '../index.css';
import centroid from '@turf/centroid';
import mapboxgl from 'mapbox-gl';
import data from '../../data/neighborhoods';
import Form from './Form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemtext';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

  
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
            organizationData: null,
            dataLoaded: false,
            lng: -70.9,
            lat: 42.35,
            zoom: 9
        };
        this.mapContainer = React.createRef();
    }

    async componentDidMount() {
        const res = await axios.get("http://localhost:5000/listAllLocations");
        const organization_data = res.data
        console.log(organization_data);
        
        // const bostonZipCodes = ["02128", "02126", "02136", "02122", "02124", "02121", "02125", "02131", "02119", "02120", "02132", "02111", "02118", "02130", "02127", "02210", "02163", "02134", "02135", "02129", "02108", "02114", "02116", "02199", "02222", "02109", "02110", "02113", "02115", "02215"]
                
        const { lng, lat, zoom } = this.state;
        
        // Create mapbox map
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/jkym2/ckni1o0zu06zh17qigui0dmuv',
            center: [lng, lat],
            zoom: zoom
        });

        // When map loads, add neighborhood layer data from source and add layer to map
        map.on('load', function () {
            map.addSource('neighborhoods', {
                'type': 'geojson', data
            });

            //
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

                console.log(e.features[0]);
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
        this.setState({
            organizationData: organization_data,
            dataLoaded: true,
        })
    }

    render() {
        console.log(this.state.organizationData);
        return (
            <div className="main-container">
                <div className='sidebar'>
                    <div className='heading'>
                        <h1>Boston Mutual Aid</h1>
                        <Form></Form>
                    </div>
                    
                    <div className="neighborhoods">
                        {this.state.dataLoaded ? 
                            <Neighborhoods neighborhoodData={data} orgData={this.state.organizationData}></Neighborhoods> :
                            false
                        }
                    </div>
                </div>
                <div ref={this.mapContainer} className="map" id="map"></div>
            </div>
        );
    }
}



function Neighborhoods (props) {
    const neighborhoodData = props.neighborhoodData;
    
    const d =  neighborhoodData.features.map((neighborhood) => {
        return neighborhood.properties.Name;
    });
    
    d.sort();
    d.unshift('Boston-wide');
    const o2 = props.orgData.find(i => {
        return i.neighborhood.includes("Boston-wide");
    });


    const neighborhoods = [];
    d.forEach(name => {
        if (name === "Boston-wide") {
            const o = props.orgData.filter(i => {
                return i.neighborhood.includes(name);
            });
            console.log(o);
            const bw = {
                Name: name,
                orgs: o,
            }
            neighborhoods.push(bw);
        } else {
            const k = neighborhoodData.features.find(n => {
                return n.properties.Name === name;
            }).properties;
            const o = props.orgData.filter(i => {
                return i.neighborhood.includes(name);
            });

            const nbh = {
                Name: name, 
                Neighborhood_ID: k.Neighborhood_ID,
                orgs: o
            }
            neighborhoods.push(nbh);
        }
    });

    return (
        <List
            component="div"
            className="neighborhoods"
            id="neighborhoods"
        >
            {neighborhoods.map((neighborhood) => {
                return (<Neighborhood key={neighborhood.Neighborhood_ID} neighborhood={neighborhood} orgs={neighborhood.orgs}/>);
            })}
        </List>
    );
}

function Neighborhood(props) {
    const [open, setOpen] = React.useState(true);
  
    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <div>
        <ListItem button onClick={handleClick}>
          <ListItemText><h5>{props.neighborhood.Name}</h5></ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
  
        <Collapse in={props.neighborhood.Name == "Boston-wide" ? open : !open} timeout="auto" unmountOnExit>
          {props.orgs.map((org) => {
            return(
              <ListItem>
                <Organization key={`org-${org.Name}`} org={org} />
              </ListItem>);
          })}
        </Collapse>
      </div>
    );
  }
  
//   function Organizations(props) {
//     return (
//       <Collapse in={open} timeout="auto" unmountOnExit>
//           {props.orgs.map((org) => {
//             return(
//               <ListItem>
//                 <Organization org={org} />
//               </ListItem>);
//           })}
//       </Collapse>
//     )
//   }
  
  function Organization(props) {
      const org = props.org;
  
      return(
        <Card className="organization">
          <CardContent className="organization-info">
            <h6>{org.name}</h6>
            {org.email !== "" ? (<p>{org.email}</p>) : false}
            {org.phone !== "" ? (<p>{org.phone}</p>)  : false}
          </CardContent>
  
          <CardContent className="organization-links">
            {org.website !== "" ? (<a href={org.website}>Website</a>)  : false}
            {org.give_help !== "" ? (<a href={org.give_help}>Give Help</a>)  : false}
            {org.need_help !== "" ? (<a href={org.need_help}>Get Help</a>)  : false}
          </CardContent>
        </Card>
      )
  }