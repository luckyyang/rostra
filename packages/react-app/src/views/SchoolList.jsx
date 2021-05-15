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
  // if (!schoolNumBN) return "loading";
  const schoolNum = schoolNumBN && schoolNumBN.toNumber() || 1;
  console.log('====== schoolNumBN && schoolNumBN.toNumber(): ', schoolNumBN && schoolNumBN.toNumber())
  const schoolId = 0
  // const schoolList = [];
  // if (schoolNum) {
  //   for (let index = 0; index < schoolNum.toNumber(); index++) {
  //     const element = <SchoolCard schoolNum={index} readContracts={readContracts} />
  //     schoolList.push(element)
  //   }
  // }
  // console.log('schoolList---: ', schoolList);

  const univ = useContractReader(readContracts, "UniversityFactory", "allUniversity", [schoolId]);
  console.log(' ========== ' , univ)
  if (!univ) return <div>No School Found</div>
  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>School List</h2>
        {/* <div>
          {schoolList}
        </div> */}
        <Card>
          <div>
          <Link
              onClick={() => {
                setRoute(`/school-detail/${schoolNum}`);
              }}
              to={`/school-detail/${schoolNum}`}
            >
              Name: {univ.name}
            </Link>
          </div>
          <div>
            Mission: {univ.introduce}
          </div>
          <div>
            Creator: {univ.owner}
          </div>
          <Divider />
          <div style={{ margin: 8 }}>
            <Input
              placeholder={"Donation Amount"}
              onChange={e => {
                setDonationNum(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                console.log("schoolNum, donationNum: ", schoolNum, donationNum);
                /* look how you call setPurpose on your contract: */
                tx(writeContracts.UniversityFactory.donate(schoolNum, 0, donationNum));
              }}
            >
              Confirm
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
