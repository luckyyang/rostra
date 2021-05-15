/* eslint-disable jsx-a11y/accessible-emoji */

import { SyncOutlined } from "@ant-design/icons";
import { formatEther, parseEther } from "@ethersproject/units";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance } from "../components";

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
}) {
  const [schoolAddress, setSchoolAddress] = useState("loading...");
  const [startBlock, setStartBlock] = useState("loading...");
  const [endBlock, setEndBlock] = useState("loading...");

  const [courseAddress, setCourseAddress] = useState("loading...");
  const [startBlockCourse, setStartBlockCourse] = useState("loading...");
  const [endBlockCourse, setEndBlockCourse] = useState("loading...");

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Create A Donation Event</h2>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            placeholder={"School Address"}
            onChange={e => {
              setSchoolAddress(e.target.value);
            }}
          />
          <Input
            placeholder={"Start Block"}
            onChange={e => {
              setStartBlock(e.target.value);
            }}
          />
          <Input
            placeholder={"End Block"}
            onChange={e => {
              setEndBlock(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              /* look how you call setPurpose on your contract: */
              tx(writeContracts.UniversityFactory.createDonate(schoolAddress, startBlock, endBlock));
            }}
          >
            Create Donation
          </Button>
        </div>
      </div>

      {/* course */}
      {/* <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Create A Donation Event</h2>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            placeholder={"Course Address"}
            onChange={e => {
              setCourseAddress(e.target.value);
            }}
          />
          <Input
            placeholder={"Start Block"}
            onChange={e => {
              setStartBlockCourse(e.target.value);
            }}
          />
          <Input
            placeholder={"End Block"}
            onChange={e => {
              setEndBlockCourse(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              tx(writeContracts.CourseFactory.createDonate(courseAddress, startBlockCourse, endBlockCourse));
            }}
          >
            Create Donation
          </Button>
        </div>
      </div> */}
    </div>
  );
}
