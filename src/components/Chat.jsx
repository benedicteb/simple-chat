const Chat = ({ children }) => (
  <div className="chatlog-root">
    <div className="chatlog-app">
      <div className="chatlog-messageList">{children}</div>
    </div>
  </div>
);

export default Chat;
