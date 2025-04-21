"use client";

import Tokens from "./Tokens";
import Overview from "./Overview";
import { Fragment } from "react";

const CollectionManagePage = () => (
  <Fragment>
    <Overview />
    <Tokens />
  </Fragment>
);

export default CollectionManagePage;
