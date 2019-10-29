import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { IoMdTrash } from "react-icons/io";
import { MdDoneAll, MdPersonAdd } from "react-icons/md";
import { TiPencil, TiUpload, TiArrowSync } from "react-icons/ti";

export default class Employee extends Component {

    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: '',
            companyId: this.props.match.params.companyId,
            employeeList: [],
            isLoading: true
        }
    }
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePhoneNo(e) {
        this.setState({
            phoneNo: e.target.value
        })
    }

    getCompany() {
        axios.get(`http://127.0.0.1:8000/api/employee/`)
            .then(res => {
                this.setState({
                    employeeList: res.data,
                    isLoading: false
                });
            })
    }

    componentDidMount() {
        this.getCompany();
    }

    reset = () => {
        this.setState({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: ''
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNo: this.state.phoneNo,
            companyId: this.state.companyId
        };
        if (this.state.id) {
            axios.put('http://127.0.0.1:8000/api/employee' + `/${this.state.id}/`, obj)
                .then(res => {
                    ToastsStore.success('Successfully Updated!');
                    this.getCompany();
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/employee/', obj)
                .then(res => {
                    ToastsStore.success('Successfully Saved!');
                    this.getCompany();
                });
        }
        this.setState({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: ''
        })
    }

    editRow = (id, name, email, phoneNo) => {
        this.setState({
            id: id,
            firstName: name,
            email: email,
            phoneNo: phoneNo
        })
    }

    deleteRow = (id) => {
        axios.delete('http://127.0.0.1:8000/api/employee' + `/${id}/`)
            .then(res => {
                ToastsStore.warning('Successfully Deleted!');
                this.getCompany();
            });
    }


    render() {
        const { isLoading, employeeList } = this.state;

        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h2 className="jumbotron">Employee Details</h2>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col-md-6">
                                    <form onSubmit={this.onSubmit}>
                                        <input type="hidden" className="form-control" name="id" />
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input className="form-control" value={this.state.firstName}
                                                onChange={this.onChangeFirstName} name="firstName" placeholder="First Name" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input className="form-control" value={this.state.lastName}
                                                onChange={this.onChangeLastName} name="lastName" placeholder="Last Name" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control" value={this.state.email}
                                                onChange={this.onChangeEmail} name="email" placeholder="Email" type="email" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input className="form-control" value={this.state.phoneNo}
                                                onChange={this.onChangePhoneNo} name="phoneNo" placeholder="Phone Number" />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary" type="submit" >
                                                Submit <MdDoneAll />
                                            </button>
                                            <button onClick={this.reset} className="btn btn-secondary" type="button" >
                                                <TiArrowSync />
                                                Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    {/* <h6 className="text-center">Registered Companies</h6><br /> */}
                                    {/* <div>
                                        { 
                                        if(!isLoading)
                                            return (
                                            <h6 className="text-center alert alert-danger" role="alert">message</h6>
                                        );
                                        }
                                    </div> */}

                                    <div>
                                        {isLoading ? (
                                            <h6 className="text-center alert alert-danger" role="alert">Loading...</h6>
                                        ) : (
                                                <h6 className="text-center">Registered Companies</h6>
                                            )}
                                    </div>
                                    <br></br>

                                    {/* <h6 className="text-center alert alert-danger" role="alert">message</h6><br /> */}
                                    <table className="table table-sm table-hover">
                                        <tbody>
                                            {(employeeList.map((item, i) => {
                                                if (!isLoading)
                                                    return [
                                                        <Fragment>
                                                            <tr key={i}>
                                                                <td>{item.name}</td>
                                                                <td>{item.email}</td>
                                                                <td>
                                                                    <a className="btn">
                                                                        <TiUpload />
                                                                        <input hidden type="file" name="logo" accept="image/*" />
                                                                    </a>
                                                                    <a className="btn" onClick={(e) => this.editRow(item.id, item.name, item.email, item.PhoneNo, e)}>
                                                                        <TiPencil />
                                                                    </a>
                                                                    <a className="btn" onClick={(e) => this.deleteRow(item.id, e)}>
                                                                        <IoMdTrash />
                                                                    </a>
                                                                    <a className="btn">
                                                                        <MdPersonAdd />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </Fragment>
                                                    ];
                                            })
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastsContainer store={ToastsStore} />
                </div>
            </div>
        )
    }
}