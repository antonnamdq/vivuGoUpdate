import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import axios from "axios";
import * as React from "react";
import { toast } from "react-toastify";
const Datatable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState("");
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/${path}`
  );

  useEffect(() => {
    setList(data);
  }, [data]);
  const handleDelete = async (id) => {
    try {
      if (path === "rooms") {
        const dataRoom = await axios.get(
          `http://localhost:8800/api/rooms/${id}`
        );
        console.log(dataRoom);
        console.log(id, "id");
      } else {
        await axios.delete(`http://localhost:8800/api/${path}/${id}`);
      }
      toast.success("Deleted successfully");
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleNavigation = (id) => {
    navigate(`/${path}/edit`, { state: { id } });
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="editButton"
              onClick={() => handleNavigation(params.row._id)}
            >
              Edit
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path === "users"
          ? "Add New User"
          : path === "hotels"
          ? "Add New Hotel"
          : "Add New Room"}

        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
