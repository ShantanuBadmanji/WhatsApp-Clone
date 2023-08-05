/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal, Nav, Tab } from "react-bootstrap";
import Conversations from "./Conversations";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModel";
import Contacts from "./Contacts";

const asideStyles = {
  width: "300px",
};

const CONTACTS_KEY = "contacts";
const CONVERSATIONS_KEY = "conversations";

function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [openModel, setOpenModel] = useState(false);

  function closeOpenModel() {
    setOpenModel(false);
  }
  const isConversationOpen = activeKey === CONVERSATIONS_KEY;
  return (
    <aside style={asideStyles} className="d-flex flex-column">
      {/* <div className="flex-grow-1 d-flex flex-column"> */}
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end flex-grow-1 word-wrap">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      {/* </div> */}
      <div className="d-flex flex-column" style={{ height: "100px" }}>
        <div className="p-2 small border-top border-end">
          Your Contact-Id: <br />
          <span className="text-muted ">{id}</span>
        </div>
        <Button className="rounded-0" onClick={() => setOpenModel(true)}>
          New {isConversationOpen ? "Conversation" : "Contact"}
        </Button>
        <Modal show={openModel} onHide={closeOpenModel}>
          {isConversationOpen ? (
            <NewConversationModal closeOpenModel={closeOpenModel} />
          ) : (
            <NewContactModal closeOpenModel={closeOpenModel} />
          )}
        </Modal>
      </div>
    </aside>
  );
}

export default Sidebar;
