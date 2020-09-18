import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions} style ={{cursor:'pointer'}}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3" style = {{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <i className="material-icons mr-1" style = {{fontSize:'40px', cursor:'pointer'}}>account_circle</i>
          <span className="d-none d-md-inline-block" style = {{cursor:'pointer'}}>{userData.lastName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/login" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
