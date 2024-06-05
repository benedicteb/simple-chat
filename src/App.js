import "./App.css";
import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import ChatMessage from "./components/ChatMessage";
import ChatMessageReply from "./components/ChatMessageReply";

const API_HOST = "http://localhost:3000";
const SUBSCRIBE_URL = `${API_HOST}/subscribe/1`;
const SEND_MESSAGE_URL = `${API_HOST}/sendMessage`;

const AVATAR_URL = "https://avatars.githubusercontent.com/u/3595094";

function App() {
  const [messages, setMessages] = useState([]);
  const [nick, setNick] = useState(undefined);

  useEffect(() => {
    const eventSource = new EventSource(SUBSCRIBE_URL);

    eventSource.addEventListener("messageReceived", (event) => {
      const message = JSON.parse(event.data);

      setMessages((currentMessages) => [...currentMessages, message]);
    });
  }, []);

  useEffect(() => {
    const chatlogRoot = document.getElementById("chatlog-root");

    if (!chatlogRoot) {
      return;
    }

    chatlogRoot.scrollTo(0, chatlogRoot.scrollHeight);
  }, [messages]);

  if (nick === undefined) {
    return (
      <div className="App">
        <main className="HeightAdjusted">
          <div class="chat">
            <h1>Chat!</h1>

            <form className={"InputForm"}>
              <p>Navn: </p>

              <input type="text" id="nick-input-field" />
              <button
                type="submit"
                onClick={(event) => {
                  event.preventDefault();

                  const nickInputfield =
                    document.getElementById("nick-input-field");
                  const inputtedNick = nickInputfield.value;

                  setNick(inputtedNick);
                }}
              >
                Lagre
              </button>
            </form>
          </div>

          <div className="qrcode">
            <p>QR code</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <main className="HeightAdjusted">
        <div class="chat">
          <h1>Chat!</h1>

          <Chat>
            {messages.map((message) => {
              if (message.sender === nick) {
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
                <ChatMessage
                  avatarSrc={message.avatarUrl}
                  name={message.sender}
                >
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
                    Authorization: "abc123",
                    "Content-Type": "application/json",
                  },

                  body: JSON.stringify({
                    message: inputtedMessage,
                    avatarUrl: AVATAR_URL,
                    nick,
                  }),
                });

                textInputField.value = "";
              }}
            >
              Send
            </button>
          </form>
        </div>

        <div className="qrcode">
          <p>QR code</p>
        </div>
      </main>
    </div>
  );
}

export default App;
