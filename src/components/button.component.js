export const Button = (props) => {
  const { className, ...buttonProps } = props;

  return <button className={`button ${className}`} {...buttonProps} />;
};
