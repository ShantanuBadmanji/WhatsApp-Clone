import {} from "react";
import { ListGroup } from "react-bootstrap";
import { useUserContacts } from "../context/ContactsProvider";
function Contacts() {
  const { userContacts } = useUserContacts();

  return (
    <div className="d-flex flex-column  flex-grow-1 overflow-auto h-100">
      <ListGroup variant="flush">
        {userContacts.map((contact, index) => (
          <ListGroup.Item key={index}>{contact.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
export default Contacts;
