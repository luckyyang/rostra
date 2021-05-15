/* eslint-disable jsx-a11y/accessible-emoji */

import { SyncOutlined } from "@ant-design/icons";
import { formatEther, parseEther } from "@ethersproject/units";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance } from "../components";
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
  const [name, setName] = useState("loading...");
  const [author, setAuthor] = useState("loading...");
  const [courseLink, setCourseLink] = useState("loading...");
  const [donationNum, setDonationNum] = useState(0);

  const courseId = 0;
  const courseAddress = useContractReader(readContracts, "CourseFactory", "idToCourse", [courseId]);
  console.log(' ========== courseAddress: ' , courseAddress)

  const course = useContractReader(readContracts, "CourseFactory", "allCourse", [courseId]);
  console.log(' ========== ' , course)
  const courseAddress1 = useContractReader(readContracts, "CourseFactory", "idToCourse", [1]);
  console.log(' ========== courseAddress: ' , courseAddress)

  const course1 = useContractReader(readContracts, "CourseFactory", "allCourse", [1]);
  console.log(' ========== ' , course1)

  if (!course) return <div>No Course Found</div>
  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Create A Course</h2>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            placeholder={"Name"}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <Input
            placeholder={"Link"}
            onChange={e => {
              setCourseLink(e.target.value);
            }}
          />
          <Input
            placeholder={"Author"}
            onChange={e => {
              setAuthor(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              console.log("name, courseLink, author: ", name, courseLink, author);
              /* look how you call setPurpose on your contract: */
              tx(writeContracts.CourseFactory.createCourse(name, courseLink, author));
            }}
          >
            Confirm
          </Button>
        </div>
      </div>

      <div>
        {/*
          ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
        */}
        <div style={{ padding: 16, width: 600, margin: "auto", marginTop: 64 }}>
          <h2>Course List</h2>
          {/* <div>
            {courseList}
          </div> */}
          <Card>
            <div>
              <Link
                onClick={() => {
                  setRoute(`/course-detail/0`);
                }}
                to={`/course-detail/0`}
              >
                Name: {course.title}
              </Link>
            </div>
            <div>
              Link: {course.url}
            </div>
            <div>
              Author: {course.author}
            </div>
            Course Address: {courseAddress}
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
          </Card>

          <Card>
            <div>
              <Link
                onClick={() => {
                  setRoute(`/course-detail/1`);
                }}
                to={`/course-detail/1`}
              >
                Name: {course1 && course1.title}
              </Link>
            </div>
            <div>
              Link: {course1 && course1.url}
            </div>
            <div>
              Author: {course1 && course1.author}
            </div>
            Course Address: {courseAddress1}
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
                  console.log("courseAddress: ", courseAddress1);

                  tx(
                    writeContracts.CourseFactory.donate(
                      courseAddress1,
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
          </Card>
        </div>
      </div>
    </div>
  );
}
