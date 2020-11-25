import React from "react";
import "./App.css";

import SearchComponent from "./components/Search";

import { searchSpaces as searchAddress } from "./service/searchAddress";
import { searchSpaces } from "./service/search";

const App = () => (
  <div className="App">
    <SearchComponent api={searchSpaces} />
    <SearchComponent api={searchAddress} />
  </div>
);

export default App;
