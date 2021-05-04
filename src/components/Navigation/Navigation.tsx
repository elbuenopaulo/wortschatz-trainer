import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Navigation.css'

interface NavigationProps {
    isExam: boolean;
}

class Navigation extends React.Component<NavigationProps> {

    public render(): React.ReactNode {
        return (
            <>
            <div className='navigation-container'>
                {
                    this.props.isExam ?
                    <Nav fill variant="tabs">
                        <Nav.Item>
                        <Nav.Link>Erfassen</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Trainieren</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link><Link to="/exam">Prüfen</Link></Nav.Link>
                    </Nav.Item>
                    </Nav>
                    :
                    <Nav fill variant="tabs">
                    <Nav.Item>
                        <Nav.Link><Link to="/">Erfassen</Link></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link><Link to="/training">Trainieren</Link></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link><Link to="/exam">Prüfen</Link></Nav.Link>
                    </Nav.Item>
                </Nav>
                }
            </div>
            </>
        )
    }
}

export default Navigation;