import classes from './Navbar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from 'react-router';

const NavBar = () => {

    const History = useHistory(); 

    const bt = (e) => {
        console.log(e.target.id)

        History.push(`/${e.target.id}`)        
    }
    
    return (
        <div className={classes.parentNav}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <button onClick={bt} id="Home">Home</button>
                            <button onClick={bt} id="VolunteerOpportunities">Volunteer Opportunites</button>
                            <button onClick={bt} id="ShelterLocator">Shelter Locator</button>
                            <button onClick={bt} id="HealthAccess">Health Access</button>
                            <button onClick={bt} id="LegalOrganization">Legal Organization</button>
                            
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;