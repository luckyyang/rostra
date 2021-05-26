/* eslint-disable jsx-a11y/accessible-emoji */

import { SyncOutlined } from "@ant-design/icons";
import { formatEther, parseEther } from "@ethersproject/units";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Balance, SchoolCard } from "../components";

export default function ExampleUI({
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
  const pathNameArr = window.location.pathname.split('/')
  const schoolId = pathNameArr[pathNameArr.length-1]
  console.log(' ***** schoolId: ', schoolId)
  return (
    <div style={{ padding: 16, width: 600, margin: "auto", marginTop: 64 }}>
      <h2>School Detail</h2>
      <SchoolCard schoolId={schoolId} readContracts={readContracts} />
    </div>
  );
}
