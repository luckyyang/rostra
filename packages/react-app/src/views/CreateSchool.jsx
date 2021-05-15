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
  const [name, setName] = useState("loading...");
  const [mission, setMission] = useState("loading...");

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Create Your School</h2>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            placeholder={"Name"}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <Input
            placeholder={"Mission"}
            onChange={e => {
              setMission(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              console.log("name, mission: ", name, mission);
              /* look how you call setPurpose on your contract: */
              // todo
              tx(writeContracts.UniversityFactory.createUniversity(name, mission));
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
