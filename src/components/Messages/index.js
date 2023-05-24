import { useEffect } from "react";
import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./styles.css";

const Messages = ({
  user,
  handleUser
}) => {

  useEffect(() => {
    handleUser();
  }, [])

  const {messages} = user;
 
  return (
    <div className="messages-page">
      <div className="messages-nav">
        <h2>Messages </h2>
        <span><Link to='/'><Button>Return Home</Button></Link></span>
      </div>
      <div className="messages">
        {messages ? messages.map((message) => {
          return (
            <Card key={message._id} className='message'>
              <div className="message-username">
                From: {message.fromUser.username}
              </div>
              <div className="message-content">
                Message: {message.content}
              </div>
            </Card>
          );
        })
        : <div>you have no messages</div>}
      </div>
    </div>
  );
}

export default Messages;
