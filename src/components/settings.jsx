import { useState } from "react";

import FaBack from "./fa-icons/back";

const Settings = ({
  setRoute,
  setAlert,
  airtableSettings,
  getPersistedState,
  allBases,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    // console.log(formData);
    const newState = {};
    // console.log("baseId", formData.baseId.length);
    // console.log("apiKey", formData.apiKey.length);
    // console.log("queryList", formData.queryList.length);

    formData.baseId.length > 0
      ? (newState.baseId = formData.baseId)
      : (newState.baseId = airtableSettings.baseId);
    formData.baseName.length > 0
      ? (newState.baseName = formData.baseName)
      : (newState.baseName = airtableSettings.baseName);
    formData.apiKey.length > 0
      ? (newState.apiKey = formData.apiKey)
      : (newState.apiKey = airtableSettings.apiKey);
    formData.queryList.length > 0
      ? (newState.queryList = formData.queryList)
      : (newState.queryList = airtableSettings.queryList);
    formData.tableId.length > 0
      ? (newState.tableId = formData.tableId)
      : (newState.tableId = airtableSettings.tableId);
    formData.columnForQuery.length > 0
      ? (newState.columnForQuery = formData.columnForQuery)
      : (newState.columnForQuery = airtableSettings.columnForQuery);

    // console.log(newState);

    // console.log("new state ->", newState);
    // console.log("new state ->", {
    //   bases: [...allBases, newState],
    //   selectedBase: newState.baseName,
    // });

    // send to local storage
    chrome.storage.sync.set({
      state: {
        bases: [...allBases, newState],
        selectedBase: newState.baseName,
      },
    });

    // reset everything
    event.target.reset();
    setAlert({});

    // get state now
    getPersistedState();
  };

  return (
    <div>
      <div id="settings-header" className="grid grid-cols-3">
        <div>
          <button className="p-2" onClick={() => setRoute("search")}>
            <FaBack />
          </button>
        </div>
        <h1>Settings</h1>
        <div />
      </div>
      <div id="settings-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="baseIdentifier">Base Name</label>
            <input
              type="text"
              name="baseName"
              placeholder={
                airtableSettings.baseName
                  ? airtableSettings.baseName
                  : "your base name"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="baseIdentifier">Base Identifier</label>
            <input
              type="text"
              name="baseId"
              placeholder={
                airtableSettings.baseId
                  ? airtableSettings.baseId
                  : "your base id"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="baseIdentifier">Table Id</label>
            <input
              type="text"
              name="tableId"
              placeholder={
                airtableSettings.tableId
                  ? airtableSettings.tableId
                  : "your table id"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="baseIdentifier">Column to Query</label>
            <input
              type="text"
              name="columnForQuery"
              placeholder={
                airtableSettings.columnForQuery
                  ? airtableSettings.columnForQuery
                  : "column you want to query"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="baseIdentifier">Tab to Query</label>
            <input
              type="text"
              name="queryList"
              placeholder={
                airtableSettings.queryList
                  ? airtableSettings.queryList
                  : "table1"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="baseIdentifier">Api Key</label>
            <input
              name="apiKey"
              type="password"
              placeholder={
                airtableSettings.apiKey
                  ? airtableSettings.apiKey
                  : "your api key"
              }
            />
          </div>
          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
