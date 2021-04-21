import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Defining types for props and state
interface AdminPanelProps {
}

interface location {
    id: number,
    name: string,
    neighborhood: string,
    phone: string,
    email: string,
    website: string,
    need_help: string,
    give_help: string
}

interface AdminPanelState {
    locations: location[],
    isLoading: boolean,
}

export class AdminPanel extends React.Component<AdminPanelProps, AdminPanelState> {
    constructor(props: AdminPanelProps) {
        super(props);
        const initialState = {
            locations: [],
            isLoading: true,
        }
        this.state = initialState;
        this.getLocations = this.getLocations.bind(this);
    }

    componentDidMount() {
        this.getLocations();
    }

    getLocations() {
        axios({
            url: 'http://localhost:5000/listAllLocations',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            var loc = res.data
            for (var x in loc){
                this.state.locations.push(loc[x])
            }
            this.setState({isLoading: false})
        })
        .catch(err => {
            console.log(err)
        });
    }    

    render() {
        return(
            <div>
                {this.state.isLoading ? <div>Loading</div> :
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Neighborhood</TableCell>
                                    <TableCell align="center">Phone</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Website</TableCell>
                                    <TableCell align="center">Need Help</TableCell>
                                    <TableCell align="center">Give Help</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.locations.map((row, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row"> {row.id}</TableCell>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.neighborhood}</TableCell>
                                            <TableCell align="center">{row.phone}</TableCell>
                                            <TableCell align="center">{row.email}</TableCell>
                                            <TableCell align="center">{row.website}</TableCell>
                                            <TableCell align="center">{row.need_help}</TableCell>
                                            <TableCell align="center">{row.give_help}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
        );
    }
}

export default AdminPanel;
