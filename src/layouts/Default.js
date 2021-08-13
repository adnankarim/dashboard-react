import React from "react";
import { Container, Row, } from "shards-react";


const DefaultLayout = ({ children }) => (
  <Container fluid>
    <Row>
        {children}
    </Row>
  </Container>
);



export default DefaultLayout;
