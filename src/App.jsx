import { useState, useEffect } from "react";
import "./App.css";
import Alert from "./components/Alert";
import BaseSelector from "./components/BaseSelector";
import Search from "./components/search";
import Settings from "./components/settings";

// airtable settings should have baseId, apiKey, queryList

function App() {
  const [route, setRoute] = useState("search" || "settings");
  const [activeBaseSettings, setActiveBaseSettings] = useState({});
  const [alert, setAlert] = useState({});

  const [allBases, setAllBases] = useState([]);

  const getPersistedState = () => {
    if (chrome.extension !== undefined) {
      // clearing state
      // chrome.storage.sync.set({ state: null });
      // ---
      // app starts -> check local storage for state
      chrome.storage.sync.get("state", (results) => {
        if (results.state) {
          console.log("we've got state");
          // add a selectedBase to state
          // so state will be state object with 1 string object (selectedBase: "baseName") and then 1 array with all settings

          console.log(results.state);
          // chrome.storage.sync.set({
          //   state: { selectedBase: "First Base", bases: [results.state] },
          // });

          if (results.state.bases != null) {
            setAllBases(results.state.bases);
          }
          if (results.state.selectedBase != null) {
            const baseSettings = results.state.bases.filter((base) => {
              console.log(base.baseName == results.state.selectedBase);
              return base.baseName == results.state.selectedBase;
            });
            setActiveBaseSettings(baseSettings[0]);
            console.log(activeBaseSettings);
          }
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

  const handleBaseChange = (e) => {
    const newBaseName = e.target.value;
    if (newBaseName == "new") {
      setActiveBaseSettings({ baseName: "new" });
    } else {
      const newlySelectedBaseSettings = allBases.filter(
        (base) => base.baseName == newBaseName
      );
      setActiveBaseSettings(newlySelectedBaseSettings[0]);
      chrome.storage.sync.set({
        state: { selectedBase: newBaseName, bases: allBases },
      });
    }
  };

  const handleDestroy = () => {
    console.log("destory...");

    const allBasesWithoutCurrent = allBases.filter(
      (base) => base.baseName !== activeBaseSettings.baseName
    );

    if (allBases.length > 1) {
      chrome.storage.sync.set({
        state: {
          bases: [...allBasesWithoutCurrent],
          selectedBase: allBases[0].baseName,
        },
      });
      setAlert({ message: "successfully deleted", type: "success" });
      getPersistedState();
      setRoute("search");
    }
  };

  useEffect(() => {
    // console.log("its working");
    getPersistedState();
  }, []);

  const handleBackButton = () => {
    if (activeBaseSettings.baseName == "new") {
      setActiveBaseSettings(allBases[0]);
    }
    setRoute("search");
  };

  return (
    <div className="App">
      <main className="max-w-lg p-4 border">
        {alert.message && <Alert alert={alert} setAlert={setAlert} />}
        <div id="main-app">
          {route == "search" && (
            <>
              <BaseSelector
                allBases={allBases}
                activeBaseSettings={activeBaseSettings}
                handleBaseChange={handleBaseChange}
              />
              <Search
                setRoute={setRoute}
                airtableSettings={activeBaseSettings}
                setAlert={setAlert}
              />
            </>
          )}
          {route == "settings" && (
            <Settings
              setRoute={setRoute}
              setAlert={setAlert}
              airtableSettings={activeBaseSettings}
              getPersistedState={getPersistedState}
              allBases={allBases}
              handleDestroy={handleDestroy}
              handleBackButton={handleBackButton}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
