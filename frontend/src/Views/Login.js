import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";

class Login extends Component{

    constructor(props) {
        super(props);
        this.state={
            mail:'',
            pass:''
        }
    }

    render() {

        return <>
            <div className="container">
                <div className="row" >
                    <div className="col-md-3"></div>
                    <div className="col-md-6 text-center" >
                        <Card border="primary" >
                            <Card.Header>
                                <h1>Login</h1>
                            </Card.Header>
                            <Card.Body>


                                <Form noValidate  >


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
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Email.
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
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            Please Enter password.
                                        </Form.Control.Feedback>
                                    </div>


                                    <Button type="submit">Login</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>



        </>;
    }
}export default Login;