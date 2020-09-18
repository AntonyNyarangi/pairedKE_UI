import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormInput,
  FormGroup,
  FormSelect,
  Alert
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import api from "../utils/api";
import moment from "moment";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: null,
      openDialog: false,
      successful: false,
      userDetails: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        username: "",
        healthFacilityID: "",
        password: ""
      },
      filterSearchParams: new URLSearchParams("")
    };
  }
  async componentDidMount() {
    this.getUsers();
    var filterSearchParams = new URLSearchParams("");
    filterSearchParams.set("state", "");
    console.log(filterSearchParams.get("state"));
    this.setState({ filterSearchParams });
  }
  getUsers = async () => {
    const users = await api.auth().getSystemUsers();
    this.setState({ usersData: users.data });
  };
  openNewUserDialog = () => {
    this.setState({
      openDialog: true
    });
  };

  closeNewUserDialog = () => {
    this.setState({
      openDialog: false
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleFacilityDetailsChange = event => {
    let facilityDetails = this.state.facilityDetails;
    facilityDetails[event.target.id] = event.target.value;
    this.setState({ facilityDetails });
  };

  submitFacilityData = async () => {
    // create facility
    const createdFacility = await api
      .health_facilities()
      .create(this.state.facilityDetails);
    this.setState({ openDialog: false });
    if (createdFacility !== null) {
      this.setState({
        successful: true
      });
    }
    console.log(createdFacility);
  };

  dismiss = () => {
    this.setState({ successful: false });
  };

  tableBody = () => {
    //   console.log(this.state.caseData)
    const usersData = this.state.usersData;
    if (usersData !== null) {
      const bodyContent = usersData.map(user => {
        return (
          <tr>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.healthFacility}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.isAdmin ? "System Admin" : "Facility Rep"}</td>
          </tr>
        );
      });
      return bodyContent;
    }
  };

  toggle = () => {
    this.setState(prevState => {
      return { filtersOpen: !prevState.filtersOpen };
    });
  };

  handleStatusFilter = event => {
    var filterSearchParams = this.state.filterSearchParams;
    if (event.target.value === "") {
      filterSearchParams.delete("state");
      this.getCases();
    } else {
      filterSearchParams.set("state", event.target.value);
      this.getCases(filterSearchParams.toString());
      this.toggle();
    }
    this.setState({ filterSearchParams });
  };

  render() {
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Health Facilities"
              // subtitle="Case Data"
              className="text-sm-left"
            />
          </Row>

          {/* Default Light Table */}
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <Alert
                    dismissible={this.dismiss}
                    open={this.state.successful}
                  >
                    User Registration Successful
                  </Alert>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }} />
                    <Button
                      theme="primary"
                      className="mb-2 mr-1"
                      onClick={this.openNewFacilityDialog}
                    >
                      New User
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          Name
                        </th>
                        <th scope="col" className="border-0">
                          Health Facility
                        </th>
                        <th scope="col" className="border-0">
                          Email
                        </th>
                        <th scope="col" className="border-0">
                          Phone
                        </th>
                        <th scope="col" className="border-0">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody>{this.tableBody()}</tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          open={this.state.openDialog}
          fade
          hideModal={this.closeNewFacilityDialog}
          // size="lg"
        >
          <ModalHeader style={{ "text-align": "center" }}>
            <b>Please fill the form</b>
          </ModalHeader>
          <ModalBody
            style={{
              "max-height": "calc(100vh - 210px)",
              "overflow-y": "auto"
            }}
          >
            <Form>
              <Row>
                <Col lg="12" md="12" sm="12">
                  <FormGroup>
                    <label>Official Name</label>
                    <FormInput
                      style={{ marginBottom: "10px" }}
                      type="text"
                      id="officialName"
                      placeholder="Official Name"
                      //   value={this.state.facilityDetails.officialName}
                      onChange={this.handleFacilityDetailsChange}
                    />
                    <label>MFL Code</label>
                    <FormInput
                      style={{ marginBottom: "10px" }}
                      type="text"
                      id="mflCode"
                      //   value={this.state.facilityDetails.mflCode}
                      onChange={this.handleFacilityDetailsChange}
                    />
                    <label>Keph Level</label>
                    <FormSelect
                      style={{ marginBottom: "10px" }}
                      id="kephLevel"
                      onChange={this.handleDonorDetailsChange}
                      //   value={this.state.facilityDetails.kephLevel}
                    >
                      <option value="Level 4">Level 4</option>
                      <option value="Level 5">Level 5</option>
                      <option value="Level 6">Level 6</option>
                    </FormSelect>
                    <label>County</label>
                    <FormSelect
                      style={{ marginBottom: "10px" }}
                      id="county"
                      onChange={this.handleDonorDetailsChange}
                      //   value={this.state.facilityDetails.county}
                    >
                      {/* {counties.map(county => {
                        return <option value={county}>{county}</option>;
                      })} */}
                    </FormSelect>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              theme="danger"
              className="mb-2 mr-1"
              onClick={this.closeNewFacilityDialog}
            >
              Cancel
            </Button>
            <Button
              theme="primary"
              className="mb-2 mr-1"
              onClick={this.submitFacilityData}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Users;
