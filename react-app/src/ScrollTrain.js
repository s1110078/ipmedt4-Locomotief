import React from "react";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import "./ScrollTrain.css";

// list van treindelen
const list = [
  { treinDeel: {
    coupé: 1,
    img: '/Img/TreinDeel1.png',
    stoelen : {
      totaal: 110,
      bezet: 14
      }
    }
  },
  { treinDeel: {
    coupé: 2,
    img: '/Img/TreinDeel2.png',
    stoelen : {
      totaal: 93,
      bezet: 29
      }
    }
  },
  { treinDeel: {
    coupé: 3,
    img: '/Img/TreinDeel3.png',
    stoelen : {
      totaal: 92,
      bezet: 83
      }
    }
  },
  { treinDeel: {
    coupé: 4,
    img: '/Img/TreinDeel4.png',
    stoelen : {
      totaal: 110,
      bezet: 51
      }
    }
  },
];

// voorbeeld waarde
const drukte = "rustig";

// 1 item component
// selected prop wordt meegegeven
const MenuItem = ({text, selected}) => {
  return <img
    className={`menu-item ${selected ? 'active' : ''}`}
    src={text}
    alt={text.replace('/Img/','')}
    />;
};

// Alle items component
export const Menu = (list, selected) =>
  list.map(el => {
    const {treinDeel} = el;

    return <MenuItem text={treinDeel.img} key={treinDeel.coupé} selected={selected} />;
  });


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '←', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '→', className: 'arrow-next' });

const selected = list[0].treinDeel.coupé;
const stoelenTotaal = list[0].treinDeel.stoelen.totaal;
const stoelenBezet = list[0].treinDeel.stoelen.bezet;

class ScrollTrain extends React.Component {
  constructor(props) {
    super(props);
    // Menu wordt opnieuw aangeroepen als de layout of de list veranderd
    this.menuItems = Menu(list, selected);
  }

  state = {
    selected,
    stoelenTotaal,
    stoelenBezet
  };

  //Functie wanneer je klikt op een trein haal de gegevens van die coupé
  onSelect = key => {
    this.setState({ selected: key });
    this.setState({ stoelenTotaal: list[key-1].treinDeel.stoelen.totaal });
    this.setState({ stoelenBezet: list[key-1].treinDeel.stoelen.bezet });
  }

  // Functie wanneer je langs een coupé scrollt komt de info van die coupé op het scherm
  // BELANGRIJK: de if statement maakt momenteel gebruik van vaste waarde,
  // deze waarde zijn gebaseerd op de layout van een Galaxy S9/S9+.
  // Voor
  onUpdate = translate => {
    translate = translate.translate;

    var width = window.document.body.offsetWidth;
    let scroll_treindeel = 1;

    if (0 > translate && translate > -125) {
      scroll_treindeel = 1;
    } else if (-125 > translate && translate > -360) {
      scroll_treindeel = 2;
    } else if (-360 > translate && translate > -600) {
      scroll_treindeel = 3;
    } else if (translate < -600) {
      scroll_treindeel = 4;
    }
    this.onSelect(scroll_treindeel);
  }


  render() {
    const { selected } = this.state;
    // Maak menu van menu items
    const menu = this.menuItems;

    return (
      <div className="ScrollTrain">
        <h1>Het is momenteel: {drukte}</h1>
        <h1>Coupé: {selected}</h1>
        <h1>{this.state.stoelenBezet}/{this.state.stoelenTotaal} Stoelen bezet</h1>

        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
          onUpdate={this.onUpdate}
          wheel={false}
        />
      </div>
    );
  }
}

export default ScrollTrain;
