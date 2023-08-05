/* eslint-disable react/prop-types */
import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { v4 as uuidV4 } from "uuid";
import { useSockets } from "./SocketProvider";

const builtInConversations = [
  {
    convId: "kfahgkfhgsakfhsgska",
    name: "Gaming",
    members: ["32235325232", "35-35315531-4", "51112562"],
    messages: [
      { senderId: "5761764843431", msg: "hello" },
      { senderId: "5761764843431", msg: "Hii" },
      { senderId: "5761764843431", msg: "how are you" },
    ],
  },
  {
    convId: "kdughasldjgahljgha-ifjhffk",
    name: "",
    members: ["32235325232", "35-35315asasda531-4546456", "51112562"],
    messages: [],
  },
  {
    convId: "kjuggdja--djgva87bdgkudhkj",
    name: "Study",
    members: [],
    messages: [],
  },
];

const ConversationContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export function useUserConversations() {
  return useContext(ConversationContext);
}

export function ConversationsProvider({ children, id: userId }) {
  const [userConversations, setUserConversations] = useState([
    ...builtInConversations,
  ]);
  const [selectedConversationIndex, setselectedConversaionIndex] = useState(0);
  const socket = useSockets();

  const addConversation = useCallback(
    ({members, msg, convId, senderId, name}) => {
      if (!convId) {
        convId = uuidV4();
      }
      setUserConversations((prevConversations) => [
        ...prevConversations,
        {
          convId: convId,
          name: name,
          members: [...members, userId],
          messages: msg && senderId ? [{ senderId: senderId, msg: msg }] : [],
        },
      ]);
    },
    [userId]
  );

  function updateMessages(msg, id, conversationIndex) {
    console.log(`entered updateMessages function with msg: ${msg}`);
    setUserConversations((prev) => {
      const prevConversations = [...JSON.parse(JSON.stringify(prev))];
      prevConversations[conversationIndex].messages.unshift({
        senderId: id,
        msg: msg,
      });
      return prevConversations;
    });
  }
  function handleSendMessages(msg) {
    const members = userConversations[selectedConversationIndex].members;
    const convId = userConversations[selectedConversationIndex].convId;
    const name = userConversations[selectedConversationIndex].name;
    socket.emit("send-message", { members, msg, convId, name });
    updateMessages(msg, userId, selectedConversationIndex);
  }
  function changeConversationIndex(index) {
    setselectedConversaionIndex(index);
  }
  const handleReceiveMessages = useCallback(
    ({ members, msg, convId, senderId, name }) => {
      let isNew = true;
      userConversations.forEach((conversation, index) => {
        if (convId === conversation.convId) {
          isNew = false;
          updateMessages(msg, senderId, index);
        }
      });
      if (isNew) {
        console.log("new conversation started");
        addConversation({members, msg, convId, senderId, name});
      }
    },
    [addConversation, userConversations]
  );
  useEffect(() => {
    console.log(userConversations);
  }, [userConversations]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", handleReceiveMessages);
    return () => socket.off("receive-message");
  }, [socket, handleReceiveMessages]);
  return (
    <ConversationContext.Provider
      value={{
        userConversations,
        addConversation,
        selectedConversation: userConversations[selectedConversationIndex],
        changeConversationIndex,
        selectedConversationIndex,
        handleSendMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
