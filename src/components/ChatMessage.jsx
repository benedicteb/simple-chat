const ChatMessage = ({ children, name, avatarSrc }) => {
  return (
    <div className="chatlog-message chatlog-message--left chatlog-message--is-display-avatar chatlog-message--is-first-in-group chatlog-message--is-last-in-group">
      <div aria-hidden="true" className="chatlog-avatar chatlog-avatar--left">
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
        className="chatlog-message__content chatlog-message__content--left chatlog-message__content--has-name"
      >
        <span
          aria-hidden="true"
          className="chatlog-message__name chatlog-message__name--left"
        >
          {name}
        </span>
        <span className="chatlog-message__text chatlog-message__text--left">
          {children}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
