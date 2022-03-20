import { useState } from "react";
import { queryBase } from "../util/airtable";
import FaCog from "./fa-icons/cog";

import Result from "./Result";

const Search = ({ setRoute, airtableSettings, setAlert }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchResults([]);

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);

    if (formData.searchQuery.length > 0) {
      const data = await queryBase(formData.searchQuery, airtableSettings);
      console.log(data);
      if (data.records.length > 0) {
        setSearchResults(data.records);
      } else {
        setAlert({ message: "no results found...", type: "danger" });
      }
    }
    event.target.reset();
  };

  return (
    <div>
      <div id="header" className="grid grid-cols-3">
        <div />
        <h1>BasExtend</h1>
        <div className="flex items-center justify-end">
          <button onClick={() => setRoute("settings")} className="">
            <FaCog />
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="search query..."
              name="searchQuery"
            />
          </div>
          <button type="submit" className="btn">
            Search
          </button>
        </form>
      </div>
      {searchResults && (
        <div id="results">
          {searchResults.map((result) => (
            <Result result={result} airtableSettings={airtableSettings} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
