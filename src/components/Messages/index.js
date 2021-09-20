import { Card } from "@material-ui/core";

const Messages = ({
    user,
    messages
}) => {
    console.log(messages)

    return (
        <div className="messages">
        {messages && messages.map((message) => {
            console.log(message);
            return (
                <Card key={message._id} className='message'>
                    <div className="message-username">
                        {message.fromUser.username}
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