/* eslint-disable jsx-a11y/accessible-emoji */

import { SyncOutlined } from "@ant-design/icons";
import { formatEther, parseEther } from "@ethersproject/units";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance } from "../components";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useExternalContractLoader,
  useGasPrice,
  useOnBlock,
  useUserProvider,
} from "../hooks";
import { BrowserRouter, Link, Route } from "react-router-dom";

export default function ExampleUI({
  purpose,
  setPurposeEvents,
  address,
  mainnetProvider,
  userProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
  setRoute,
}) {
  const [name, setName] = useState("loading...");
  const [author, setAuthor] = useState("loading...");
  const [courseLink, setCourseLink] = useState("loading...");
  const [donationNum, setDonationNum] = useState(0);

  return (
    <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
      <h2>Create A Course</h2>
      <Divider />
      <div style={{ margin: 8 }}>
        <Input
          placeholder={"Name"}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <Input
          placeholder={"Link"}
          onChange={e => {
            setCourseLink(e.target.value);
          }}
        />
        <Input
          placeholder={"Author"}
          onChange={e => {
            setAuthor(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            console.log("name, courseLink, author: ", name, courseLink, author);
            /* look how you call setPurpose on your contract: */
            tx(writeContracts.CourseFactory.createCourse(name, courseLink, author));
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
