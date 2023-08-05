import {} from "react";
// import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import useLocalStorage from "./hooks/useLocalStorage";
import { ContactsProvider } from "./context/ContactsProvider";
import { ConversationsProvider } from "./context/ConversationsProvider";
import { SocketProvider } from "./context/SocketProvider";

function App() {
  const [user, setUser] = useLocalStorage("user", {});
  // const [user, setUser] = useState({});
  console.log(user);
  const dashboard = (
    <SocketProvider id={user.id}>
      <ContactsProvider>
        <ConversationsProvider id={user.id}>
          <Dashboard key="1" id={user.id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  return <div>{user.id ? dashboard : <Login key="2" setUser={setUser} />}</div>;
}

export default App;
