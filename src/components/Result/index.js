import React, { useState } from "react";
import useAxios from "axios-hooks";

import { SelectedResult, Loading } from "../index";

import { Row, Col } from "react-bootstrap";
import "./style.scss";

export default props => {
  const [selectedResult, setSelectedResult] = useState({});
  const [{ data, loading, error }, refetch] = useAxios({
    url: `/translation/get?word=${props.word}&lang=${props.lang}`,
    method: "get"
  });

  return (
    <>
      {loading && !data ? (
        <div style={{width: '2rem', height: '2rem'}} className="mx-auto my-3">
          <Loading tiny noMargin />
        </div>
      ) : null}
      {error ? (
        <div className="w-100 text-center">
          <span>ترجمه کلمه وارد شده موجود نیست، از شما تقاضا داریم</span>
          <span>کلمه پیشنهاد دهید </span>
        </div>
      ) : null}
      {data ? (
        <Row>
          {data.translations.slice(0, 10).map(item => {
            return (
              <Col
                key={item.translation}
                onClick={() => setSelectedResult(item)}
                className={`
                  result-translation 
                  ${item.translation === selectedResult.translation && "active"}
                `}
              >
                <h5 className="mb-0">{item.translation}</h5>
              </Col>
            );
          })}
        </Row>
      ) : null}
      {selectedResult.translation !== undefined ? (
        <SelectedResult refetch={() => {refetch(); setSelectedResult(selectedResult);}} comments={selectedResult.comments} translation={selectedResult.translation} {...props} />
      ) : null}
    </>
  );
};
