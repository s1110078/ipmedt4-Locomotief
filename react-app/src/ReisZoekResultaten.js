import React from "react";
import "./ReisZoekResultaten.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { connect } from "react-redux";
import { changeSelectedTrip } from "./actions";

class ReisZoekResultaten extends React.Component {

  // Wanneer je klikt op een resultaat worden die gegevens meegenomen naar het Treindrukte Component.
  klikResultaat = () => {
    this.props.changeSelectedTrip([this.props.vertrektijd, this.props.aankomsttijd, this.props.treindrukte, this.props.treinsoort, this.props.gezocht]);
  }

  render() {
    return (
      <Link className="zoekLink" to="/treinDrukte">
          <div className="rowResult" onClick={this.klikResultaat}>
            <div className="columnResult">
              <div className="cardResult">
                <div>{this.props.reistijd} minuten reistijd </div>
                <div>vertrektijd {this.props.vertrektijd} → aankomsttijd {this.props.aankomsttijd}</div>
                <div>trein: {this.props.treinsoort}</div>
              </div>
            </div>
          </div>
      </Link>

    );
  }
}

const mapStateToProps = state => {
  return {
    selectedTrip: state.selectedTrip
  };
};

export default connect(mapStateToProps,
  {
    changeSelectedTrip: changeSelectedTrip
  }
)(ReisZoekResultaten);
