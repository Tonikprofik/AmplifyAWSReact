import React from "react";

export default function Container({ children }) {
  return <div style={containerStyle}>{children}</div>;
}

const containerStyle = {
  width: 900,
  margin: "0 auto",
  padding: "30px 0px",
};
