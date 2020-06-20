import React, {Component} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/pricing">Pricing</Link>
                        <Link className="nav-link" to="/regitser">Register</Link>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/playlist">PlayList</Link>
                        <Link className="nav-link" to="/addnewSong">Add Songs</Link>
                        <Link className="nav-link" to="/songs">Songs</Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br/>
        </>;
    }
}
const mapStateToProps=state=>({
   count:state.count
});
export default connect(mapStateToProps)(Header);