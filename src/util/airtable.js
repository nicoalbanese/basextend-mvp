export const queryBase = async (query, airtableSettings) => {
  console.log(query);
  const queryList = airtableSettings.queryList.split(",");

  const res = await fetch(
    `https://api.airtable.com/v0/${airtableSettings.baseId}/${queryList[0]}?api_key=${airtableSettings.apiKey}&filterByFormula=SEARCH("${query}", lower({${airtableSettings.columnForQuery}}))`
  );
  // console.log("res -> ", res);
  const data = await res.json();
  // console.log("data -> ", data);
  return data;
};
