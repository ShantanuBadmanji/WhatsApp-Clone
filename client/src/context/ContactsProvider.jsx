/* eslint-disable react/prop-types */
import { useState, createContext, useContext } from "react";
const builtInContacts = [
  {
    name: "Omkar",
    id: "1234567890",
  },
  {
    name: "Mahesh",
    id: "7898545313-535135",
  },
];

const ContactContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export function useUserContacts() {
  return useContext(ContactContext);
}

export function ContactsProvider({ children }) {
  const [userContacts, setUserContacts] = useState(
    JSON.parse(JSON.stringify(builtInContacts))
  );

  function updateContacts(name, id) {
    setUserContacts((prevContacts) => [
      ...prevContacts,
      { name: name, id: id },
    ]);
  }
  console.log(userContacts);
  return (
    <ContactContext.Provider value={{ userContacts, updateContacts }}>
      {children}
    </ContactContext.Provider>
  );
}
