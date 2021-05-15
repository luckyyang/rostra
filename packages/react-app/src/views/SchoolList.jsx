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
  const schoolAddress = useContractReader(readContracts, "UniversityFactory", "idToUniversity", [schoolId]);
  console.log(' ========== schoolAddress: ' , schoolAddress)

  const univ = useContractReader(readContracts, "UniversityFactory", "allUniversity", [schoolId]);
  console.log(' ========== ' , univ)
  const schoolAddress1 = useContractReader(readContracts, "UniversityFactory", "idToUniversity", [1]);
  console.log(' ========== schoolAddress: ' , schoolAddress)

  const univ1 = useContractReader(readContracts, "UniversityFactory", "allUniversity", [1]);
  console.log(' ========== ' , univ1)

  if (!univ) return <div>No School Found</div>
  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ padding: 16, width: 600, margin: "auto", marginTop: 64 }}>
        <h2>School List</h2>
        {/* <div>
          {schoolList}
        </div> */}
        <Card>
          <div>
            <Link
              onClick={() => {
                setRoute(`/school-detail/0`);
              }}
              to={`/school-detail/0`}
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
          School Address: {schoolAddress}
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
                console.log("donationNum: ", donationNum);
                console.log("schoolAddress: ", schoolAddress);

                tx(
                  writeContracts.UniversityFactory.donate(
                    schoolAddress,
                    1,
                    '0x0000000000000000000000000000000000000000',
                    1,
                    { value: parseEther("0.0001") }
                  )
                );
              }}
            >
              Donate
            </Button>
          </div>
        </Card>

        <Card>
          <div>
            <Link
              onClick={() => {
                setRoute(`/school-detail/1`);
              }}
              to={`/school-detail/1`}
            >
              Name: {univ1 && univ1.name}
            </Link>
          </div>
          <div>
            Mission: {univ1 && univ1.introduce}
          </div>
          <div>
            Creator: {univ1 && univ1.owner}
          </div>
          School Address: {schoolAddress1}
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
                console.log("schoolAddress: ", schoolAddress1);

                tx(
                  writeContracts.UniversityFactory.donate(
                    schoolAddress1,
                    1,
                    '0x0000000000000000000000000000000000000000',
                    1,
                    { value: parseEther("0.0001") }
                  )
                );
              }}
            >
              Donate
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
