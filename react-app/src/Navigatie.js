import React from "react";
import { connect } from "react-redux";
import { changeIsOpen } from "./actions";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import TreinDrukte from "./TreinDrukte";
import LandingsPage from "./LandingsPage";
import ReizenZoeken from "./ReizenZoeken";
import "./Navigatie.css";

import { MDBIcon, MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink, MDBContainer, MDBRow, MDBBtn } from 'mdbreact';

const Navigatie = () => {
  return (
    <Router>
      <div className="topbar">
        <ul className="topbarElements">
          <li>
            <Link className="navLink" to="/">Home</Link>
          </li>
          <li>
            <Link className="navLink" to="/zoeken">Zoeken</Link>
          </li>
          <li>
            <Link className="navLink" to="/treinDrukte">Trein Drukte</Link>
          </li>
          <li> </li>
        </ul>
      </div>
      <Route path="/treinDrukte" exact component={TreinDrukte} />
      <Route path="/" exact component={LandingsPage} />
      <Route path="/zoeken" exact component={ReizenZoeken} />
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    isOpen: state.isOpen
  };
};

export default connect(mapStateToProps,
  {
    changeIsOpen: changeIsOpen
  }
)(Navigatie);
