import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class Company extends Component {

    constructor(props) {
        super(props);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeWebSite = this.onChangeWebSite.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            companyName: '',
            email: '',
            webSite: '',
            companyList: [],
            isLoading: true
        }
    }
    onChangeCompanyName(e) {
        this.setState({
            companyName: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangeWebSite(e) {
        this.setState({
            webSite: e.target.value
        })
    }

    getCompany() {
        axios.get(`http://127.0.0.1:8000/api/company/`)
            .then(res => {
                this.setState({
                    companyList: res.data,
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
            companyName: '',
            email: '',
            webSite: ''
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.companyName,
            email: this.state.email,
            webSite: this.state.webSite
        };
        if (this.state.id) {
            axios.put('http://127.0.0.1:8000/api/company' + `/${this.state.id}/`, obj)
                .then(res => {
                    this.getCompany();
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/company/', obj)
                .then(res => {
                    this.getCompany();
                });
        }
        this.setState({
            id: '',
            companyName: '',
            email: '',
            webSite: ''
        })
    }

    editRow = (id, name, email, webSite) => {
        this.setState({
            id: id,
            companyName: name,
            email: email,
            webSite: webSite
        })
    }

    deleteRow = (id) => {
        console.log('this is:', id);
    }

    render() {
        const { isLoading, companyList } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h2 className="jumbotron">Company Details</h2>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col-md-6">
                                    <form onSubmit={this.onSubmit}>
                                        <input type="hidden" className="form-control" name="id" />
                                        <div className="form-group">
                                            <label>Company Name</label>
                                            <input className="form-control" value={this.state.companyName}
                                                onChange={this.onChangeCompanyName} name="name" placeholder="Company Name" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control" value={this.state.email}
                                                onChange={this.onChangeEmail} name="email" placeholder="Email" type="email" required />
                                        </div>
                                        <div className="form-group">
                                            <label>WebSite</label>
                                            <input className="form-control" value={this.state.webSite}
                                                onChange={this.onChangeWebSite} name="webSite" placeholder="WebSite" />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary" type="submit" >
                                                <i className="fa fa-floppy-o"></i>
                                                Submit</button>
                                            <button onClick={this.reset} className="btn btn-secondary" type="button" >
                                                <i className="fa fa-repeat"></i>
                                                Reset</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="text-center">Registered Companies</h6><br />
                                    <h6 className="text-center alert alert-danger" role="alert">message</h6><br />
                                    <table className="table table-sm table-hover">
                                        {/* <tbody>
                                            <tr >
                                                <td>AAAAA</td>
                                                <td>AAAAA</td>
                                                <td>
                                                    <a className="btn">
                                                        <i className="fa fa-upload"></i>
                                                        <input hidden type="file" name="logo" accept="image/*" />
                                                    </a>
                                                    <a className="btn" >
                                                        <i className="fa fa-pencil-square-o"></i>
                                                    </a>
                                                    <a className="btn" >
                                                        <i className="fa fa-trash-o"></i>
                                                    </a>
                                                    <a className="btn">
                                                        <i className="fa fa-user-plus"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody> */}
                                        <tbody>
                                            {!isLoading ? (companyList.map((item, i) => {
                                                return [
                                                    <Fragment>
                                                        <tr key={i}>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>
                                                                <a className="btn">a
                                                                    <i className="fa fa-upload"></i>
                                                                    <input hidden type="file" name="logo" accept="image/*" />
                                                                </a>
                                                                <a className="btn" onClick={(e) => this.editRow(item.id, item.name, item.email, item.webSite, e)}>b
                                                                    <i className="fa fa-pencil-square-o"></i>
                                                                </a>
                                                                <a className="btn" onClick={(e) => this.deleteRow(item.id, e)}>c
                                                                    <i className="fa fa-trash-o"></i>
                                                                </a>
                                                                <a className="btn">d
                                                                    <i className="fa fa-user-plus"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ];
                                            })
                                            ) : (
                                                    <p>loading...</p>
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}