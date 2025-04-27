import Chat from "./Chat/Chat/Chat";
import ChatPetInfo from "./PetInfo/ChatPetInfo";
import "./ChatPage.css";
import ChatList from "./Chat/ChatList/ChatList";

function ChatPage() {
  return (
    <section className="chatPage">
      <div className="left">
        <ChatPetInfo />
      </div>
      <div className="right">
        {/* <Chat /> */}
        <ChatList />
      </div>
    </section>
  );
}

export default ChatPage;
