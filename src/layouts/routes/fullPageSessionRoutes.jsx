/** @format */

import React from "react";
import { Route, Redirect } from "react-router-dom";

import FullPageLayout from "../fullPageLayout";

const FullPageLayoutSessionRoute = ({ render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        if (localStorage.getItem("token")) {
          if (JSON.parse(localStorage.getItem("user"))._role.name === "ADMIN") {
            return (
              <Redirect
                to={{
                  pathname: "/admin",
                }}
              />
            );
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/user",
                }}
              />
            );
          }
        } else {
          return <FullPageLayout>{render(matchProps)}</FullPageLayout>;
        }
      }}
    />
  );
};

export default FullPageLayoutSessionRoute;
