import React, { Component } from "react";

import { Model } from "../Model";

import { withRouter } from "react-router";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListIcon from "@material-ui/icons/List";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

//
// MATERIAL-UI REQUIREMENT #1: tweak or add values here to apply styles to a Material-UI component.
const styles = theme => ({
  list: { width: 250 },
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  profileIcon: { marginRight: theme.spacing(1) }
});

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      top: false,
      left: false,
      bottom: false,
      right: false
    };
  }

  async componentDidMount() {
    const id = sessionStorage.getItem("id");
    const isServiceWorker = sessionStorage.getItem("isServiceWorker");
    const user = await Model.FindOne(id);

    if (user) {
      if (isServiceWorker === "true") {
        this.setState({ username: `${user.firstName} ${user.lastName}` });
      } else if (isServiceWorker === "false") {
        this.setState({
          username: `${user.parentGuardianFirstName} ${user.parentGuardianLastName}`
        });
      }
    }
  }

  toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ ...this.state, [side]: open });
  };

  onLogout = () => {
    if (Model.Logout) {
      Model.Logout();
      this.props.history.replace("/signin");
    }
  };

  onLogin = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || isLoggedIn === null)
      this.props.history.push("signin");
  };

  onProfile = () => {
    const isServiceWorker = sessionStorage.getItem("isServiceWorker");

    if (isServiceWorker === "true") {
      this.props.history.push("/profile/service_worker");
    } else if (isServiceWorker === "false") {
      this.props.history.push("/profile/client");
    }
  };

  render() {
    //
    // MATERIAL-UI REQUIREMENT #2: Needed for accessing "styles" CB function declared above this class.
    const { classes } = this.props;

    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer(side, false)}
        onKeyDown={this.toggleDrawer(side, false)}
      >
        <List>
          {["Listings"].map((text, index) => (
            <ListItem button key={text}>
              <Button onClick={() => this.props.history.push("/list")}>
                <ListIcon />
                Listings
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={this.toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={this.state.left}
              onClose={this.toggleDrawer("left", false)}
            >
              {sideList("left")}
            </Drawer>
            <Typography variant="h6" className={classes.title}>
              bitCare
            </Typography>
            {//
            // Renders the appropriate components if a user is logged in. If a user is logged in
            // then render an icon, and a login and logout button.
            sessionStorage.getItem("isLoggedIn") === "true" ? (
              <div>
                <Button
                  color="inherit"
                  className={classes.button}
                  onClick={this.onProfile}
                >
                  <AccountCircleIcon className={classes.profileIcon} />
                  {this.state.username}
                </Button>
                <Button
                  color="inherit"
                  className={classes.button}
                  onClick={this.onLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                color="inherit"
                className={classes.button}
                onClick={this.onLogin}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

//
// MATERIAL-UI REQUIREMENT #3: I don't know why this is needed.
NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(NavBar));
