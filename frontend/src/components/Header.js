import React from "react";
import { Navbar, Container} from "react-bootstrap";

const navbarStyle={
    backgroundColor: "rgba(87,220,47,255)",
}

const Header = ({title}) => {
  return (
    <Navbar style={navbarStyle} data-bs-theme="light">
        <Container className="justify-content-center">
            <Navbar.Brand  href="/">{title}</Navbar.Brand>
        </Container>
    </Navbar>
  );
};

export default Header;