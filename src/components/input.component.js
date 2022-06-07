import { Container } from "./container.componet";
import { Text } from "./text.component";

export const Input = (props) => {
  const { label, className, ...inputProps } = props;

  return (
    <Container className={`input ${className}`}>
      <Container className="input-label">
        <input placeholder="Place holder" {...inputProps} />
        {label && <Text element="label">{label}</Text>}
      </Container>
    </Container>
  );
};
