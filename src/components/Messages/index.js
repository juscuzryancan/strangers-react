import { useEffect } from "react";
import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./styles.css";

const Messages = ({
  user,
  handleUser
}) => {
  console.log(user);

  useEffect(() => {
    handleUser();
  }, [])

  const {messages} = user.messages;
 
  return (
    <div className="messages">
      <h2>Messages </h2>
      <span><Link to='/'><Button>Return Home</Button></Link></span>
      {messages ? messages.map((message) => {
        console.log(message.fromUser);
        if (message.fromUser === user._id) {
          console.log("here")
          return null;
        }

        return (
          <Card key={message._id} className='message'>
            <div className="message-username">
              {(message.fromUser.username === user.username) ? user.username : `To: ${message.username}`}
            </div>
            <div className="message-content">
              {message.content}
            </div>
          </Card>
        );
      })
      : <div>you have no messages</div>}
    </ div>
  );
}

export default Messages;
