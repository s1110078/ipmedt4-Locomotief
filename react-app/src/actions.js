const CHANGE_SEARCHTERMVANSTATION = "CHANGE_SEARCHTERMVANSTATION";
const CHANGE_SEARCHTERMNAARSTATION = "CHANGE_SEARCHTERMNAARSTATION";
const CHANGE_SELECTEDTRIP = "CHANGE_SELECTEDTRIP";
const CHANGE_ISOPEN = "CHANGE_ISOPEN";

// De Redux actions

export const changeSearchTermVanStation = searchTermVanStation => ({
  type: CHANGE_SEARCHTERMVANSTATION,
  payload: searchTermVanStation,
});

export const changeSearchTermNaarStation = searchTermNaarStation => ({
  type: CHANGE_SEARCHTERMNAARSTATION,
  payload: searchTermNaarStation,
});

export const changeSelectedTrip = selectedTrip => ({
  type: CHANGE_SELECTEDTRIP,
  payload: selectedTrip,
});

export const changeIsOpen = isOpen => ({
  type: CHANGE_ISOPEN,
  payload: isOpen,
});
