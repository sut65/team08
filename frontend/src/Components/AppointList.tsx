import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AppointInterface } from "../Models/IAppoint";
import { GetAppoint, GetTreatment } from "../Services/HttpClientService";
import { TreatmentsInterface } from "../Models/ITreatment";
//++
import { Dialog, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
///

function AppointList() {
  const [Appoints, setAppoints] = useState<AppointInterface[]>([]);
  const [treatment, setTreatment] = useState<TreatmentsInterface[]>([]);

  //+++
  const [AppointID, setAppointID] = React.useState(0);
  const [openDelete, setOpendelete] = React.useState(false);
  const [openUpdate, setOpenupdate] = React.useState(false);
  const navigate = useNavigate();
  ////

  useEffect(() => {
    getAppoints();
    getTreatment();
  }, []);

  //+++
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setAppointID(Number(params.row.ID));
    localStorage.setItem("AppointID", params.row.ID);
  };
  const handleClose = () => {
    setOpendelete(false);
    setOpenupdate(false);
  };

  const Delete_Appoint = async () => {
    const apiUrl = `http://localhost:8080/appoint/${AppointID}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          //console.log("delete ID: " + DispenseID)
        } else {
          console.log("NO DATA");
        }
      });

    handleClose();
    getAppoints();
  };

  ///

  const getTreatment = async () => {
    let res = await GetTreatment();
    if (res) {
      setTreatment(res);
      console.log(res);
    }
  };

  const getAppoints = async () => {
    let res = await GetAppoint();
    if (res) {
      setAppoints(res);
      console.log(res);
    }
  };
  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "UPDATE",
      headerName: "แก้ไข",
      width: 100,
      renderCell: () => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenupdate(true)}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "DELETE",
      headerName: "ลบ",
      width: 100,
      renderCell: () => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpendelete(true)}
          >
            Delete
          </Button>
        );
      },
    },
    {
      field: "Treatment",
      headerName: "ผู้ป่วย",
      width: 200,
      valueFormatter: (params) => params.value.TREATMENT_ID,
    },

    {
      field: "Levelcure",
      headerName: "สิทธิในการรักษา",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },

    {
      field: "Department",
      headerName: "แผนกที่นัด",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },

    {
      field: "Date_now",
      headerName: "วันที่ออกใบนัด",
      width: 200,
    },
    {
      field: "Date_appoint",
      headerName: "วัน-เวลาที่นัด",
      width: 200,
    },

    // {
    //   field: "Officer",
    //   headerName: "เจ้าหน้าที่ผู้ออกใบนัด",
    //   width: 150,
    //   valueFormatter: (params) => params.value.Name,
    // },
  ];

  return (
    <div>
      {/* ยืนยันการลบ */}
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>
          <div className="good-font">ยืนยันการลบรายการ</div>
        </DialogTitle>
        <Button variant="contained" color="primary" onClick={Delete_Appoint}>
          <div className="good-font">ยืนยัน</div>
        </Button>
      </Dialog>
{/* ยืนยันการแก้ไข */}
      {Appoints.map((row) => (
            <Dialog open={openUpdate} onClose={handleClose} key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <DialogTitle><div className="good-font">ยืนยันการแก้ไขรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        aria-lable="outlined button group"
                        //กด "ยืนยัน" ไปที่หน้าแก้ไข
                        onClick={() => navigate({ pathname: `/AppointUpdate/${AppointID}` })} autoFocus
                    >
                        <div className="good-font">
                          ยืนยัน
                        </div>
                  </Button>
              </Dialog>
        ))}
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการนัด
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/AppointCreate"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูลการนัดลำดับต่อไป
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={Appoints}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={handleRowClick}
          />
        </div>
      </Container>
    </div>
  );
}
export default AppointList;
