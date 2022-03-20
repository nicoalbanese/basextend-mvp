import { useState } from "react";
import { queryBase } from "../util/airtable";
import FaCog from "./fa-icons/cog";
import FaSearch from "./fa-icons/search";

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
    } else {
      setAlert({ message: "empty query...", type: "caution" });
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
        <form onSubmit={handleSubmit} className="flex w-full">
          <div className="form-group w-full">
            <input
              type="text"
              placeholder="search query..."
              name="searchQuery"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center py-2 px-2 mb-2"
          >
            <FaSearch />
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
