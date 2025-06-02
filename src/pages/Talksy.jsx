import ChatHistory from "../Components/ChatHistory";
import ChatDialog from "../Components/ChatDialog";
import "../index.css";

const Talksy = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-dvh">
        <ChatHistory />
        <ChatDialog />
      </div>
    </>
  );
};

export default Talksy;
