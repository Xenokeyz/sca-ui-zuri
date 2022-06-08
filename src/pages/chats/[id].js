import moment from "moment";
import { Avatar } from "../../components/avatar.component";
import { Button } from "../../components/button.component";
import { Container } from "../../components/container.componet";
import { Identity } from "../../components/identity.component";
import { Input } from "../../components/input.component";
import { LogoutButton } from "../../components/logout-button.component";
import { Text } from "../../components/text.component";
import { WithAuth } from "../../hoc/with-auth.component";
import { useSingleChatPageLogic } from "../../hooks/use-single-chat-page-logic";

const SingleChatPage = () => {
  const {
    messages,
    sender,
    values,
    messageContainerRef,
    isTyping,
    handleChange,
    handleSubmit,
    handleFocus,
    handleBlur,
  } = useSingleChatPageLogic();
  let subText = sender?.isOnline
    ? "Online"
    : `Last seen at ${moment(sender?.lastSeen).format("HH:mm")}`;
  if (isTyping) {
    subText = "typing...";
  }

  return (
    <Container className="single-chat-page page">
      <Container className="header">
        <Avatar />
        <Identity id={sender?.id} name={sender?.username} sub={subText} />

        <LogoutButton />
      </Container>

      <div className="speach-bubbles" ref={messageContainerRef}>
        {messages.map((message) => {
          return (
            <Container
              key={message.id}
              className={`speach-bubble ${
                +message.sender !== sender?.id && "right"
              }`}
            >
              <Text className="text">{message.message}</Text>
              <Text className="timestamp">
                {moment(message.createdAt).format("HH:mm A")}
              </Text>
            </Container>
          );
        })}
      </div>

      <form autoComplete="off" className="message-form" onSubmit={handleSubmit}>
        <Input
          autoComplete="off"
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Message"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <Button>Send</Button>
      </form>
    </Container>
  );
};

export default WithAuth(SingleChatPage);
