import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Messages = ({
  user,
  messages
}) => {
  return (
    <div className="messages">
      <h2>Messages </h2>
      <span><Link to='/'><Button>Return Home</Button></Link></span>
      {messages && messages.map((message) => {
        console.log(message);
        return (
          <Card key={message._id} className='message'>
            <div className="message-username">
              {(message.fromUser.username === user.username) ? `This Is Your Message` : `To: ${message.fromUser.username}`}
            </div>
            <div className="message-content">
              {message.content}
            </div>
          </Card>
        );
      })}
    </ div>
  );
}

export default Messages;
