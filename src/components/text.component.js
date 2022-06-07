import React from "react";

export const Text = (props) => {
  const { element = "p", children, ...elementProps } = props;

  return React.createElement(element, elementProps, children);
};
