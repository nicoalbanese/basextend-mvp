import React from "react";

const bases = [{ name: "first" }, { name: "second" }, { name: "third" }];

const BaseSelector = ({ allBases, activeBaseSettings, handleBaseChange }) => {
  return (
    <div className="w-full">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
        <label
          htmlFor="baseSelected"
          className="text-slate-200 font-bold text-sm"
        >
          Pick your base
        </label>
        <select
          name="baseSelected"
          id=""
          onChange={handleBaseChange}
          className="py-2 px-2 rounded-md bg-slate-800"
        >
          {allBases.map((base) => (
            <option
              value={base.baseName}
              key={base.baseName}
              selected={base.baseName == activeBaseSettings.baseName}
            >
              {base.baseName}
            </option>
          ))}
          <option value="new">New...</option>
        </select>
      </form>
    </div>
  );
};

export default BaseSelector;
