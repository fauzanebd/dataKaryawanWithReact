import React, { Component } from 'react';
import {
    Alert,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Employee = (props) => (
    <div className="employee-container p-2 m-2 d-flex flex-column">
        <h3>{props.name}</h3>
        <div className="employee-body">
            <div>{props.position}</div>
        </div>
        <div className="employee-footer">
            <Button color="secondary" tag={Link} to={"/employees/" + props.id}>Edit</Button>
            <Button color="danger" onClick={() => props.remove(props.id)}>Hapus</Button>
        </div>
    </div>
);

class EmployeesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            isLoading: true,
            errorMessage: null
        };
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        const response = await this.props.api.getAll();
        if (!response.ok) {
            this.setState({
                    errorMessage: `Failed to load employees: ${response.status} ${response.statusText}`,
                    isLoading: false
                }
            )
        }
        else {
            const body = await response.json();
            const employees = body._embedded.employees;
            this.setState({
                employees: employees,
                isLoading: false,
                errorMessage: null
            });
        }
    }

    async remove(id) {
        let response = await this.props.api.delete(id);
        if (!response.ok) {
            this.setState({errorMessage: `Failed to delete employee: ${response.status} ${response.statusText}`})
        }
        else {
            let updatedEmployees = [...this.state.employees].filter(i => i.id !== id);
            this.setState({employees: updatedEmployees, errorMessage: null});
        }
    }

    render() {
        const {employees, isLoading, errorMessage} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                {this.props.navbar}
                <div className="d-flex flex-row justify-content-between p-3">
                    <h3 className="employees-title">Karyawan</h3>
                    <Button color="success" tag={Link} to="/employees/new">Tambah Karyawan Baru</Button>
                </div>
                { errorMessage ?
                    <div className="d-flex flex-row justify-content-center">
                        <Alert color="warning" style={{flex:1, maxWidth:'80%'}}>
                            {errorMessage}
                        </Alert>
                    </div> : null
                }
                <div className="d-flex flex-row flex-container flex-wrap justify-content-center">
                    { employees.map( employee =>
                        <Employee {...employee} remove={this.remove.bind(this)} key={employee.id}/>
                    )}
                    { !employees || employees.length === 0 ? <p>No employees!</p> : null}
                </div>
            </div>
        );
    }
}

export default EmployeesList;