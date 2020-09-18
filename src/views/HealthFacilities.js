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

const counties = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita-Taveta",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Tharaka-Nithi",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "West Pokot",
  "Samburu",
  "Trans-Nzoia",
  "Uasin Gishu",
  "Elgeyo-Marakwet",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
  "Nairobi"
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
class HealthFacilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facilitiesData: null,
      openDialog: false,
      successful: false,
      facilityDetails: {
        officialName: "",
        mflCode: "",
        kephLevel: "Level 4",
        County: "Mombasa"
      },
      filterSearchParams: new URLSearchParams("")
    };
  }
  async componentDidMount() {
    this.getFacilities();
    var filterSearchParams = new URLSearchParams("");
    filterSearchParams.set("state", "");
    console.log(filterSearchParams.get("state"));
    this.setState({ filterSearchParams });
  }
  getFacilities = async (filterQueryString = "") => {
    const facilities = await api.health_facilities().getAll(filterQueryString);
    this.setState({ facilitiesData: facilities.data });
  };
  openNewFacilityDialog = () => {
    this.setState({
      openDialog: true
    });
  };

  closeNewFacilityDialog = () => {
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
    const facilitiesData = this.state.facilitiesData;
    if (facilitiesData !== null) {
      const bodyContent = facilitiesData.map(facility => {
        return (
          <tr>
            <td>{facility.officialName}</td>
            <td>{facility.kephLevel}</td>
            <td>{facility.county}</td>
            {/* <td>{facility.subCounty}</td> */}
            {/* <td>{myCase.constituency}</td> */}
            {/* <td>{facility.ward}</td> */}
            {/* <td>{moment(facility.created_at).format("MMM Do YYYY")}</td> */}
            <td>{facility.caseCount}</td>
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
    console.log(this.state.filterSearchParams.get("state"));
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
                     Health Facility Registration Successful
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
                      New Facility
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          Facility Name
                        </th>
                        <th scope="col" className="border-0">
                          Level
                        </th>
                        <th scope="col" className="border-0">
                          County
                        </th>
                        <th scope="col" className="border-0">
                          Active Cases
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
                      value={this.state.facilityDetails.officialName}
                      onChange={this.handleFacilityDetailsChange}
                    />
                    <label>MFL Code</label>
                    <FormInput
                      style={{ marginBottom: "10px" }}
                      type="text"
                      id="mflCode"
                      value={this.state.facilityDetails.mflCode}
                      onChange={this.handleFacilityDetailsChange}
                    />
                    <label>Keph Level</label>
                    <FormSelect
                      style={{ marginBottom: "10px" }}
                      id="kephLevel"
                      onChange={this.handleDonorDetailsChange}
                      value={this.state.facilityDetails.kephLevel}
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
                      value={this.state.facilityDetails.county}
                    >
                      {counties.map(county => {
                        return <option value={county}>{county}</option>;
                      })}
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

export default HealthFacilities;
