import React from "react";

const Result = ({ result, airtableSettings }) => {
  console.log(result);
  return (
    <div className="w-full">
      <a
        href={`https://airtable.com/${airtableSettings.baseId}/${airtableSettings.tableId}/${result.id}`}
        target="_blank"
        className="border-b border-slate-200 py-3 inline-block w-full hover:opacity-50"
      >
        {result.fields[airtableSettings.columnForQuery]}
      </a>
    </div>
  );
};

export default Result;
