import React from 'react';
import axios from 'axios';
import './map.css';
import centroid from '@turf/centroid';
import mapboxgl from 'mapbox-gl';
import data from '../../../data/neighborhoods';
import Form from '../form/Form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import 'mapbox-gl/dist/mapbox-gl.css';
// import logo from '../../images/julia1.jpg';
  
mapboxgl.accessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizationData: null,
            dataLoaded: false,
            lng: -71.073,
            lat: 42.319,
            zoom: 11
        };
        this.updateInformation = this.updateInformation.bind(this);
    }

    async componentDidMount() {
        const res = await axios.get("http://localhost:5000/listAllLocations");
        const organization_data = res.data;
        // console.log(organization_data);
        
        // const bostonZipCodes = ["02128", "02126", "02136", "02122", "02124", "02121", "02125", "02131", "02119", "02120", "02132", "02111", "02118", "02130", "02127", "02210", "02163", "02134", "02135", "02129", "02108", "02114", "02116", "02199", "02222", "02109", "02110", "02113", "02115", "02215"]
                
        const { lng, lat, zoom } = this.state;
        
        // Create mapbox map
        var map = new mapboxgl.Map({
            container: 'map',
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

            var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('click', 'neighborhoods-layer', function (e) {

                const coor = centroid(e.features[0]).geometry.coordinates;
                const properties = e.features[0].properties;

                // document.getElementById(`neighborhood-${properties.Neighborhood_ID}`).scrollIntoView();
                // document.getElementById(`neighborhood-${properties.Neighborhood_ID}`).click();
                
                map.flyTo({
                    center: coor,
                    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
                    zoom: 12.5
                });

                while (Math.abs(e.lngLat.lng - coor[0]) > 180) {
                    coor[0] += e.lngLat.lng > coor[0] ? 360 : -360;
                }
                
                popup
                    .setLngLat(coor)
                    .setHTML(`<h3>${properties.Name}</h3>`)
                    .addTo(map);
            });


            // Change the cursor to a pointer when the mouse is over the states layer.
            map.on('mouseenter', 'neighborhoods-layer', function (e) {
                map.getCanvas().style.cursor = 'pointer';

                const coor = centroid(e.features[0]).geometry.coordinates;
                const properties = e.features[0].properties;

                while (Math.abs(e.lngLat.lng - coor[0]) > 180) {
                    coor[0] += e.lngLat.lng > coor[0] ? 360 : -360;
                }
                
                popup
                    .setLngLat(coor)
                    .setHTML(`<h3>${properties.Name}</h3>`)
                    .addTo(map);
            });
                
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'neighborhoods-layer', function () {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        });
        this.setState({
            organizationData: organization_data,
            dataLoaded: true,
        })    
    }

    async updateInformation() {
        const res = await axios.get("http://localhost:5000/listAllLocations");
        const organization_data = res.data;
        this.setState({
            organizationData: organization_data,
            dataLoaded: true,
        })   
    }

    render() {
        return (
            // <div className="main-container">
            //     <div className='sidebar'>
            //         <div className='heading'>
            //             <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}> 
            //                 {/* <img className="logo" src={logo} style={{paddingRight: "20px"}}></img> */} 
            //                  {/* <h2>Boston Mutual Aid</h2> */}
            //              </div>
                        
            //             <Form parentCallback={this.updateInformation()}/>
            //         </div>
                    
            //         <div className="neighborhoods">
            //             {this.state.dataLoaded ? 
            //                 <Neighborhoods neighborhoodData={data} orgData={this.state.organizationData}></Neighborhoods> :
            //                 false
            //             }
            //         </div>
            //     </div>
            //     <div className="map" id="map"></div>
            // </div>
            <div className="map" id="map"></div>
        );
    }
}



// function Neighborhoods (props) {
//     const neighborhoodData = props.neighborhoodData;
//     // console.log(neighborhoodData);
    
//     const d =  neighborhoodData.features.map((neighborhood) => {
//         return neighborhood.properties.Name;
//     });
    
//     // console.log(d);
//     d.sort();
//     d.unshift('Boston-wide');

//     const neighborhoods = [];
//     d.forEach(name => {
//         if (name === "Boston-wide") {
//             const orgs = props.orgData.filter(i => {
//                 return i.neighborhood.includes(name);
//             });
//             const bw = {
//                 Name: name,
//                 orgs: orgs,
//             }
//             neighborhoods.push(bw);
//         } else {
//             const k = neighborhoodData.features.find(n => {
//                 return n.properties.Name === name;
//             }).properties;

//             const orgs = props.orgData.filter(i => {
//                 return i.neighborhood.includes(name);
//             });

//             const nbh = {
//                 Name: name, 
//                 Neighborhood_ID: k.Neighborhood_ID,
//                 orgs: orgs
//             }
//             neighborhoods.push(nbh);
//         }
//     });

//     return (
//         <List
//             component="div"
//             className="neighborhoods"
//             id="neighborhoods"
//         >
//             {neighborhoods.map((neighborhood) => {
//                 return (<Neighborhood key={`neighborhood-${neighborhood.Neighborhood_ID}`} neighborhood={neighborhood} orgs={neighborhood.orgs}/>);
//             })}
//         </List>
//     );
// }

// function Neighborhood(props) {
//     const [open, setOpen] = React.useState(true);
//     props.orgs.forEach((n)=>{
//         // console.log(n)
//     });
  
//     const handleClick = () => {
//       setOpen(!open);
//     };

//     return (
//       <div>
//         <ListItem button onClick={handleClick} id={`neighborhood-${props.neighborhood.Name === "Boston-wide" ? 0 : props.neighborhood.Neighborhood_ID }`}>
//           <ListItemText><h5>{props.neighborhood.Name}</h5></ListItemText>
//           {open ? <ExpandMore /> : <ExpandLess />}
//         </ListItem>
  
//         <Collapse in={!open} timeout="auto" unmountOnExit>
//           {props.orgs.length !== 0 ? (props.orgs.map((org) => {
//             return(
//               <ListItem key={`org-${org.id}`}>
//                 <Organization key={`org-${org.name}`} neighborhood={props.neighborhood.Name} org={org} />
//               </ListItem>);
//             })): 

//             (<ListItem>
//               <ListItemText secondary="No organizations"></ListItemText>
//             </ListItem>)}
//         </Collapse>
//       </div>
//     );
//   }
  
//   function Organization(props) {
//       const org = props.org;
  
//       return(
//         <Card className="organization">
//           <CardContent className="organization-info">
//             <h5>{org.name}</h5>
//             <p>{props.neighborhood}</p>
//             {org.email !== "" ? (<p>{org.email}</p>) : false}
//             {org.phone !== "" ? (<p>{org.phone}</p>)  : false}
//           </CardContent>
  
//           <CardContent className="organization-links">
//             {org.tags[0] == "Food" ? <p>Food</p> : false}
//             {org.website !== "" ? (<a href={org.website}>Website</a>)  : false}
//             {org.give_help !== "" ? (<a href={org.give_help}>Give Help</a>)  : false}
//             {org.need_help !== "" ? (<a href={org.need_help}>Get Help</a>)  : false}
//           </CardContent>
//         </Card>
//       )
//   }