import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button, Alert
} from "shards-react";
import UserDetails from "./UserDetails";
import api from "../../utils/api";

export default function UserAccountDetails({ title = "Account Details" }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [alert, setAlert] = useState(false);

  return (
    <Card small className="mb-4">
      <Alert dismissible={()=>{setAlert(false)}} open={alert}>
        Update successful. You will see changes next time you log in.
      </Alert>
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">First Name</label>
                    <FormInput
                      id="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={event => {
                        setFirstName(event.target.value);
                      }}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feLastName">Last Name</label>
                    <FormInput
                      id="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={event => {
                        setLastName(event.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={event => {
                        setEmail(event.target.email);
                      }}
                      autoComplete="email"
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Phone Number</label>
                    <FormInput
                      type="phoneNumber"
                      id="phoneNumber"
                      placeholder="Email Address"
                      value={phoneNumber}
                      onChange={event => {
                        setPhoneNumber(event.target.phoneNumber);
                      }}
                      autoComplete=""
                    />
                  </Col>
                </Row>
                <Button
                  theme="accent"
                  onClick={async () => {
                    await api.auth().updateUser({
                      id: userData.id,
                      firstName: firstName,
                      lastName: lastName,
                      phoneNumber: phoneNumber,
                      email: email
                    });
                    // alert
                    setAlert(true);
                  }}
                >
                  Update Account
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
