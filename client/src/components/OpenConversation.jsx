import { useRef } from "react";
import { useUserConversations } from "../context/ConversationsProvider";
import { Button, Form, InputGroup } from "react-bootstrap";
import DisplayMessage from "./DisplayMessage";

// eslint-disable-next-line react/prop-types
function OpenConversation({ id }) {
  const { selectedConversation, handleSendMessages } = useUserConversations();
  const sendMessageText = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    handleSendMessages(sendMessageText.current.value);
    sendMessageText.current.value = "";
  }

  return (
    <div className="flex-fill d-flex flex-column px-1 ">
      <div className=" d-flex flex-fill flex-column-reverse px-2 align-items-start gap-2 overflow-auto">
        {selectedConversation.messages.map((msg, index) => (
          <DisplayMessage
            key={index}
            id={id === msg.senderId ? "You" : msg.senderId}
            msg={msg.msg}
          />
        ))}
      </div>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
          console.log("submit called");
        }}
      >
        <InputGroup>
          <Form.Control
            ref={sendMessageText}
            type="textArea"
            placeholder="Message..."
            required
          />
          <Button type="submit">Send</Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default OpenConversation;
