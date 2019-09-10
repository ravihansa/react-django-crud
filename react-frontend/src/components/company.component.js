import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Company extends Component {
    constructor(props) {
        super(props);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeWebSite = this.onChangeWebSite.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            companyName: '',
            email: '',
            webSite: ''
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

    onSubmit(e) {
        e.preventDefault();
        console.log(`The values are ${this.state.companyName}, ${this.state.email}, and ${this.state.webSite}`)
        this.setState({
            companyName: '',
            email: '',
            webSite: ''
        })
    }
    render() {
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
                                        <input type="hidden" name="id" />
                                        <div className="form-group">
                                            <label>Company Name</label>
                                            <input className="form-control" value={this.state.companyName}
                                                onChange={this.onChangeCompanyName} name="name" placeholder="Company Name" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control" value={this.state.email}
                                                onChange={this.onChangeEmail} name="email" placeholder="Email" required />
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
                                            <button className="btn btn-secondary" type="button" >
                                                <i className="fa fa-repeat"></i>
                                                Reset</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="text-center">Registered Companies</h6><br />
                                    <h6 className="text-center alert alert-danger" role="alert">message</h6><br />
                                    <table className="table table-sm table-hover">
                                        <tbody>
                                            <tr >
                                                <td>AAAAA</td>
                                                <td>AAAAAAAAAA</td>
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