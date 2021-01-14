import React from "react";
import GraphData from "./component/datalist";
import Calendar from "./component/calendar";
function MainPage() {
  return (
    <div>
      <div>
        <GraphData />
      </div>

      <div>
        <Calendar />
      </div>
    </div>
  );
}

export default MainPage;
