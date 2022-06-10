import React from "react";
import "./LandingsPage.css";
import { connect } from "react-redux";
import { changeSearchTerm } from "./actions";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";



class LandingsPage extends React.Component {
  render() {
    return (
      <div className="allContainer">
        <div className="topContainer">
          <div className="topText">

          </div>
        </div>

        <div className="bottomContainer">

          <div className="row">

            <div className="column">
              <div className="card">
                <h4>Welkom!</h4>
                <p> Wil je de trein nemen om snel van A naar B te komen? Zijn de treinen overvol en vertraagd? Is het reizen met de trein stressvol? </p> <br/>
                <p> Dan bieden wij een oplossing voor deze problemen! <br/> Zoek snel naar je bestemming op <Link className="homeLink" to="/zoeken">deze pagina</Link>, kies de gewenste route en selecteer deze. Hierbij wordt je verwezen naar onze zeer geavanceerde pagina met veel informatie, waarmee je in één oogopslag kan zien hoeveel zitplaatsen er beschikbaar zijn per coupe! </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default LandingsPage;
