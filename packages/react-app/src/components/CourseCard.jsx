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
  courseId
}) {
  const [name, setName] = useState("loading...");
  const [author, setAuthor] = useState("loading...");
  const [courseLink, setCourseLink] = useState("loading...");
  const [donationNum, setDonationNum] = useState(0);

  const course = useContractReader(readContracts, "CourseFactory", "allCourse", [courseId], 10000);
  console.log('=====course, courseId, readContracts: ', course, courseId, readContracts)
  const courseAddress = useContractReader(readContracts, "CourseFactory", "idToCourse", [courseId], 10000);
  console.log(' ========== courseAddress: ' , courseAddress)

  const donateElem = (
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
          console.log("courseAddress: ", courseAddress);

          tx(
            writeContracts.CourseFactory.donate(
              courseAddress,
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
      <Button
        onClick={() => {
          console.log("donationNum: ", donationNum);
          console.log("courseAddress: ", courseAddress);

          tx(
            writeContracts.CourseFactory.withdrawDonate(
              courseAddress,
              1,
              '0x0000000000000000000000000000000000000000',
              1,
              { value: parseEther("0.0001") }
            )
          );
        }}
      >
        Withdraw
      </Button>
    </div>
  )

  return (
    <div style={{ border: "1px solid #cccccc", padding: 16, marginTop: 64 }}>
      <div>
        {/* <Link
          onClick={() => {
            setRoute(`/course-detail/0`);
          }}
          to={`/course-detail/0`}
        >
        </Link> */}
        Name: {course && course.title}
      </div>
      <div>
        Link: {course && course.url}
      </div>
      <div>
        Author: {course && course.author}
      </div>
      Course Address: {courseAddress}

      {donateElem}
    </div>
  );
}
