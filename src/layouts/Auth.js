import React from "react";
import { Container, Row, Col } from "shards-react";

import MainFooter from "../components/layout/MainFooter";

const AuthLayout = ({ children, noNavbar, noFooter }) => (
  <Container>
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
);

export default AuthLayout;
