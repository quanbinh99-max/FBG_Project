import React, { useEffect, useState } from "react";
import apiClient from "../../util/http-common";
import "antd/dist/antd.css";
import { Table, Tag, Space } from "antd";

function Participants(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const participants = async () => {
      try {
        const response = await apiClient.get("/participants");
        setData(response.data);
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
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Trường",
      dataIndex: "school",
      key: "school",
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
    {
      title: "VCSC",
      dataIndex: "vcsc",
      key: "vcsc",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Participants;
