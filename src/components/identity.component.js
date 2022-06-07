import { Link } from "react-router-dom";
import { Container } from "./container.componet";
import { Text } from "./text.component";

export const Identity = (props) => {
  const { name, sub, id } = props;
  return (
    <Container className="identity">
      <Link to={`/chats/${id}`}>
        <Text className="name">{name}</Text>
      </Link>
      <Text className="last-message">{sub}</Text>
    </Container>
  );
};
