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
  const univ = useContractReader(readContracts, "UniversityFactory", "allUniversity", [schoolId], 10000);
  console.log('=====univ, schoolId, readContracts: ', univ, schoolId, readContracts)
  const schoolAddress = useContractReader(readContracts, "UniversityFactory", "idToUniversity", [schoolId], 10000);
  console.log(' ========== schoolAddress: ' , schoolAddress)

  return (
    <div style={{ border: "1px solid #cccccc", padding: 16, marginTop: 64 }}>
      <div>
        <Link
          onClick={() => {
            // setRoute(`/school-detail/0`);
          }}
          to={`/school-detail/${schoolId}`}
        >
          Name: {univ && univ.name}
        </Link>
      </div>
      <div>
        Mission: {univ && univ.introduce}
      </div>
      <div>
        School Address: {schoolAddress}
      </div>
      <div>
        Creator: {univ && univ.owner}
      </div>
    </div>
  );
}
