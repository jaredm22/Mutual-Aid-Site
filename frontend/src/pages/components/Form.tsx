import React, { useRef } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReCAPTCHA from 'react-google-recaptcha';
import { requirePropFactory, TextField } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import './form.css';

// Defining types for props and state
interface FormProps {
    parentCallback: Function,
}

interface FormState {
    name: string,
    neighborhood: Array<string>,
    phone: string,
    email: string,
    website: string,
    need_help: string,
    give_help: string,
    address_one: string,
    address_two: string,
    city: string,
    state: string,
    zip: string,
    show: boolean,
    tag: Array<string>,
    days: Array<string>,
    times: Array<string>
}

const tags = [
    "Food",
    "Shelter",
    "Grocery"
]

const neighborhoods = [
    "Boston-wide",
    "Allston",
    "Back Bay",
    "Bay Village",
    "Beacon Hill",
    "Brighton",
    "Charlestown",
    "Chinatown",
    "Dorchester",
    "Downtown",
    "East Boston",
    "Fenway",
    "Harbor Islands",
    "Hyde Park",
    "Jamaica Plain",
    "Leather District",
    "Longwood",
    "Mattapan",
    "Mission Hill",
    "North End",
    "Roslindale",
    "Roxbury",
    "South Boston",
    "South Boston Waterfront",
    "South End",
    "West End",
    "West Roxbury"
]

 const ITEM_HEIGHT = 48;
 const ITEM_PADDING_TOP = 8;
 const MenuProps = {
   PaperProps: {
     style: {
       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
       width: 250,
     },
   },
 };

export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        const initialState = {
            name: '',
            neighborhood: ['Boston-wide'],
            phone: '',
            email: '',
            website: '',
            need_help: '',
            give_help: '',
            address_one: '',
            address_two: '',
            city: '',
            state: '',
            zip: '',
            days: [],
            times: [],
            tag: [],
            show: false
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }


     handleChange = (e: any) => {
         e.preventDefault();
         const { name, value } = e.target;
         this.setState(Object.assign(this.state, {[name]: value}));
     }
    

    handleSubmit = (e: any) => {
        // Change phone number format
        let phone = "("
        phone+= this.state.phone.substring(0,3)
        phone+= ") "
        phone+= this.state.phone.substring(3,6)
        phone+= "-"
        phone+= this.state.phone.substring(6,10)
        console.log(phone)
        e.preventDefault();
        axios({
            url: 'http:localhost:5000/location/add',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                name: this.state.name,
                neighborhood: this.state.neighborhood.join(),
                phone: phone,
                email: this.state.email,
                website: this.state.website,
                need_help: this.state.need_help,
                give_help: this.state.give_help,
                address_one: this.state.address_one,
                address_two: this.state.address_two,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                tag: this.state.tag.join(),
                days: this.state.days,
                times: this.state.times
            }
        })
        .then((res:any) => {
            console.log('Successfully added');
            this.handleClose();
            this.props.parentCallback();
        })
        .catch((err:any) => {
            console.log(err)
        });
    }

    handleClose() {
        this.setState({show: false, name: '', neighborhood: ['Boston-wide'], phone:'', email:'', website:'', need_help:'', give_help: '', address_one:'', address_two:'', city:'', state:'',zip:'',tags:['']})
    }

     handleShow() {
         this.setState({show: true})
     }

     onChange(value) {
          let result = validateHuman(value); 
         console.log("Captcha Value:", value);
     }

    render() {
        var { name, neighborhood, phone, email, website, need_help, give_help, address_one, address_two, city, state, zip, tag } = this.state
        return(
             <div className='form-container'>
                 <Button id="add-org-button" className="btn-primary" variant="light" onClick={this.handleShow}><h6></h6></Button>
                 <Modal className="" show={this.state.show} onHide={this.handleClose}>
                     <Modal.Header closeButton>
                         <Modal.Title></Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                         <form onSubmit={this.handleSubmit} noValidate className="form">
                             <div className="input-wrapper">
                                 <TextField
                                     id="name"
                                     className="input-box"
                                     name="name"
                                     label="Name"
                                     value={name}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>
                            
                             <div className="input-wrapper">
                                 <TextField
                                     id="email"
                                     className="input-box"
                                     name="email"
                                     label="Email"
                                     value={email}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                                 <TextField
                                     id="phone"
                                     name="phone"
                                     className="input-box"
                                     label="Phone"
                                     value={phone}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>

                             <div className="input-wrapper">
                                 <TextField
                                     id="website"
                                     className="input-box"
                                     name="website"
                                     label="Website"
                                     value={website}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>

                             <div className="input-wrapper">
                                 <TextField
                                     id="need-help"
                                     className="input-box"
                                     name="need_help"
                                     label="Request Aid Form URL"
                                     value={need_help}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>

                             <div className="input-wrapper">
                                 <TextField
                                     id="give-help"
                                     className="input-box"
                                     name="give_help"
                                     label="Offer Aid Form URL"
                                     value={give_help}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>

                             <div className="input-wrapper">
                                 <TextField
                                     id="address_one"
                                     className="input-box"
                                     name="address_one"
                                     label="Address 1"
                                     value={address_one}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>

                             <div className="input-wrapper">
                                 <TextField
                                     id="address_two"
                                     className="input-box"
                                     name="address_two"
                                     label="Address 2"
                                     value={address_two}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>
                               
                             <div className="input-wrapper">
                                 <TextField
                                     id="city"
                                     className="input-box"
                                     name="city"
                                     label="City"
                                     value={city}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>

                             <div className="input-wrapper">
                                 <TextField
                                     id="state"
                                     className="input-box"
                                     name="state"
                                     label="State"
                                     value={state}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>
                            
                             <div className="input-wrapper">
                                 <TextField
                                     id="zip"
                                     className="input-box"
                                     name="zip"
                                     label="Zip"
                                     value={zip}
                                     variant="outlined"
                                     onChange={this.handleChange} 
                                 />
                             </div>

                            <div>
                                <FormControl>
                                    <InputLabel id="demo-mutiple-chip-label">Neighborhood</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-chip-label"
                                        id="demo-mutiple-chip"
                                        multiple
                                        name="neighborhood"
                                        value={neighborhood}
                                        onChange={this.handleChange}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value}/>
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {neighborhoods.map((n) => (
                                            <MenuItem key={n} value={n} >
                                                {n}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div> 
                            <div>
                                <FormControl>
                                    <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-chip-label"
                                        id="demo-mutiple-chip"
                                        multiple
                                        name="tag"
                                        value={tag}
                                        onChange={this.handleChange}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value}/>
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {tags.map((n) => (
                                            <MenuItem key={n} value={n} >
                                                {n}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div> 
                            <div className='captcha'>
                                <ReCAPTCHA sitekey={process.env.SITE_KEY} onChange={this.onChange}/>
                            </div>

                             <div className='submit'>
                                <button className="submit-button">Submit</button>
                             </div>
                         </form>
                     </Modal.Body>
                 </Modal>
             </div>
        );
    }
}

export default Form;