import React from 'react';
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
import 'mapbox-gl/dist/mapbox-gl.css';
  
mapboxgl.accessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
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
    }

    async componentDidMount() {
        const res = await axios.get("http://localhost:5000/listAllLocations");
        const organization_data = res.data
        console.log(organization_data);
        
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

            map.on('click', 'neighborhoods-layer', function (e) {

                const coor = centroid(e.features[0]).geometry.coordinates;
                const properties = e.features[0].properties;

                document.getElementById(`neighborhood-${properties.Neighborhood_ID}`).scrollIntoView();
                document.getElementById(`neighborhood-${properties.Neighborhood_ID}`).click();
                
                map.flyTo({
                    center: coor,
                    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
                    zoom: 12.5
                });

                while (Math.abs(e.lngLat.lng - coor[0]) > 180) {
                    coor[0] += e.lngLat.lng > coor[0] ? 360 : -360;
                }
                
                new mapboxgl.Popup({ closeOnClick: true, offset: 25})
                    .setLngLat(coor)
                    .setHTML(`<h1>${properties.Name}</h1>`)
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
                
                new mapboxgl.Popup({ closeOnMove:true, closeOnClick: false, offset: 25})
                    .setLngLat(coor)
                    .setHTML(`<h1>${properties.Name}</h1>`)
                    .addTo(map);
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
                <div className="map" id="map"></div>
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
        <ListItem button onClick={handleClick} id={`neighborhood-${props.neighborhood.Name === "Boston-wide" ? 1 : props.neighborhood.Neighborhood_ID }`}>
          <ListItemText><h5>{props.neighborhood.Name}</h5></ListItemText>
          {open ? <ExpandMore /> : <ExpandLess />}
        </ListItem>
  
        <Collapse in={!open} timeout="auto" unmountOnExit>
          {props.orgs.length !== 0 ? (props.orgs.map((org) => {
            return(
              <ListItem>
                <Organization key={`org-${org.Name}`} org={org} />
              </ListItem>);
            })): 

            (<ListItem>
              <ListItemText secondary="No organizations"></ListItemText>
            </ListItem>)}
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