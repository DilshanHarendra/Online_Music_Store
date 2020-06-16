import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";

class Register extends Component{

    constructor(props) {
        super(props);
        this.state={
            fullname:'',
            mail:'',
            telephone:'',
            pass1:'',
            pass2:''
        }
    }
    onChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {

        return <>
            <div className="container">
                <div className="row" >
                    <div className="col-md-3"></div>
                    <div className="col-md-6 text-center" >
                        <Card border="primary" >
                            <Card.Header>
                                <h1>Register</h1>
                            </Card.Header>
                            <Card.Body>


                                <Form noValidate  >


                                    <div className="input-field">
                                        <label htmlFor="fullname">Full Name <span className="text-danger">*</span></label>
                                        <Form.Control
                                            type="text"
                                            className="validate"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            name="fullname"
                                            id="fullname"
                                            value={this.state.fullname}
                                            onChange={this.onChange}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Full Name.
                                        </Form.Control.Feedback>
                                    </div>




                                    <div className="input-field">
                                        <label htmlFor="mail">E-mail <span className="text-danger">*</span></label>
                                        <Form.Control
                                            type="email"
                                            className="validate"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            name="mail"
                                            id="mail"
                                            value={this.state.mail}
                                            onChange={this.onChange}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Email.
                                        </Form.Control.Feedback>
                                    </div>



                                    <div className="input-field">
                                        <label htmlFor="telephone">Telephone <span className="text-danger">*</span></label>
                                        <Form.Control
                                            type="text"
                                            className="validate"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            name="telephone"
                                            id="telephone"
                                            value={this.state.telephone}
                                            onChange={this.onChange}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Phone.
                                        </Form.Control.Feedback>
                                    </div>



                                    <div className="input-field">
                                        <label htmlFor="pass1">Password <span className="text-danger">*</span></label>
                                        <Form.Control
                                            type="password"
                                            className="validate"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            name="pass1"
                                            id="pass1"
                                            value={this.state.pass1}
                                            onChange={this.onChange}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            Please Enter password.
                                        </Form.Control.Feedback>
                                    </div>



                                    <div className="input-field">
                                        <label htmlFor="pass2">Re-Enter Password <span className="text-danger">*</span></label>
                                        <Form.Control
                                            type="password"
                                            className="validate"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            name="pass2"
                                            id="pass2"
                                            value={this.state.pass2}
                                            onChange={this.onChange}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            Please Re-Enter password.
                                        </Form.Control.Feedback>
                                    </div>




                                    <Button type="submit">Register</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>



        </>;
    }
}export default Register;