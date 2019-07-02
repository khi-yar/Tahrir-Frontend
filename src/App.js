import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import useAxios from "axios-hooks";
import Axios from "axios";
import LRU from "lru-cache";
import { configure } from "axios-hooks";

import { Header, Search } from "components";

import { Container } from "react-bootstrap";
import "./app.scss";

const axios = Axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    // "Authorization": localStorage.getItem("token"),
    "Content-Type": "application/json"
  }
});

const cache = new LRU({ max: 10 });

configure({ axios, cache });

const App = () => {
  // const [state, setState] = useState({});

  // const [{ data, loading, error }, refetch] = useAxios({
  //   url: "echo?name=akvar",
  //   method: "get",
  //   // data: {
  //   //   name: "asghar"
  //   // }
  // });

  // console.log(data)

  return (
    <BrowserRouter>
      {/* <Header/> */}
        <Container className="app">
          <div className="wrapper">
            <Switch>
              <Route path="/" name="جستجو" component={Search} />
              {/* <PrivateRoute exact path='/project/:id/edit' name="ویرایش پروژه" component={ProjectEditView} /> */}
            </Switch>
          </div>
        </Container>
    </BrowserRouter>
  );
};

export default App;
