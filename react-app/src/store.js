import { combineReducers, createStore } from "redux";
import { searchTermVanStation, searchTermNaarStation, selectedTrip, isOpen } from "./reducers";

// de Redux store
export const store = createStore(
  combineReducers({
    searchTermVanStation,
    searchTermNaarStation,
    selectedTrip,
    isOpen
  })
);
