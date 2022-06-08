import { Navigate } from "react-router-dom";
import { Button } from "../components/button.component";
import { Container } from "../components/container.componet";
import { Input } from "../components/input.component";
import { Text } from "../components/text.component";
import { useStartPageLogic } from "../hooks/use-start-page-logic.hook";

const StartPage = (props) => {
  const { user } = props;
  const { redirect, handleChange, handleSubmit } = useStartPageLogic(props);

  if (user) {
    return <Navigate replace to={redirect} />;
  }

  return (
    <Container className="start-page">
      <Container className="banner">
        <Text element="h1" className="title">
          Simple chat app
        </Text>
        <Text element="h2" className="sub-title">
          A simple chat application that does basic stuff, but does it so well
          you might consider abandoning your complex chat applications for it
        </Text>
      </Container>
      <Container className="form">
        <form autoComplete="off" className="start-form" onSubmit={handleSubmit}>
          <Input
            label="Choose a username"
            required
            name="username"
            onChange={handleChange}
            minLength="3"
            placeholder="Username"
            autoComplete="off"
          />
          <Button>Start Chatting</Button>
        </form>
      </Container>
    </Container>
  );
};

export default StartPage;
