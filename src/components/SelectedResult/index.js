import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Loading } from "../index"
import Rating from "react-rating"
import USERLOGO from "assets/img/user-logo.png";

import "./style.scss";

export default ({ comments, word, lang, translation }) => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [opinion, setOpinion] = useState("");

  const [{ data, loading, error }, callable] = useAxios({
    url: `/comment/create`,
    method: "post"
  }, {manual: true});

  console.log(data, loading, error)

  if(loading) 
    return (
      <Loading />
    )

  return (
    <Row>
      <h3 className="w-100 mt-5 mb-3">نظرات کاربران</h3>
      {comments.length === 0 ? (
        <>
          <h5 className="w-100">
            متاسفانه هیچ کاربری برای این ترجمه نظری ثبت نکرده است.
          </h5>
          <p className="w-100">نظر شما درباره ی این ترجمه چیست؟</p>
        </>
      ) : (
        <>
          {comments.map(comment => {
            return <Col xs={12} className="comment-section mb-4">
              <Row>
                <Col>
                <img src={USERLOGO} width="30" height="30" />
                <span>{comment.submitter_name}</span></Col>
                <Col>
                  <div className="float-left">
                    <Rating 
                      initialRating={comment.rating} 
                      emptySymbol={<i class="far fa-star"></i>}
                      fullSymbol={<i class="fas fa-star"></i>}
                      readonly
                    />
                  </div>
                </Col>
              </Row>
              <Row className="m-3">{comment.comment}</Row>
            </Col>;
          })}
        </>
      )}

      <Form className="w-100">
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>نام</Form.Label>
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="محمد هدشی"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>نمره</Form.Label>
          <Form.Control
            value={rate}
            onChange={e => setRate(e.target.value)}
            as="select"
          >
            <option>بدون نمره</option>
            <option value={1}>یک ستاره</option>
            <option value={2}>دو ستاره</option>
            <option value={3}>سه ستاره</option>
            <option value={4}>چهار ستاره</option>
            <option value={5}>پنج ستاره</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>توضیحات</Form.Label>
          <Form.Control
            value={opinion}
            as="textarea"
            rows="5"
            onChange={e => setOpinion(e.target.value)}
          />
        </Form.Group>

        <Button
          variaty={"primary"}
          type="submit"
          onClick={() =>
            callable({
              data: {
                name,
                word,
                lang,
                translation,
                rating: rate,
                comment: opinion
              }
            })
          }
          disabled={!rate || !opinion || !name}
        >
          {loading && <Loading tiny noMargin />}ثبت
        </Button>
      </Form>
    </Row>
  );
};
