import React, { useState, useEffect, useRef } from "react";
import useAxios from "axios-hooks";
import { Result, Loading } from "../index";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import logoPNG from "assets/img/logo.png";

import "./style.scss";

export default ({ location }) => {
  const [word, setWord] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [lang, setLang] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isSuggestionMode, setSuggestionMode] = useState(false);
  const [name, setName] = useState("");

  const [{ data, loading, error }, callable] = useAxios(
    {
      url: "/translation/create",
      method: "post",
    },
    { manual: true }
  );

  if (!lang)
    return (
      <Row className="pb-3">
        <div
          className="mx-auto p-3"
          style={{ background: "aliceblue", borderRadius: "5rem" }}
        >
          <Image
            src={logoPNG}
            height={100}
            width={100}
            className="header-logo"
            alt="linkerpad"
          />
        </div>
        <h2 className="text-center w-100 mt-5">سلام</h2>
        <h2 className="text-center w-100 mb-5">به تحریر خوش اومدی!</h2>
        <div className="w-100 mb-5">
          <h4
            className="mx-auto text-center"
            style={{ maxWidth: "800px", fontWeight: "300", margin: "2rem" }}
          >
            ما یه سامانه آنلاینیم که توی اون میتونی ترجمه های مختلف کلمه مد نظرت
            رو سرچ کنی، به ترجمه های جالب بقیه نمره بدی و نظر خودت رو با
            تحریریون به اشتراک بزاری، قراره کلی رشد کنیم، جزو اولین نفر ها
            باش...
          </h4>
        </div>
        <Col>
          <div className="lang-btn" onClick={() => setLang("fa")}>
            <h3 style={{ fontWeight: "400" }}>پارسی</h3>
          </div>
        </Col>

        <Col>
          <div className="lang-btn" onClick={() => setLang("en")}>
            <h3 style={{ fontWeight: "400" }}>English</h3>
          </div>
        </Col>
      </Row>
    );

  return (
    <Container fluid>
      {/* <span className="mx-auto"></span> */}
      <Row className="row my-4">
        <Col xs={12} className="p-3 mr-auto">
          <label htmlFor="translate-from-input" className="float-right">
            {lang === "fa" ? "فارسی" : "انگلیسی"}
          </label>
          <Form.Control
            size="lg"
            value={word}
            onChange={e => {
              setWord(e.target.value);
              setIsSubmit(false);
            }}
            type="text"
            placeholder="Large text"
            id="translate-form-input"
            name="translate-form-input"
            placeholder="کلمه خود را جستجو کنید"
            className="w-100"
            style={{ height: "40px" }}
            disabled={isSuggestionMode}
          />
        </Col>

        {isSuggestionMode && (
          <>
            <Col xs={12} className="p-3 mr-auto">
              <label htmlFor="translate-to-input" className="float-right">
                {lang === "fa" ? "انگلیسی" : "فارسی"}
              </label>
              <Form.Control
                size="lg"
                value={suggestion}
                onChange={e => {
                  setSuggestion(e.target.value);
                  setIsSuggesting(false);
                }}
                type="text"
                id="translate-to-input"
                name="translate-to-input"
                placeholder="ترجمه پیشنهادی خود را بنویسید"
                className="w-100"
                style={{ height: "40px" }}
              />
            </Col>
            <Col xs={12} className="p-3 mr-auto">
              <label htmlFor="name-input" className="float-right">
                نام مترجم
              </label>
              <Form.Control
                size="lg"
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                id="name-input"
                name="name-input"
                placeholder="محمد هدشی"
                className="w-100"
                style={{ height: "40px" }}
              />
            </Col>
          </>
        )}

        <Col xs={12} sm={12} md={6} lg={4} className="p-3 ml-auto">
          <button
            onClick={() => {
              console.log(word, suggestion, lang, name)
              if (isSuggestionMode)
                {
                  callable({
                    data: {
                      word: word,
                      translation: suggestion,
                      lang: lang,
                      name: name
                    }
                  });
                  setSuggestionMode(false);
                  setIsSubmit(false);  
                }
              else setIsSubmit(true);
            }}
            className={`btn btn-primary mx-auto my-1 ${isSuggestionMode &&
              "btn-success"}`}
            disabled={
              (!isSuggestionMode && (isSubmit || !word)) ||
              (isSuggestionMode && (!suggestion || loading))
            }
          >
            {isSuggestionMode
              ? "پیشنهاد بده" || (loading && <Loading tiny noMargin />)
              : "ترجمه کن"}
          </button>
        </Col>

        {isSubmit && (
          <Col xs={12} sm={12} md={6} lg={4} className="p-3">
            <button
              onClick={() => {
                // setLang(null);
                // setIsSubmit(false);
                // setWord("");
                setSuggestionMode(!isSuggestionMode);
              }}
              className={`btn btn-primary mx-auto my-1 float-left ${isSuggestionMode &&
                "btn-danger"}`}
            >
              {isSuggestionMode ? "لغو" : "ترجمه پیشنهاد بده!"}
            </button>
          </Col>
        )}
      </Row>

      {isSubmit && <Result word={word} lang={lang} />}
    </Container>
  );
};
