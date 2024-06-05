const ChatMessageReply = ({ children, name, avatarSrc }) => {
  return (
    <div className="chatlog-message chatlog-message--right chatlog-message--is-display-avatar chatlog-message--is-first-in-group chatlog-message--is-last-in-group">
      <div className="chatlog-avatar chatlog-avatar--right">
        <img
          className="chatlog-avatarImage"
          title={`${name}`}
          src={`${avatarSrc}`}
          alt={`${name}`}
          nopin="no-pin"
          data-pin-nopin="true"
        />
      </div>
      <div
        role="text"
        className="chatlog-message__content chatlog-message__content--right chatlog-message__content--has-name"
      >
        <span
          className="chatlog-message__name chatlog-message__name--right"
        >
          {name}
        </span>
        <span className="chatlog-message__text chatlog-message__text--right">
          {children}
        </span>
      </div>
    </div>
  );
};

export default ChatMessageReply;
