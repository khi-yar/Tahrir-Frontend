import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Loading } from "../index"

export default ({ comments, word, lang, translation }) => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [opinion, setOpinion] = useState("");

  const [{ data, loading, error }, callable] = useAxios({
    url: `/comment/create`,
    method: "post"
  }, {manual: true});

  console.log(data, loading, error)

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
            return <Col>اطلاعات کامنت</Col>;
          })}
        </>
      )}

      <Form as={Col}>
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
