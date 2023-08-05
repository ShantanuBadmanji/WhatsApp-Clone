import { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useUserContacts } from "../context/ContactsProvider";

// eslint-disable-next-line react/prop-types
function NewContactModal({ closeOpenModel }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { userContacts, updateContacts } = useUserContacts();
  const [errorMessage, setErrorMessage] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (userContacts.some(({ name }) => name === nameRef.current.value))
      return setErrorMessage(true);
    updateContacts(nameRef.current.value, idRef.current.value);
    closeOpenModel();
  }
  return (
    <>
      <Modal.Header closeButton>Conversation </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Name"
              ref={nameRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Contact Id"
              ref={idRef}
              required
            ></Form.Control>
          </Form.Group>
          <Button type="submit">Create Contact</Button>
        </Form>
        {errorMessage && <Alert>Contact name already exists</Alert>}
      </Modal.Body>
    </>
  );
}

export default NewContactModal;
