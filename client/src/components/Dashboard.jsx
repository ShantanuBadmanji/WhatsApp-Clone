/* eslint-disable react/prop-types */
import "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";

function Dashboard({ id }) {
  return (
    <div className="d-flex " style={{ height: "100dvh" }}>
      <Sidebar id={id} />
      <OpenConversation id={id} />
    </div>
  );
}

export default Dashboard;
