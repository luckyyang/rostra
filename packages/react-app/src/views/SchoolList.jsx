/* eslint-disable jsx-a11y/accessible-emoji */

import { SyncOutlined } from "@ant-design/icons";
import { formatEther, parseEther } from "@ethersproject/units";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance, SchoolCard } from "../components";
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
  const [donationNum, setDonationNum] = useState(0);

  const schoolNumBN = useContractReader(readContracts, "UniversityFactory", "universityLength");
  const schoolNum = schoolNumBN && schoolNumBN.toNumber() || 0;
  const schoolList = [];
  if (schoolNum) {
    for (let index = 0; index < schoolNum; index++) {
      const element = <SchoolCard key={index} schoolId={index} readContracts={readContracts} />
      schoolList.push(element)
    }
  }

  return (
    <div style={{ padding: 16, width: 600, margin: "auto", marginTop: 64 }}>
      <h2>School List</h2>
      <div>
        {schoolList}
      </div>
    </div>
  );
}
