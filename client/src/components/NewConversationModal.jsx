import { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useUserContacts } from "../context/ContactsProvider";
import { useUserConversations } from "../context/ConversationsProvider";

// eslint-disable-next-line react/prop-types
function NewConversationModal({ closeOpenModel }) {
  const nameRef = useRef();
  const { userContacts } = useUserContacts();
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedContacts, setselectedContacts] = useState([]);
  const { addConversation } = useUserConversations();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(nameRef.current.value, selectedContacts);
    addConversation({
      name: nameRef.current.value,
      members: [...selectedContacts],
    });
    setErrorMessage(false);
    closeOpenModel();
  }

  function toggleContact(e) {
    const contactId = e.target.id;
    selectedContacts.includes(contactId)
      ? setselectedContacts((prev) => prev.filter((c) => c !== contactId))
      : setselectedContacts((prev) => [...prev, contactId]);
  }
  return (
    <>
      <Modal.Header closeButton>Conversation </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control placeholder="Name of Group" ref={nameRef} />
          </Form.Group>
          <Form.Group>
            {userContacts.map((contact, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={contact.name}
                id={contact.id}
                onChange={toggleContact}
                checked={selectedContacts.includes(contact.id)}
              />
            ))}
          </Form.Group>
          <Button type="submit">Start New Conversation</Button>
        </Form>
        {errorMessage && <Alert>Contact name already exists</Alert>}
      </Modal.Body>
    </>
  );
}

export default NewConversationModal;
