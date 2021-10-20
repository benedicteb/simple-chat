import "./App.css";
import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import ChatMessage from "./components/ChatMessage";
import ChatMessageReply from "./components/ChatMessageReply";

const SUBSCRIBE_URL =
  "https://codehub-simple-chat-api.herokuapp.com/subscribe/1";
const SEND_MESSAGE_URL =
  "https://codehub-simple-chat-api.herokuapp.com/sendMessage";

const NICK = "Benedicte";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(SUBSCRIBE_URL);

    eventSource.addEventListener("messageReceived", (event) => {
      const message = JSON.parse(event.data);

      setMessages((currentMessages) => [...currentMessages, message]);
    });
  }, []);

  useEffect(() => {
    const chatlogRoot = document.getElementById("chatlog-root");

    chatlogRoot.scrollTo(0, chatlogRoot.scrollHeight);
  }, [messages]);

  return (
    <div className="App">
      <main className="HeightAdjusted">
        <h1>CodehubCHAT!</h1>

        <Chat>
          {messages.map((message) => {
            if (message.sender === NICK) {
              return (
                <ChatMessageReply
                  avatarSrc={message.avatarUrl}
                  name={message.sender}
                >
                  {message.text}
                </ChatMessageReply>
              );
            }

            return (
              <ChatMessage avatarSrc={message.avatarUrl} name={message.sender}>
                {message.text}
              </ChatMessage>
            );
          })}
        </Chat>

        <form className={"InputForm"}>
          <input type="text" id="chat-input-field" />
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();

              const textInputField =
                document.getElementById("chat-input-field");
              const inputtedMessage = textInputField.value;

              fetch(SEND_MESSAGE_URL, {
                method: "POST",
                headers: {
                  Authorization: "duerkul",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  message: inputtedMessage,
                  nick: NICK,
                }),
              });

              textInputField.value = "";
            }}
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
