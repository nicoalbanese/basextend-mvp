import { useState, useEffect } from "react";
import "./App.css";
import Alert from "./components/Alert";
import Search from "./components/search";
import Settings from "./components/settings";

// airtable settings should have baseId, apiKey, queryList

function App() {
  const [route, setRoute] = useState("search" || "settings");
  const [airtableSettings, setAirtableSettings] = useState({});
  const [alert, setAlert] = useState({});

  const getPersistedState = () => {
    if (chrome.extension !== undefined) {
      // clearing state
      // chrome.storage.sync.set({ state: null });
      // ---
      // app starts -> check local storage for state
      chrome.storage.sync.get("state", (results) => {
        if (results.state) {
          console.log("we've got state");
          setAirtableSettings(results.state);
        } else {
          // if no state -> setRoute to settings
          setAlert({ message: "please add base info", type: "caution" });
          setRoute("settings");
        }
      });
    } else {
      console.log("not open in chrome extension");
    }
  };

  useEffect(() => {
    // console.log("its working");
    getPersistedState();
  }, []);

  return (
    <div className="App">
      <main className="max-w-lg p-4 border">
        {alert.message && <Alert alert={alert} setAlert={setAlert} />}
        <div id="main-app">
          {route == "search" && (
            <Search
              setRoute={setRoute}
              airtableSettings={airtableSettings}
              setAlert={setAlert}
            />
          )}
          {route == "settings" && (
            <Settings
              setRoute={setRoute}
              setAlert={setAlert}
              airtableSettings={airtableSettings}
              getPersistedState={getPersistedState}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
