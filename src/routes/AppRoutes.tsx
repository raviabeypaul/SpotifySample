import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";

class AppRoutes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<HomePage/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default AppRoutes;
