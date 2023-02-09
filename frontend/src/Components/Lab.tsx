import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowParams,
  GridEventListener,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Checkbox from "@mui/material/Checkbox";
import { pink, green } from "@mui/material/colors";

import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PatientsInterface } from "../Models/IPatient";

import { EducationsInterface } from "../Models/IEducation";
import { DoctorInterface } from "../Models/IDoctor";
import { TreatmentsInterface } from "../Models/ITreatment";

import { LabNameInterface } from "../Models/ILabName";
import { LabInterface } from "../Models/ILab";

import {
  GetDoctor,
  GetShow,
  CreateDoctor,
  ListLabName,
  ListLab,
  CreateLab,
  GetDoctorByUID,
} from "../Services/HttpClientService";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Lab() {
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const [Patiends, setPatiends] = useState<PatientsInterface>({});
  // const [Policings, setPolicings] = useState<PolicingsInterface[]>([]);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);

  const [ValueInput, setValueInput] = useState<string>("");
  const [isDisabledPrefix, setIsDisabledPrefix] = useState(false);
  const [Educations, setEducations] = useState<EducationsInterface[]>([]);
  const [Doctor, setDoctor] = useState<Partial<DoctorInterface>>({});
  const [Lab, setLab] = useState<Partial<LabInterface>>({});

  const [DoctorA, setDoctorA] = useState<DoctorInterface[]>([]);

  const [Show, setShow] = useState<TreatmentsInterface[]>([]);
  const [ShowLab, setShowLab] = useState<TreatmentsInterface[]>([]);
  const [LabName, setLabName] = useState<LabNameInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);

  const [LabID, setLabID] = React.useState(0);
  const [openDelete, setOpendelete] = React.useState(false);
  const [openUpdate, setOpenupdate] = React.useState(false);


  const [valueDate, setValueDate] = React.useState<Dayjs | null>(
    dayjs("2000-01-01T21:11:54")
  );
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setLabID(Number(params.row.ID));
    localStorage.setItem("LabID", params.row.ID);
  };

  const Delete_Lab = async () => {
    const apiUrl = `http://localhost:8080/Lab/${LabID}`;
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
          console.log(res);
          console.log(res.data);
          // console.log("delete ID: " + DispenseID);
        } else {
          console.log("NO DATA");
        }
      });

    handleCloseRow();
    getShowLab();
  };

  const handleClickAnyRegion = () => {
    console.log(Doctor.ReligionID);
    setIsDisabled(false);
  };

  const handleCloseRow = () => {
    setOpendelete(false);
    setOpenupdate(false);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
    setOpen(false);
  };
  const handleCloseD = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenD(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Patiends;
    const value = event.target.value;
    setPatiends({
      ...Patiends,
      [name]: value,
    });
    // console.log(`${name}: ${value}`);
  };

  const handleChangeLabName = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Lab;
    const value = event.target.value;
    setLab({
      ...Lab,
      [name]: value,
    });
  };

  const handleChangeBox = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Lab;
    const value = event.target.value;
    
    //ถ้าติ๊กถูก Posi ให้ทำ if
    if(isDisabled){
      setIsDisabled(false);
      setLab({
        ...Lab,
        [name]: "",
      });
    }
    //ถ้าไม่มีติ๊กถูก Posi
    else{
      //ให้ติ๊ก
      setIsDisabled(true);
      setLab({
        ...Lab,
        [name]: "Positive",
      });
      setIsDisabled2(false);
    }
  };

  const handleChangeBox2 = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Lab;
    const value = event.target.value;

    //ถ้าติ๊กถูก Nege ให้ทำ if
    if(isDisabled2){
      setIsDisabled2(false);
      setLab({
        ...Lab,
        [name]: "",
      });
      
    }
    //ถ้าไม่มีติ๊กถูก Nege
    else{
      //ให้ติ๊ก
      setIsDisabled2(true);
      setLab({
        ...Lab,
        [name]: "Negetive",
      });
      setIsDisabled(false);
    }
  };

  const getDoctor = async () => {
    let res = await GetDoctor();
    if (res) {
      setDoctor(res);
      setDoctorA(res);
      // console.log("set Doctor & DoctorA");
      // console.log(res);
    }
  };
  const getShow = async () => {
    let res = await GetShow();
    if (res) {
      // setDoctor(res);
      setShow(res);
      // console.log("set Doctor & DoctorA");
      // console.log(res);
    }
  };

  const getShowLab = async () => {
    let res = await ListLab();
    if (res) {
      // setDoctor(res);
      setShowLab(res);
      // console.log(res, " -> set await ListLab()");
      // console.log(res);
    }
  };

  const getLabName = async () => {
    let res = await ListLabName();
    if (res) {
      // setDoctor(res);
      setLabName(res);
      // console.log(res, " -> set await ListLabName()");
      // console.log(res);
    }
  };

  const handleClickOpen = () => {
    // setOpen(true);
    setOpenD(true);
  };


  useEffect(() => {
    getDoctor();
    getShow();

    getShowLab();
    getLabName();
    GetDoctorByUID();
    fetchDoctorID();

    setIsDisabled(false);
    setIsDisabled2(false);
  }, []);

  const fetchDoctorID = async () => {
    let res = await GetDoctorByUID();
    Lab.DoctorID = res.ID;
    if (res) {
        setLab({
          ...Lab,
          ["Med_EmployeeID"]: res.ID,
        });
    }
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const convertTypeFloat = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseFloat(data) : data;
    return val;
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ไอดี", width: 50 },
    {
      field: "TREATMENT_ID",
      headerName: "เลขกำกับการรักษา",
      width: 100,
    },
    {
      field: "PatiendID",
      headerName: "หมายเลขผู้ป่วย",
      width: 120,
    },
    {
      field: "Doctor",
      headerName: "แพทย์ผู้สั่งแลป",
      width: 150,
      valueFormatter: (params) => params.value.FirstNameTH,
    },
    {
      field: "Status",
      headerName: "สถานะการรักษา",
      width: 120,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "CreatedAt",
      headerName: "วันที่และเวลา",
      width: 200,
      valueFormatter: (params) => dayjs(params.value).format("H:mm | DD/MM/YY"),
    },
  ];

  const columnsLab: GridColDef[] = [
    { field: "ID", headerName: "ไอดี", width: 50 },
    {
      field: "UPDATE",
      headerName: "แก้ไข",
      width: 100,
      renderCell: () => {
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
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
            size="small"
            onClick={() => setOpendelete(true)}
          >
            Delete
          </Button>
        );
      },
    },
    {
      field: "CreatedAt",
      headerName: "วันที่และเวลา",
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("H:mm | DD/MM/YY"),
    },
    {
      field: "Lab_Name",
      headerName: "ใบแลป",
      width: 120,
      valueFormatter: (params) => params.value.Discription,
    },
    {
      field: "Lab_test",
      headerName: "ค่าที่รายงาน",
      width: 120,
    },
    {
      field: "Value",
      headerName: "หน่วย",
      width: 80,
    },
    {
      field: "Treatment",
      headerName: "เลขกำกับการรักษา",
      width: 150,
      valueFormatter: (params) => params.value.TREATMENT_ID,
    },
    {
      field: "Doctor",
      headerName: "แพทย์ผู้สั่งแลป",
      width: 120,
      valueFormatter: (params) => params.value.FirstNameTH,
    },
    {
      field: "Med_Employee",
      headerName: "ผู้รายงานผลแลป",
      width: 120,
      valueFormatter: (params) => params.value.Name,
    },
  ];

  async function submit() {
    let data = {
      Lab_test: (Lab.Lab_test || ""),
      Value: convertTypeFloat(ValueInput),
      LabNameID: convertType(Lab.LabNameID),
      TreatmentID: convertType(Lab.TreatmentID),
      Med_EmployeeID: convertType(Lab.Med_EmployeeID),
      DoctorID: convertType(1),
    };

    console.log("เมื่อกดดดดดดด submit");
    console.log(data);

    let res = await CreateLab(data);
    // console.log(res);
    if (res.error) {
      setError(true);
      // setAlertMessage(res.error);
      console.log(res);
      console.log(res.error);
      console.log("เข้าเงื่อนไข res.error");
    } else {
      setSuccess(true);
      console.log("ไม่มี res.error");
      getShowLab();
      setOpenD(false);
    }
  }

  return (
    <div>
      {/* ยืนยันการลบ */}
      <Dialog
        open={openDelete}
        onClose={handleCloseRow}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <div className="good-font">ยืนยันการลบรายการ</div>
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{ padding: 2 }}>
            <Grid item xs={3}></Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={Delete_Lab}
              >
                <div className="good-font">ยืนยัน</div>
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseRow}
              >
                <div className="good-font">ยกเลิก</div>
              </Button>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* ยืนยันการแก้ไข */}
      <Dialog open={openUpdate} onClose={handleCloseRow}>
        <DialogTitle>
          <div className="good-font">ยืนยันการแก้ไขรายการ</div>
        </DialogTitle>
        <Button
          variant="contained"
          color="primary"
          //กด "ยืนยัน" ไปที่หน้าแก้ไข
          component={RouterLink}
          to="/EmployeeattemdanceINUpdate"
        >
          <div className="good-font">ยืนยัน</div>
        </Button>
      </Dialog>
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ส่งผลตรวจแลป
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid
          container
          spacing={1}
          sx={{ marginX: 0.5, marginY: 0, padding: 2 }}
        >
          <div style={{ height: 300, width: "98.5%" }}>
            <p>ข้อมูลการรักษาที่ยังรอผลตรวจแลป</p>
            <Grid item xs={12} md={5} sm={12}>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<AddIcon />}
              >
                ส่งข้อมูลผลแลป
              </Button>
              <Dialog
                open={openD}
                // onClose={touchPage(false)}
                fullWidth
                maxWidth="md"
              >
                <DialogContent>
                  <DialogTitle>สร้างข้อมูลผลแลปใหม่</DialogTitle>
                  <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Lab.TreatmentID + ""}
                          onChange={handleChangeLabName}
                          inputProps={{
                            name: "TreatmentID",
                          }}
                        >
                          <option aria-label="None" value="">
                            เลขกำกับการรักษา
                          </option>
                          {Show.map((item: TreatmentsInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.TREATMENT_ID}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Lab.LabNameID + ""}
                          onChange={handleChangeLabName}
                          inputProps={{
                            name: "LabNameID",
                          }}
                        >
                          <option aria-label="None" value="">
                            ประเภทแลป
                          </option>
                          {LabName.map((item: LabNameInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.Discription}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <br/>
                    <br/>
                    <br/>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <FormControlLabel
                          control={
                            <Checkbox
                              // disabled={isDisabled}
                              checked={isDisabled}
                              onChange={handleChangeBox}
                              name="Lab_test"
                              sx={{
                                color: green[600],
                                "&.Mui-checked": {
                                  color: green[400],
                                },
                              }}
                            />
                          }
                          label="Positive"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              // disabled={isDisabled2}
                              checked={isDisabled2}
                              onChange={handleChangeBox2}
                              name="Lab_test"
                              sx={{
                                color: pink[500],
                                "&.Mui-checked": {
                                  color: pink[300],
                                },
                              }}
                            />
                          }
                          label="Negetive"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="ค่าที่รายงาน"
                        fullWidth
                        id="ValueInput"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setValueInput(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseD}>ยกเลิก</Button>
                  <Button onClick={submit}>บันทึกข้อมูลผลแลป</Button>
                </DialogActions>
              </Dialog>
              <p></p>
            </Grid>
            <DataGrid
              rows={Show}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
            <br></br>
            <p>ผลแลปที่ทำการบันทึกแล้ว</p>
            <DataGrid
              rows={ShowLab}
              getRowId={(row) => row.ID}
              columns={columnsLab}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onRowClick={handleRowClick}
            />
          </div>
        </Grid>
        <Grid container spacing={1} sx={{ marginY: 58, padding: 2 }}></Grid>
      </Paper>
    </Container>
    </div>
  );
}

export default Lab;
