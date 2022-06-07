import React from "react";

export const Container = (props) => {
  const { element = "div", children, ...elementProps } = props;

  return React.createElement(element, elementProps, children);
};
