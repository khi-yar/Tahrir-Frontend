import React from "react";
import { Row, Col } from "react-bootstrap";
import "./style.scss";

export default ({ desc, tiny=false, noMargin }) => {
  return (
    <div className="mx-auto">
      <div className={`loader ${tiny && "tiny-loader"} ${noMargin && "m-1"}`}>{desc}</div>
    </div>
  );
};
