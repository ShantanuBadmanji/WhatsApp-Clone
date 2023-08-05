import {} from "react";
const messageBoxStyle = {
  borderBottomRightRadius: "0px",
  borderBottomLeftRadius: "20px",
};
const userMsgStyle = {
  alignSelf: "end",
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
};
// eslint-disable-next-line react/prop-types
function DisplayMessage({ id, msg }) {
  return (
    <div style={id === "You" ? userMsgStyle : null}>
      <p className="messages" style={id === "You" ? messageBoxStyle : null}>
        {msg}
      </p>
      <p className="mutted" style={{ fontSize: "0.75em" }}>
        ~{id}
      </p>
    </div>
  );
}
export default DisplayMessage;
