import config from "../shared/config";
import { Container } from "./container.componet";

export const Avatar = (props) => {
  const { avatarUrl } = config();
  const { id } = props;

  return (
    <Container className="avatar">
      <img src={`${avatarUrl}${id}.svg`} alt="avatar" />
    </Container>
  );
};
