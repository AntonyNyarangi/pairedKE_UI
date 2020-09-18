import axios from "axios";
import jwt_decode from "jwt-decode";
import { createBrowserHistory } from "history";
import history from "../history";

const baseURL = "http://localhost:3001/api";
export default {
  auth() {
    return {
      login: async credentials => {
        console.log(credentials);
        var response;
        try {
          response = await axios.post(`${baseURL}/users/login`, credentials);
          const userToken = response.data.token;
          var userData = jwt_decode(userToken);
          localStorage.setItem("userToken", userToken);
          localStorage.setItem("userData", JSON.stringify(userData));
          history.push("/cases");
        } catch (err) {
          alert(err.response.data.message);
        }
      },
      createUser: async userDetails => {
        axios.post("/users", {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          username: userDetails.username,
          healthFacilityID: userDetails.healthFacilityID,
          password: userDetails.password,
          isAdmin: false,
          isEnabled: true,
          isVerified: false
        });
      },
      updateUser: async userDetails => {
        axios.put(`${baseURL}/users/${userDetails.id}`, { userDetails });
      },
      getSystemUsers: async () => axios.get(`${baseURL}/users`)
    };
  },
  cases() {
    return {
      getOne: id => axios.get(`${baseURL}/cases/${id}`),
      getAll: (queryString = "") =>
        axios.get(`${baseURL}/cases?${queryString}`),
      create: caseDetails =>
        axios.post(`${baseURL}/cases`, {
          healthFacilityID: caseDetails.healthFacilityID,
          doctorName: caseDetails.doctorName,
          caseDescription: caseDetails.caseDescription,
          doctorEmail: caseDetails.doctorEmail,
          doctorPhoneNumber: parseInt(caseDetails.doctorPhone),
          patientID: caseDetails.patientID,
          donorID: caseDetails.donorID,
          caseDescription: caseDetails.caseDescription
        }),
      delete: id => axios.delete(`${baseURL}/cases/${id}`, {})
    };
  },
  patients() {
    return {
      getOne: id => axios.get(`${baseURL}/patients/${id}`),
      getAll: () => axios.get(`${baseURL}/patients`),
      create: patientDetails =>
        axios.post(`${baseURL}/patients`, {
          patientName: patientDetails.patientName,
          idNumber: patientDetails.patientID,
          bloodType: patientDetails.patientBloodGroup,
          age: patientDetails.patientAge,
          weight: patientDetails.patientWeight,
          height: patientDetails.patientHeight
        }),
      delete: id => axios.delete(`${baseURL}/patients/${id}`)
    };
  },
  health_facilities() {
    return {
      create: healthFacilityDetails =>
        axios.post(`${baseURL}/health_facilities`, {
          mflCode: healthFacilityDetails.mflCode,
          officialName: healthFacilityDetails.officialName,
          kephLevel: healthFacilityDetails.kephLevel,
          facilityType: "HOSPITALS",
          regulatoryBody: "Kenya MPDB",
          county: healthFacilityDetails.county,
          constituency: "",
          subCounty: "",
          ward: ""
        }),
      getAll: () => axios.get(`${baseURL}/health_facilities`)
    };
  },
  donors() {
    return {
      getOne: id => axios.get(`${baseURL}/donors/${id}`),
      getAll: () => axios.get(`${baseURL}/donors`),
      getAltruistic: () => axios.get(`${baseURL}/donors/altruistic`),
      create: donorDetails =>
        axios.post(`${baseURL}/donors`, {
          donorName: donorDetails.donorName,
          idNumber: donorDetails.donorID,
          bloodType: donorDetails.donorBloodGroup,
          age: donorDetails.donorAge,
          weight: donorDetails.donorWeight,
          height: donorDetails.donorHeight,
          smoker: donorDetails.smoker,
          illicitDrugUse: donorDetails.illicitDrugUse,
          highBloodPressure: donorDetails.highBloodPressure,
          diabetes: donorDetails.diabetes,
          kidneyDiseasePKD: donorDetails.kidneyDisease,
          kidneyFunction: donorDetails.kidneyFunction,
          psychiatricIllness: donorDetails.psychiatricIllness,
          heartDisease: donorDetails.heartDisease,
          untreatedCancer: donorDetails.untreatedCancer,
          urineProtein: donorDetails.urineProtein,
          infectionHepatitisB: donorDetails.infectionHepatitisB,
          infectionHepatitisC: donorDetails.infectionHepatitisC,
          infectionHIV: donorDetails.infectionHIV,
          medicalInsurance: donorDetails.medicalInsurance,
          historyBloodClots: donorDetails.historyBloodClots
        }),
      delete: id => axios.delete(`${baseURL}/donors/${id}`)
    };
  }
};
