import moment from "moment";
import { Link } from "react-router-dom";
import { AlertBadge } from "./alert-badge";
import { Avatar } from "./avatar.component";
import { Container } from "./container.componet";
import { Identity } from "./identity.component";
import { Text } from "./text.component";

export const ChatItem = (props) => {
  const { user } = props;

  return (
    <Container className="chat-item">
      <Link to={`/chats/${user.user.id}`}>
        <Avatar id={user.user.id} />
      </Link>
      <Identity
        name={user.user.username}
        id={user.user.id}
        sub={user.isTyping ? "typing..." : user.lastMessage?.message}
      />
      <Container className="meta">
        <Text className="timestamp">
          {user.user.isOnline
            ? "online"
            : moment(user.user.lastSeen).format("HH:mm")}
        </Text>
        {user.showBadge && <AlertBadge />}
      </Container>
    </Container>
  );
};
