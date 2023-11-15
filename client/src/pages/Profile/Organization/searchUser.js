// // UserSearch.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, Modal, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../Redux/loadersSlice";
import { getDateFormat } from "../../../utils/helper";

const UserSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [userType, setUserType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("search", searchResults);
  }, [searchResults]);

  const handleSearch = async () => {
    try {
      dispatch(SetLoading(true));

      const response = await axios.post(
        "http://localhost:5001/api/inventory/search",
        {
          searchInput: searchInput,
        }
      );

      dispatch(SetLoading(false));
      setSearchResults(response.data.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
      dispatch(SetLoading(true));
    }
  };

  console.log("result", searchResults);
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter Blood Group or Name ..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <Button
        style={{ marginTop: "10px" }}
        type="primary"
        onClick={handleSearch}
      >
        Search
      </Button>

      <Modal
        title="Search Results"
        width={800}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        <Table
          dataSource={searchResults}
          columns={[
            {
              title: "Name",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Blood Group",
              dataIndex: "bloodGroup",
              key: "bloodGroup",
            },
            {
              title: "Phone Number",
              dataIndex: "phone",
              key: "phone",
            },
            {
              title: "Last Donated On",
              dataIndex: "updatedAt",
              key: "updatedAt",
              render: (date) => getDateFormat(date),
            },
          ]}
        />
      </Modal>
    </div>
  );
};
export default UserSearch;
