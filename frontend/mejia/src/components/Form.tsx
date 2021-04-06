import React from 'react';
const axios = require("axios");

// Defining types for props and state
interface FormProps {
}

interface FormState {
    name: string,
    address_one: string,
    address_two: string,
    city: string,
    state: string,
    zip: string,
    phone: string[],
    email: string[],
    links: string[],
    description: string
}

export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        const initialState = {
            name: '',
            address_one: '',
            address_two: '',
            city: '',
            state: '',
            zip: '',
            phone: [],
            email: [],
            links: [],
            description: ''
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case 'phone':
                this.state.phone.push(value)
                break;
            case 'email':
                this.state.email.push(value)
                break;
            case 'links':
                this.state.links.push(value)
                break;
            default:
                this.setState(Object.assign(this.state, {[name]: value}));
        }
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
                    <div className='Description'>
                        <label htmlFor='Description'>Description</label>
                        <input type='Description' name='Description' onChange={this.handleChange} />
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