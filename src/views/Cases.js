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
  FormCheckbox,
  FormTextarea,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import api from "../utils/api";
import moment from "moment";

const tableHeaderData = [
  "Case",
  "Donor",
  "Patient",
  "Referring Doctor",
  "Hospital"
];
const defaultDonorDetails = {
  smoker: false,
  illicitDrugUse: false,
  highBloodPressure: false,
  diabetes: false,
  kidneyDisease: false,
  psychiatricIllness: false,
  heartDisease: false,
  untreatedCancer: false,
  urineProtein: false,
  infectionHepatitisB: false,
  infectionHepatitisC: false,
  infectionHIV: false,
  medicalInsurance: false,
  historyBloodClots: false
};
class Cases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caseData: null,
      openDialog: false,
      doctorDetails: {},
      patientDetails: {},
      donorDetails: { ...defaultDonorDetails },
      caseDescription: "",
      filterSearchParams: new URLSearchParams(""),
      successful: false
    };
  }
  async componentDidMount() {
    this.getCases();
    var filterSearchParams = new URLSearchParams("");
    filterSearchParams.set("state", "");
    console.log(filterSearchParams.get("state"));
    this.setState({ filterSearchParams });
  }
  getCases = async (filterQueryString = "") => {
    const cases = await api.cases().getAll(filterQueryString);
    this.setState({ caseData: cases.data });
  };
  openNewCaseDialog = () => {
    this.setState({
      openDialog: true
    });
  };

  closeNewCaseDialog = () => {
    this.setState({
      openDialog: false
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleDoctorDetailsChange = event => {
    let doctorDetails = this.state.doctorDetails;
    doctorDetails[event.target.id] = event.target.value;
    this.setState({ doctorDetails });
  };

  handlePatientDetailsChange = event => {
    let patientDetails = this.state.patientDetails;
    patientDetails[event.target.id] = event.target.value;
    this.setState({ patientDetails });
  };

  handleDonorDetailsChange = event => {
    let donorDetails = this.state.donorDetails;
    donorDetails[event.target.id] = event.target.value;
    this.setState({ donorDetails });
  };

  handleDonorDetailsCheckbox = event => {
    let donorDetails = this.state.donorDetails;
    donorDetails[event.target.id] = !donorDetails[event.target.id];
    this.setState({
      donorDetails
    });
  };

  submitCaseData = async () => {
    // create patient
    const patient = await api.patients().create(this.state.patientDetails);
    // create donor
    const donor = await api.donors().create(this.state.donorDetails);
    // create case
    console.log(patient, donor);
    const createdCase = await api.cases().create({
      healthFacilityID: 7,
      ...this.state.doctorDetails,
      donorID: donor.data.id,
      patientID: patient.data.id,
      caseDescription: this.state.caseDescription,
      filtersOpen: false
    });
    this.setState({ openDialog: false });
    if (createdCase !== null) {
      this.setState({
        successful: true
      });
    }
    console.log(createdCase);
  };

  tableBody = () => {
    //   console.log(this.state.caseData)
    const caseData = this.state.caseData;
    if (caseData !== null) {
      const bodyContent = caseData.map(myCase => {
        return (
          <tr>
            <td>{myCase.officialName}</td>
            <td>{myCase.county}</td>
            <td>{myCase.doctorName}</td>
            <td>{myCase.patientName}</td>
            <td>{myCase.donorName}</td>
            <td>{moment(myCase.created_at).format("MMM Do YYYY")}</td>
            <td>
              {myCase.isActive === 0 ? (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Inactive
                </span>
              ) : (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Active
                </span>
              )}
            </td>
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

  dismiss = () => {
    this.setState({ successful: false });
  };

  render() {
    console.log(this.state.filterSearchParams.get("state"));
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Case Data"
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
                    Case Registration Successful
                  </Alert>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Dropdown
                        open={this.state.filtersOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle>
                          <i
                            className="material-icons"
                            style={{ marginRight: "5px", color: "white" }}
                          >
                            filter_alt
                          </i>
                          Filters
                        </DropdownToggle>
                        <DropdownMenu style={{ width: "700px" }}>
                          <div style={{ padding: "0 10px" }}>
                            <label
                              style={{ display: "block", fontSize: "14px" }}
                            >
                              Status
                            </label>
                            <FormSelect
                              id="caseStatusFilter"
                              onChange={this.handleStatusFilter}
                              value={this.state.filterSearchParams.get("state")}
                            >
                              <option value="">All</option>
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </FormSelect>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <Button
                      theme="primary"
                      className="mb-2 mr-1"
                      onClick={this.openNewCaseDialog}
                    >
                      New Case
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          Health Facility
                        </th>
                        <th scope="col" className="border-0">
                          County
                        </th>
                        <th scope="col" className="border-0">
                          Doctor
                        </th>
                        <th scope="col" className="border-0">
                          Patient
                        </th>
                        <th scope="col" className="border-0">
                          Donor
                        </th>
                        <th scope="col" className="border-0">
                          Date
                        </th>
                        <th scope="col" className="border-0">
                          Status
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
          hideModal={this.closeNewCaseDialog}
          // size="lg"
        >
          <ModalHeader style={{ "text-align": "center" }}>
            <b>Please fill the case details</b>
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
                    <label style={{ "font-weight": "600" }}>
                      Doctor Details
                    </label>
                    <FormInput
                      type="text"
                      id="doctorName"
                      placeholder="Full Name"
                      onChange={this.handleDoctorDetailsChange}
                    />
                    <br />
                    <FormInput
                      type="text"
                      id="doctorEmail"
                      placeholder="Email Address"
                      onChange={this.handleDoctorDetailsChange}
                    />
                    <br />
                    <FormInput
                      type="text"
                      id="doctorPhone"
                      placeholder="Tel (254xxxxxx)"
                      onChange={this.handleDoctorDetailsChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col lg="12" md="12" sm="12">
                  <FormGroup>
                    <label style={{ "font-weight": "600" }}>
                      Patient Details
                    </label>
                    <FormInput
                      type="text"
                      id="patientName"
                      placeholder="Full Name"
                      onChange={this.handlePatientDetailsChange}
                    />
                    <br />
                    <FormInput
                      type="text"
                      id="patientID"
                      placeholder="ID Number"
                      onChange={this.handlePatientDetailsChange}
                    />
                    <br />
                    <FormSelect
                      id="patientBloodGroup"
                      onChange={this.handlePatientDetailsChange}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="O">O</option>
                    </FormSelect>
                    <br />
                    <br />
                    <FormInput
                      type="number"
                      id="patientAge"
                      placeholder="Age"
                      onChange={this.handlePatientDetailsChange}
                    />
                    <br />
                    <FormInput
                      type="number"
                      id="patientWeight"
                      placeholder="Weight in Kgs"
                      onChange={this.handlePatientDetailsChange}
                    />
                    <br />
                    <FormInput
                      type="number"
                      id="patientHeight"
                      placeholder="Height in cms"
                      onChange={this.handlePatientDetailsChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col lg="12" md="12" sma="12">
                  <FormGroup>
                    <label style={{ "font-weight": "600" }}>
                      Donor Details
                    </label>
                    <Row>
                      <Col lg={12}>
                        <FormInput
                          type="text"
                          id="donorName"
                          placeholder="Full Name"
                          onChange={this.handleDonorDetailsChange}
                        />
                        <br />
                        <FormInput
                          type="text"
                          id="donorID"
                          placeholder="ID Number"
                          onChange={this.handleDonorDetailsChange}
                        />
                        <br />
                        <FormSelect
                          id="donorBloodGroup"
                          onChange={this.handleDonorDetailsChange}
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="AB">AB</option>
                          <option value="O">O</option>
                        </FormSelect>
                        <br />
                        <br />
                        <FormInput
                          type="number"
                          id="donorAge"
                          placeholder="Age"
                          onChange={this.handleDonorDetailsChange}
                        />
                        <br />
                        <FormInput
                          type="number"
                          id="donorWeight"
                          placeholder="Weight in Kgs"
                          onChange={this.handleDonorDetailsChange}
                        />
                        <br />
                        <FormInput
                          type="number"
                          id="donorHeight"
                          placeholder="Height in cms"
                          onChange={this.handleDonorDetailsChange}
                        />
                        <br />
                        <FormInput
                          type="number"
                          id="kidneyFunction"
                          placeholder="GFR(0-120)"
                          onChange={this.handleDonorDetailsChange}
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col lg={6}>
                        <FormCheckbox
                          checked={this.state.donorDetails.smoker}
                          id="smoker"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Smoker
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.illicitDrugUse}
                          id="illicitDrugUse"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Illicit drug user
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.highBloodPressure}
                          id="highBloodPressure"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          High blood pressure
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.diabetes}
                          id="diabetes"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Diabetes
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.kidneyDisease}
                          id="kidneyDisease"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Kidney Disease
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.psychiatricIllness}
                          id="psychiatricIllness"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Psychiatric ilness
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.heartDisease}
                          id="heartDisease"
                          onChange={this.handleDonorDetailsCheckbox}
                          // onChange={e => this.handleChange(e, "heartDisease")}
                        >
                          Heart Disease
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.untreatedCancer}
                          id="untreatedCancer"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Untreated Cancer
                        </FormCheckbox>
                      </Col>
                      <Col lg={6}>
                        <FormCheckbox
                          checked={this.state.donorDetails.urineProtein}
                          id="urineProtein"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Urine in Protein
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.infectionHepatitisB}
                          id="infectionHepatitisB"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Hepatitis B
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.infectionHepatitisC}
                          id="infectionHepatitisC"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Hepatitis C
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.infectionHIV}
                          id="infectionHIV"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          HIV/AIDS
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.medicalInsurance}
                          id="medicalInsurance"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          Medical Insurance
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.donorDetails.historyBloodClots}
                          id="historyBloodClots"
                          onChange={this.handleDonorDetailsCheckbox}
                        >
                          History of blood clots
                        </FormCheckbox>
                        <label>Relationship to patient</label>
                        <FormSelect
                          id="patientRelationship"
                          onChange={this.handleDonorDetailsChange}
                        >
                          <option value="parent">Parent</option>
                          <option value="child">Child</option>
                          <option value="sibling">Sibling</option>
                          <option value="extended">Extended family</option>
                          <option value="other">
                            No biological relationship
                          </option>
                        </FormSelect>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col lg={12}>
                        <label>Case Summary/Description</label>
                        <FormTextarea
                          id="caseDescription"
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              theme="danger"
              className="mb-2 mr-1"
              onClick={this.closeNewCaseDialog}
            >
              Cancel
            </Button>
            <Button
              theme="primary"
              className="mb-2 mr-1"
              onClick={this.submitCaseData}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Cases;
