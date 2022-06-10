const CHANGE_SEARCHTERMVANSTATION = "CHANGE_SEARCHTERMVANSTATION";
const CHANGE_SEARCHTERMNAARSTATION = "CHANGE_SEARCHTERMNAARSTATION";
const CHANGE_SELECTEDTRIP = "CHANGE_SELECTEDTRIP";
const CHANGE_ISOPEN = "CHANGE_ISOPEN";

// de Redux reducers

export const searchTermVanStation = (state = "", action) => {
  switch(action.type) {
    case CHANGE_SEARCHTERMVANSTATION:
      return action.payload;
    default:
      return state;
  }
};

export const searchTermNaarStation = (state = "", action) => {
  switch(action.type) {
    case CHANGE_SEARCHTERMNAARSTATION:
      return action.payload;
    default:
      return state;
  }
};

export const selectedTrip = (state = "", action) => {
  switch(action.type) {
    case CHANGE_SELECTEDTRIP:
      return action.payload;
    default:
      return state;
  }
};

export const isOpen = (state = "", action) => {
  switch(action.type) {
    case CHANGE_ISOPEN:
      return action.payload;
    default:
      return state;
  }
};
