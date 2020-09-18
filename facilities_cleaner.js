// const { default: api } = require("./src/utils/api");
const axios = require("./node_modules//axios/lib/axios.js");
var rawFacilities = require("./facilities.json").facilities;

var i = 0;
for (i; i < rawFacilities.length; i++) {
  delete rawFacilities[i]["name"];
  delete rawFacilities[i].facility_type_name;
  delete rawFacilities[i]["county"];
  delete rawFacilities[i].constituency;
  delete rawFacilities[i].ward;
  delete rawFacilities[i].owner_name;
  delete rawFacilities[i].owner_type_name;
  delete rawFacilities[i].beds;
  delete rawFacilities[i].cots;
  delete rawFacilities[i].search;
  delete rawFacilities[i].sub_county;
  delete rawFacilities[i].keph_level;
  delete rawFacilities[i].facility_type;
  delete rawFacilities[i].owner_type;
  delete rawFacilities[i].owner;
  delete rawFacilities[i].operation_status;
  delete rawFacilities[i].open_whole_day;
  delete rawFacilities[i].open_public_holidays;
  delete rawFacilities[i].open_weekends;
  delete rawFacilities[i].open_late_night;
  delete rawFacilities[i].services;
  delete rawFacilities[i].categories;
  delete rawFacilities[i].service_names;
  delete rawFacilities[i].is_public_visible;
  delete rawFacilities[i].created;
  delete rawFacilities[i].closed;
  delete rawFacilities[i].is_published;
  delete rawFacilities[i].approved;
  delete rawFacilities[i].operation_status_name;
  delete rawFacilities[i].id;
  delete rawFacilities[i].registration_number;
}
console.log(rawFacilities);

// populating DB with health facilities.

// for (let i = 0; i < rawFacilities.length; i++) {
//   axios
//     .post(`http://localhost:3001/api/health_facilities`, {
//       mflCode: rawFacilities[i].code,
//       officialName: rawFacilities[i].officialname,
//       kephLevel: rawFacilities[i].keph_level_name,
//       facilityType: rawFacilities[i].facility_type_category,
//       regulatoryBody: rawFacilities[i].regulatory_body_name,
//       county: rawFacilities[i].county_name,
//       constituency: rawFacilities[i].constituency_name,
//       subCounty: rawFacilities[i].sub_county_name,
//       ward: rawFacilities[i].ward_name,
//       locationLat: rawFacilities[i].lat,
//       locationLng: rawFacilities[i].long
//     })
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
