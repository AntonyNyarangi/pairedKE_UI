import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    fontSize:'40px',
    width: theme.spacing(15),
    height: theme.spacing(15)
  }
}));

export default function UserDetails(props) {
  const classes = useStyles();

  return (
    <Card small className="mb-4 pt-3" style ={{paddingBottom:'10px'}}>
      <CardBody className="text-center">
        <Avatar style = {{margin: '0 auto'}} className={classes.large}>
          {props.userData.firstName.charAt(0)}
          {props.userData.lastName.charAt(0)}
        </Avatar>
        <br/>
        <h4 className="mb-0">
          {props.userData.firstName} {props.userData.lastName}
        </h4>
        <span className="text-muted d-block mb-2">
          {props.userData.isAdmin
            ? "System Administrator PairedKE"
            : "Health Facility Representative"}
        </span>
        <span>
          {props.userData.healthFacility.healthFacility_officialName.trim()},{" "}
          {props.userData.healthFacility.county}
        </span>
      </CardBody>
    </Card>
  );
}

// UserDetails.propTypes = {
//   /**
//    * The user details object.
//    */
//   // userDetails: PropTypes.object,
//   props.userData: PropTypes.object
// };

// UserDetails.defaultProps = {
//   props.userData: JSON.parse(localStorage.getItem("props.userData")),
// };

// export default UserDetails;
