import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const buttonStyle = {
  backgroundColor: "rgba(87,220,47,255)",
};

const Search = ({
  handleSubmit,
  companyName,
  setCompanyName,
  patentID,
  setPatentID,
  isLoading
}) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit} >
            <Row  className="justify-content-center">
              <Col xs={8}>
                <Form.Control 
                  type="text" 
                  value={patentID} 
                  onChange={(e)=>{setPatentID(e.target.value)}} 
                  placeholder="Patent ID"
                  disabled={isLoading}
                />
              </Col>
            </Row>
            <Row  className="justify-content-center mt-4" >
              <Col xs={8}>
                <Form.Control 
                  type="text" 
                  value={companyName} 
                  onChange={(e)=>{setCompanyName(e.target.value)}}  
                  placeholder="Company Name"
                  disabled={isLoading} 
                />
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col xs={8}>
                <Button 
                  variant="primary" 
                  type="submit" 
                  style={{...buttonStyle, width: '100%'}}
                  disabled={isLoading}
                >
                  CHECK
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
