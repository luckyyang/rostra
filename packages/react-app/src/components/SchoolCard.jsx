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
import universityAbi from '../contracts/University.abi'

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
  const [donationNum, setDonationNum] = useState(0);
  const univ = useContractReader(readContracts, "UniversityFactory", "allUniversity", [schoolId], 10000);
  console.log('=====univ, schoolId, readContracts: ', univ, schoolId, readContracts)
  const schoolAddress = useContractReader(readContracts, "UniversityFactory", "idToUniversity", [schoolId], 10000);
  console.log(' ========== schoolAddress: ' , schoolAddress)

  const universityContract = useExternalContractLoader(userProvider, schoolAddress, universityAbi);
  const totalDonationBN = useContractReader({ University: universityContract }, "University", "idToAllDonate", [schoolId]);
  const totalDonation = totalDonationBN && formatEther(totalDonationBN) || 0
  console.log(' ========== totalDonation: ' , totalDonation)

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
        School Id: {schoolId}
      </div>
      <div>
        School Address: {schoolAddress}
      </div>
      <div>
        Creator: {univ && univ.owner}
      </div>
      <div>
      totalDonation: {totalDonation}
      </div>
      <div style={{ margin: 8 }}>
        <Input
          placeholder={"Donation Amount"}
          onChange={e => {
            setDonationNum(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            console.log("schoolAddress: ", schoolAddress);
            tx(
              writeContracts.UniversityFactory.donate(
                schoolAddress,
                0,
                '0x0000000000000000000000000000000000000000',
                parseEther(donationNum),
                { value: parseEther(donationNum) }
              )
            );
          }}
        >
          Donate
        </Button>
      </div>
    </div>
  );
}
