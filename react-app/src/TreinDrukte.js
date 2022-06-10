import React from "react";
import "./TreinDrukte.css";
import { connect } from "react-redux";
import ScrollTrain from "./ScrollTrain";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// Voorbeeld waardes

class TreinDrukte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treindrukte: "LOW",
      treindelen: 4,
      zitplaatsen: 405,
      klas_1e: 63,
      klas_2e: 323,
      klapstoelen: 19
    };
  }

  /*
  componentDidMount() {
    this.setTreindelen();
  }
  */

  // functie om het aantal treindelen te bepalen afhankelijk van het type trein
  setTreindelen = () => {
    if(this.props.selectedTrip[3] == "NS Intercity"){
      this.setState({treindelen: 8}, () => {
        this.setZitplaatsen();
      })
    } else if (this.props.selectedTrip[3] == "NS Sprinter"){
      this.setState({treindelen: 4}, () => {
        this.setZitplaatsen();
      })
    } else {
      this.setState({treindelen: 2}, () => {
        this.setZitplaatsen();
      })
    }
  }

  // functie om het aantal zitplaatsen te bepalen met een formule afhangelijk van het type trein
  setZitplaatsen = () => {
    let zitplaatsen = 0;
    if(this.props.selectedTrip[3] == "NS Intercity"){
      zitplaatsen = Math.floor(Math.random() * (75 - 55) ) + 55;
      this.setState({zitplaatsen: zitplaatsen * this.state.treindelen}, () => {
        this.setStoelen();});
    } else if (this.props.selectedTrip[3] == "NS Sprinter"){
      zitplaatsen = Math.floor(Math.random() * (70 - 50) ) + 50;
      this.setState({zitplaatsen: zitplaatsen * this.state.treindelen}, () => {
        this.setStoelen();});
    } else {
      zitplaatsen = Math.floor(Math.random() * (50 - 30) ) + 30;
      this.setState({zitplaatsen: zitplaatsen * this.state.treindelen}, () => {
        this.setStoelen();});
    }
  }

  // functie om het aantal per type stoel te bepalen afhangelijk van het aantal stoelen
  setStoelen = () => {
    let stoelen = this.state.zitplaatsen;
    let procentKlap = Math.floor(Math.random() * (14 - 7) ) + 7; // tussen de 7 en 14 procent is een klapstoel
    let klapstoelen = Math.floor(stoelen / 100 * procentKlap);
    let procent1e = Math.floor(Math.random() * (22 - 12) ) + 12; // tussen de 12 en 22 procent is een 1ste klas stoel
    let klas_1e = Math.floor(stoelen / 100 * procent1e);
    let klas_2e = stoelen - (klapstoelen + klas_1e); // overige stoelen zijn 2de klas

    this.setState({
      klas_1e: klas_1e,
      klas_2e: klas_2e,
      klapstoelen: klapstoelen
    })
  }



  render() {
    console.log(this.props.selectedTrip[4]);
    if(this.props.selectedTrip[4]){
      return (
        <div>
          <div className="infoContainer">
            <br></br>
            <div className="info">
              <h3> {"" || this.props.selectedTrip[0]} </h3>
              <div className="vanEnNaarContainer">{this.props.searchTermVanStation || "Zoek eerst uw trip."}</div>
              <h3> {"" || this.props.selectedTrip[1]} </h3>
              <div className="vanEnNaarContainer">{this.props.searchTermNaarStation || "Zoek eerst uw trip."}</div>
              <h2> </h2>
              <div className="infoRegel">
                <div className="links">Treindelen:</div>
                <div className="rechts">{this.state.treindelen}</div>
              </div>
              <div className="infoRegel">
                <div className="links">Zitplaatsen:</div>
                <div className="rechts">{this.state.zitplaatsen}</div>
              </div>
              <div className="infoRegel">
                <div className="links">1e klas:</div>
                <div className="rechts">{this.state.klas_1e}</div>
              </div>
              <div className="infoRegel">
                <div className="links">2e klas:</div>
                <div className="rechts">{this.state.klas_2e}</div>
              </div>
              <div className="infoRegel">
                <div className="links">Klapstoelen:</div>
                <div className="rechts">{this.state.klapstoelen}</div>
              </div>
            </div>
          </div>

          <ScrollTrain/>

        </div>
      );
    } else {
    return(
      <div>
        <div className="infoContainer">
          <div className="geenReis">
            <h4><Link className="homeLink" to="/zoeken">Zoek eerst een reis</Link></h4>
          </div>
        </div>
      </div>
    )
  }
}}

const mapStateToProps = state => {
  return {
    selectedTrip: state.selectedTrip,
    searchTermVanStation: state.searchTermVanStation,
    searchTermNaarStation: state.searchTermNaarStation
  };
};

export default connect(mapStateToProps)(TreinDrukte);
