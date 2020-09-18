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
  Alert
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import api from "../utils/api";
import moment from "moment";

class AltruisticDonors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donorData: null,
      openDialog: false,
      donorBloodGroup: null,
      donorAge: 0,
      donorWeight: 0,
      donorHeight: 0,
      kidneyFunction:0,
      smoker: false,
      illicitDrugUse: false,
      highBloodPressure: false,
      diabetes: false,
      historyDiabetes: false,
      kidneyDiseasePKD: false,
      kidneyFunction: false,
      psychiatricIllness: false,
      heartDisease: false,
      untreatedCancer: false,
      historyUntreatedCancer: false,
      urineProtein: false,
      infectionHepatitisB: false,
      infectionHepatitisC: false,
      infectionHIV: false,
      medicalInsurance: false,
      historyBloodClots: false,
      successful: false,
      countdown: 0,
      timeUntilDismissed: 5
    };
  }
  async componentDidMount() {
    const donors = await api.donors().getAltruistic();
    console.log(donors);
    this.setState({
      donorData: donors.data
    });
  }

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

  handleCheckbox = event => {
    this.setState({
      [event.target.id]: !this.state[event.target.id]
    });
  };

  submitData = () => {
    const donor = api.donors().create(this.state);
    this.setState({ openDialog: false });
    if (donor !== null) {
      this.setState({
        successful: true
      });
    }
    console.log(donor);
  };

  dismiss = () => {
    this.setState({ successful: false });
  };
  // handleCheckbox(e, element) {
  //   this.setState({
  //     [element]: !this.state[element]
  //   });
  // }

  tableBody = () => {
    //   console.log(this.state.caseData)
    const donorData = this.state.donorData;
    if (donorData !== null) {
      const bodyContent = donorData.map(donor => {
        console.log(donor);
        return (
          <tr>
            <td>{donor.donorName}</td>
            <td>{donor.bloodType}</td>
            <td>{moment(donor.created_at).format("MMM Do YYYY")}</td>
            {/* <td>{donor.weight}</td>
            <td>{donor.height}</td> */}
          </tr>
        );
      });
      return bodyContent;
    }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Altruistic Donors"
              // subtitle="Donor Data"
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
                    Donor Registration Successful
                  </Alert>
                  <Row>
                    <Col lg="10">
                      {/* <h6 className="m-0">Donor List</h6> */}
                    </Col>
                    <Col lg="2">
                      <Button
                        theme="primary"
                        className="mb-2 mr-1"
                        onClick={this.openNewCaseDialog}
                      >
                        New Donor
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          Donor ID
                        </th>
                        <th scope="col" className="border-0">
                          Blood Group
                        </th>
                        <th scope="col" className="border-0">
                          Date Added
                        </th>
                        {/* <th scope="col" className="border-0">
                          Weight
                        </th>
                        <th scope="col" className="border-0">
                          Height
                        </th> */}
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
          size="lg"
          scrollable
        >
          <ModalHeader>Altruistic Donor Registration</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label>Donor Details</label>
                    <Row>
                      <Col lg={4}>
                        <FormInput
                          type="text"
                          id="donorName"
                          placeholder="Donor's full name"
                          onChange={this.handleChange}
                        />
                        <br />
                        <FormSelect
                          id="donorBloodGroup"
                          onChange={this.handleChange}
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
                          onChange={this.handleChange}
                        />
                        <br />
                        <FormInput
                          type="number"
                          id="donorWeight"
                          placeholder="Weight in Kgs"
                          onChange={this.handleChange}
                        />
                        <br />
                        <FormInput
                          type="number"
                          id="donorHeight"
                          placeholder="Height in cms"
                          onChange={this.handleChange}
                        />
                        <br />
                        <FormInput
                          type="number"
                          id="kidneyFunction"
                          placeholder="Kidney function GFR(0-120)"
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col lg={4}>
                        <FormCheckbox
                          checked={this.state.smoker}
                          id="smoker"
                          onChange={this.handleCheckbox}
                        >
                          Smoker
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.illicitDrugUse}
                          id="illicitDrugUse"
                          onChange={this.handleCheckbox}
                        >
                          Illicit drug user
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.highBloodPressure}
                          id="highBloodPressure"
                          onChange={this.handleCheckbox}
                        >
                          High blood pressure
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.diabetes}
                          id="diabetes"
                          onChange={this.handleCheckbox}
                        >
                          Diabetes
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.kidneyDisease}
                          id="kidneyDisease"
                          onChange={this.handleCheckbox}
                        >
                          Kidney Disease
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.psychiatricIllness}
                          id="psychiatricIllness"
                          onChange={this.handleCheckbox}
                        >
                          Psychiatric ilness
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.heartDisease}
                          id="heartDisease"
                          onChange={this.handleCheckbox}
                          // onChange={e => this.handleChange(e, "heartDisease")}
                        >
                          Heart Disease
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.untreatedCancer}
                          id="untreatedCancer"
                          onChange={this.handleCheckbox}
                        >
                          Untreated Cancer
                        </FormCheckbox>
                      </Col>
                      <Col lg={4}>
                        <FormCheckbox
                          checked={this.state.urineProtein}
                          id="urineProtein"
                          onChange={this.handleCheckbox}
                        >
                          Urine in Protein
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.infectionHepatitisB}
                          id="infectionHepatitisB"
                          onChange={this.handleCheckbox}
                        >
                          Hepatitis B
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.infectionHepatitisC}
                          id="infectionHepatitisC"
                          onChange={this.handleCheckbox}
                        >
                          Hepatitis C
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.infectionHIV}
                          id="infectionHIV"
                          onChange={this.handleCheckbox}
                        >
                          HIV/AIDS
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.medicalInsurance}
                          id="medicalInsurance"
                          onChange={this.handleCheckbox}
                        >
                          Medical Insurance
                        </FormCheckbox>
                        <FormCheckbox
                          checked={this.state.historyBloodClots}
                          id="historyBloodClots"
                          onChange={this.handleCheckbox}
                        >
                          History of blood clots
                        </FormCheckbox>
                        <br />
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
              onClick={this.submitData}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AltruisticDonors;
