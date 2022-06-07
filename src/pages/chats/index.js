import { ChatItem } from "../../components/chat-item";
import { Container } from "../../components/container.componet";
import { Input } from "../../components/input.component";
import { LogoutButton } from "../../components/logout-button.component";
import { Text } from "../../components/text.component";
import { WithAuth } from "../../hoc/with-auth.component";
import { useChatsPageLogic } from "../../hooks/use-chats-page-logic.hook";

const ChatsPage = () => {
  const { handleSearch, users } = useChatsPageLogic();
  return (
    <Container className="chats-page page">
      <Container className="header">
        <Text element="h1" className="title">
          Chats
        </Text>
        <LogoutButton />
      </Container>
      <Input
        placeholder="Filter by username"
        className="search"
        onChange={handleSearch}
        type="search"
      />

      <Container className="chat-items">
        {users.map((user) => {
          return <ChatItem key={user.user.id} user={user} />;
        })}
      </Container>
    </Container>
  );
};

export default WithAuth(ChatsPage);
