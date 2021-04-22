import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Defining types for props and state
interface FormProps {
}

interface FormState {
    name: string,
    neighborhood: string,
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
    show: boolean
}

export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        const initialState = {
            name: '',
            neighborhood: 'boston wide',
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
        e.preventDefault();

        axios({
            url: 'http://localhost:5000/location/add',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                name: this.state.name,
                neighborhood: this.state.neighborhood,
                phone: this.state.phone,
                email: this.state.email,
                website: this.state.website,
                need_help: this.state.need_help,
                give_help: this.state.give_help,
                address_one: this.state.address_one,
                address_two: this.state.address_two,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
            }
        })
        .then((res:any) => {
            console.log('Successfully added')
            this.handleClose()
        })
        .catch((err:any) => {
            console.log(err)
        });
    }

    handleClose() {
        this.setState({show: false, name: '', neighborhood: '', phone:'', email:'', website:'', need_help:'', give_help: '', address_one:'', address_two:'', city:'', state:'',zip:''})
    }

    handleShow() {
        this.setState({show: true})
    }

    render() {
        return(
            <div className='form-wrapper'>
                <Button className="btn-primary" variant="light" onClick={this.handleShow}>Add Location</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className='name'>
                                <label htmlFor='name'>Name</label>
                                <input type='text' name='name' onChange={this.handleChange} />
                            </div>
                            <div className='neighborhood'>
                                <label htmlFor='neighborhood'>Neighborhood</label>
                                <select value={this.state.neighborhood} name="neighborhood" onChange={this.handleChange}>
                                    <option value="boston wide">Boston Wide</option>
                                    <option value="allston">Allston</option>
                                    <option value="back bay">Back Bay</option>
                                    <option value="bay village">Bay Village</option>
                                    <option value="beacon hill">Beacon Hill</option>
                                    <option value="brighton">Brighton</option>
                                    <option value="charlestown">Charlestown</option>
                                    <option value="chinatown">Chinatown</option>
                                    <option value="dorchester">Dorchester</option>
                                    <option value="downtown">Downtown</option>
                                    <option value="east boston">East Boston</option>
                                    <option value="fenway-kenmore">Fenway-Kenmore</option>
                                    <option value="hyde park">Hyde Park</option>
                                    <option value="jamaica plain">Jamaica Plain</option>
                                    <option value="mattapan">Mattapan</option>
                                    <option value="mission hill">Mission Hill</option>
                                    <option value="north end">North End</option>
                                    <option value="rosindale">Rosindale</option>
                                    <option value="roxbury">Roxbury</option>
                                    <option value="south boston">South Boston</option>
                                    <option value="south end">South End</option>
                                    <option value="west end">West End</option>
                                    <option value="west roxbury">West Roxbury</option>
                                    <option value="wharf district">Wharf District</option>
                                </select>
                            </div>
                            <div className='phone'>
                                <label htmlFor='phone'>Phone</label>
                                <input type='number' name='phone' onChange={this.handleChange} />
                            </div>
                            <div className='email'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' name='email' onChange={this.handleChange} />
                            </div>
                            <div className='website'>
                                <label htmlFor='website'>Website</label>
                                <input type='text' name='website' onChange={this.handleChange} />
                            </div>
                            <div className='need_help'>
                                <label htmlFor='need_help'>Link for those who need help:</label>
                                <input type='text' name='need_help' onChange={this.handleChange} />
                            </div>
                            <div className='give_help'>
                                <label htmlFor='give_help'>Link for those who can help:</label>
                                <input type='text' name='give_help' onChange={this.handleChange} />
                            </div>
                            <div className='address_one'>
                                <label htmlFor='address_one'>Address Line 1</label>
                                <input type='text' name='address_one' onChange={this.handleChange} />
                            </div>
                            <div className='address_two'>
                                <label htmlFor='address_two'>Address Line 2</label>
                                <input type='text' name='address_two' onChange={this.handleChange} />
                            </div>
                            <div className='city'>
                                <label htmlFor='city'>City</label>
                                <input type='text' name='city' onChange={this.handleChange} />
                            </div>
                            <div className='state'>
                                <label htmlFor='state'>State</label>
                                <input type='text' name='state' onChange={this.handleChange} />
                            </div>
                            <div className='zipp'>
                                <label htmlFor='zip'>Zip</label>
                                <input type='text' name='zip' onChange={this.handleChange} />
                            </div>
                            <div className='captcha'>
                                ***INPUT CAPTCHA HERE***
                            </div>
                            <div className='submit'>
                                <button>Submit</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Form;