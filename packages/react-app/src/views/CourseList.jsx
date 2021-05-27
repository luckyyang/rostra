/* eslint-disable jsx-a11y/accessible-emoji */

import { SyncOutlined } from "@ant-design/icons";
import { formatEther, parseEther } from "@ethersproject/units";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance, CourseCard } from "../components";
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

  const courseNumBN = useContractReader(readContracts, "CourseFactory", "courseLength", 10000);
  const courseNum = courseNumBN && courseNumBN.toNumber() || 0;
  const courseList = [];
  if (courseNum) {
    for (let index = 0; index < courseNum; index++) {
      const element = <CourseCard key={index} courseId={index} readContracts={readContracts} />
      courseList.push(element)
    }
  }

  return (
    <div style={{ padding: 16, width: 600, margin: "auto", marginTop: 64 }}>
      <h2>Course List({courseNum})</h2>
      <div>
        {courseList}
      </div>
    </div>
  );
}
