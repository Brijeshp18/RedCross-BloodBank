import React from "react";
import {
  GetAllOrganizationsOfADonar,
  GetAllOrganizationsOfAHospital,
} from "../../../Apicall/users";
import { SetLoading } from "../../../Redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { message, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import { getDateFormat } from "../../../utils/helper";
import InventoryTable from "../../../components/InventoryTable";
import SearchUser from "./searchUser";

function Organization({ userType }) {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const { currentUser } = useSelector((state) => state.users);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      let response = null;
      if (userType === "hospital") {
        response = await GetAllOrganizationsOfAHospital();
      } else {
        response = await GetAllOrganizationsOfADonar();
      }
      dispatch(SetLoading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "organizationName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span
          className="underline text-md cursor-pointer"
          onClick={() => {
            setSelectedOrganization(record);
            setShowHistoryModal(true);
          }}
        >
          History
        </span>
      ),
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      {showHistoryModal && (
        <Modal
          title={`${
            userType === "donor" ? "Donations History" : "Cosumptions History"
          } In ${selectedOrganization.organizationName}`}
          centered
          open={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
          width={1000}
          onCancel={() => setShowHistoryModal(false)}
        >
          <InventoryTable
            filters={{
              organization: selectedOrganization._id,
              [userType]: currentUser._id,
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Organization;
