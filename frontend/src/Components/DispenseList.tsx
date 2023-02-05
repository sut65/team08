import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { DispenseInterface } from "../Models/IDispense";
import { GetDispense, GetTreatment } from "../Services/HttpClientService";
import { TreatmentsInterface } from "../Models/ITreatment";
import { Dialog, DialogTitle } from "@mui/material";

function DispenseList() {
  const [Dispenses, setDispenses] = useState<DispenseInterface[]>([]);
  const [treatment, setTreatment] = useState<TreatmentsInterface[]>([]);
  //+++
  const [DispensesID, setDispensesID] = React.useState(0);
  const [openDelete, setOpendelete] = React.useState(false);
  const [openUpdate, setOpenupdate] = React.useState(false);
  ////

  useEffect(() => {
    getDispenses();
    getTreatment();
  }, []);

  //+++
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setDispensesID(Number(params.row.ID));
    localStorage.setItem("DispenseID", params.row.ID);
  };
  const handleClose = () => {
    setOpendelete(false);
    setOpenupdate(false);
  };

  const Delete_Dispenses = async () => {
    const apiUrl = `http://localhost:8080/dispense/${DispensesID}`;
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
          console.log("NO DATA")
        }
    });
    
    handleClose();
    getDispenses();
};

  ///

  const getTreatment = async () => {
    let res = await GetTreatment();
    if (res) {
      setTreatment(res);
      console.log(res);
    }
  };

  const getDispenses = async () => {
    let res = await GetDispense();
    if (res) {
      setDispenses(res);
      console.log(res);
    }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "UPDATE", headerName: "แก้ไข", width: 100,
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
      field: "DELETE", headerName: "ลบ", width: 100,
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
      headerName: "หมายเลขการรักษา",
      width: 200,
      valueFormatter: (params) => params.value.TREATMENT_ID,
    },
    {
      field: "Drug",
      headerName: "ยาที่จ่าย",
      width: 250,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Practice",
      headerName: "การรับประทานยา",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Number",
      headerName: "จำนวนยา",
      width: 150,
    },
  ];

  return (
    <div>
      {/* ยืนยันการลบ */}
      <Dialog open={openDelete} onClose={handleClose} >
                <DialogTitle><div className="good-font">ยืนยันการลบรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        onClick={Delete_Dispenses}
                    >
                        <div className="good-font">
                            ยืนยัน
                        </div>
                    </Button>
            </Dialog>
          
        {/* ยืนยันการแก้ไข */}
        <Dialog open={openUpdate} onClose={handleClose} >
                <DialogTitle><div className="good-font">ยืนยันการแก้ไขรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        //กด "ยืนยัน" ไปที่หน้าแก้ไข
                        component={RouterLink}
                        to="/EmployeeattemdanceINUpdate"
                    >
                        <div className="good-font">
                            ยืนยัน
                        </div>
                    </Button>
            </Dialog>
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
              ข้อมูลการจ่ายยา
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/DispenseCreate"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูลการจ่ายยาลำดับต่อไป
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={Dispenses}
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

export default DispenseList;

//Aern
