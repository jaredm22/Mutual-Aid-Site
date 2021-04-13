import React from 'react';
const axios = require("axios");

// Defining types for props and state
interface FormProps {
}

interface FormState {
    name: string,
    neighborhood: string,
    address_one: string,
    address_two: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    email: string,
    links: string,
    description: string
}

export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        const initialState = {
            name: '',
            neighborhood: 'allston',
            address_one: '',
            address_two: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            email: '',
            links: '',
            description: ''
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState(Object.assign(this.state, {[name]: value}));
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        const options = {
            url: 'http://localhost:8000/location/add',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                name: this.state.name,
                neighborhood: this.state.neighborhood,
                address_one: this.state.address_one,
                address_two: this.state.address_two,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                phone: this.state.phone,
                email: this.state.email,
                links: this.state.links,
                description: this.state.description
            }
        }

        console.log(options)

        axios(options)
        .then((res:any) => {
            console.log('Successfully added')
        })
        .catch((err:any) => {
            console.log(err)
        });
    }

    render() {
        return(
            <div className='form-wrapper'>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className='name'>
                        <label htmlFor='name'>Name</label>
                        <input type='name' name='name' onChange={this.handleChange} />
                    </div>
                    <div className='neighborhood'>
                        <label htmlFor='neighborhood'>Neighborhood</label>
                        <select value={this.state.neighborhood} name="neighborhood" onChange={this.handleChange}>
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
                    <div className='address_one'>
                        <label htmlFor='address_one'>Address Line 1</label>
                        <input type='address_one' name='address_one' onChange={this.handleChange} />
                    </div>
                    <div className='address_two'>
                        <label htmlFor='address_two'>Address Line 2</label>
                        <input type='address_two' name='address_two' onChange={this.handleChange} />
                    </div>
                    <div className='city'>
                        <label htmlFor='city'>City</label>
                        <input type='city' name='city' onChange={this.handleChange} />
                    </div>
                    <div className='state'>
                        <label htmlFor='state'>State</label>
                        <input type='state' name='state' onChange={this.handleChange} />
                    </div>
                    <div className='zip'>
                        <label htmlFor='zip'>Zip</label>
                        <input type='zip' name='zip' onChange={this.handleChange} />
                    </div>
                    <div className='phone'>
                        <label htmlFor='phone'>Phone</label>
                        <input type='phone' name='phone' onChange={this.handleChange} />
                    </div>
                    <div className='email'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' onChange={this.handleChange} />
                    </div>
                    <div className='links'>
                        <label htmlFor='links'>Link</label>
                        <input type='links' name='links' onChange={this.handleChange} />
                    </div>
                    <div className='description'>
                        <label htmlFor='description'>Description</label>
                        <input type='description' name='description' onChange={this.handleChange} />
                    </div>
                    <div className='submit'>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;