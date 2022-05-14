import React, { useEffect } from "react";
import apiClient from "../../util/http-common";
import "antd/dist/antd.css";
import { Table, Tag, Space } from "antd";

function Participants(props) {
  useEffect(() => {
    const participants = async () => {
      try {
        const response = await apiClient.get("/participants");
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    participants();
  }, []);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trường",
      dataIndex: "school",
      key: "phone",
    },
    {
      title: "MSSV",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Ngày đặt",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Participants;
