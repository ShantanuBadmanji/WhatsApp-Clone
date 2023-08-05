import {} from "react";
import { ListGroup } from "react-bootstrap";
import { useUserConversations } from "../context/ConversationsProvider";
function Conversations() {
  const {
    userConversations,
    selectedConversationIndex,
    changeConversationIndex,
  } = useUserConversations();
  function handleClick(index) {
    changeConversationIndex(index);
  }
  return (
    <div
      className="d-flex flex-column  flex-grow-1 overflow-auto h-100"
      // style={{ height: "calc(100dvh -100px)" }}
    >
      <ListGroup variant = "flush">
        {userConversations.map((conversation, index) => (
          <ListGroup.Item
            onClick={() => handleClick(index)}
            key={index}
            action={index === selectedConversationIndex}
          >
            {conversation.name
              ? conversation.name
              : conversation.members.join(", ")}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
export default Conversations;
