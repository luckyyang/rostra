/* eslint-disable jsx-a11y/accessible-emoji */

import { SyncOutlined } from "@ant-design/icons";
import { formatEther, parseEther } from "@ethersproject/units";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance, School } from ".";
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
  schoolId
}) {
  const univ = useContractReader(readContracts, "UniversityFactory", "allUniversity", [schoolId], 3);
  console.log('=====univ, schoolId, readContracts: ', univ, schoolId, readContracts)
  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <div>
          <Link
            onClick={() => {
              // setRoute(`/school-detail/0`);
            }}
            to={`/school-detail/0`}
          >
            Name: {univ && univ.name}
          </Link>
        </div>
        <div>
          Mission: {univ && univ.introduce}
        </div>
        <div>
          Creator: {univ && univ.owner}
        </div>
      </div>
    </div>
  );
}
