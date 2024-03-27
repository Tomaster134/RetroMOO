import { useEffect, useRef } from "react";

interface IProps {
  messages: {
    message: string,
    time: string
  }[];
}

const Messages = (props: IProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  return (
    <div>
      {props.messages.map((message, idx) => (
        <div className="text" key={idx}>
          <span
            className="msg-text"
            dangerouslySetInnerHTML={{ __html: message.message }}
          ></span>
          <span className="msg-date">{message.time}</span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
export default Messages;
