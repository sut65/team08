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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PrefixsInterface } from "../Models/IPrefix";
import { GendersInterface } from "../Models/IGender";
import { PolicingsInterface } from "../Models/IPolicing";
import { PatiendsInterface } from "../Models/IPatiend";

import { DocPrefixInterface } from "../Models/IDocPrefix";

import {
  GetPolicing,
  GetGender,
  GetPrefix,
  GetDocPrefix,
  CreatePatiend,
} from "../Services/HttpClientService";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Doctor() {
  const [Patiends, setPatiends] = useState<PatiendsInterface>({});
  const [Genders, setGenders] = useState<GendersInterface[]>([]);
  const [Prefixs, setPrefixs] = useState<PrefixsInterface[]>([]);
  const [Policings, setPolicings] = useState<PolicingsInterface[]>([]);

  const [DocPrefix, setDocPrefix] = useState<DocPrefixInterface[]>([]);

  const [Name, setNames] = useState<string>("");
  const [Age, setAges] = useState<string>("");
  const [Phone, setPhones] = useState<string>("");
  const [Address, setAddresses] = useState<string>("");
  const [ID_card, setID_cards] = useState<string>("");
  const [Date_of_birth, setDate_of_births] = useState<string>("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(
    dayjs("2000-01-01T21:11:54")
  );

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

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Patiends;
    const value = event.target.value;
    setPatiends({
      ...Patiends,
      [name]: value,
    });
    console.log(`${name}: ${value}`);
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    setValueDate(newValue);
  };

  const getGender = async () => {
    let res = await GetGender();
    if (res) {
      setGenders(res);
      console.log(res);
    }
  };
  const getDocPrefix = async () => {
    let res = await GetDocPrefix();
    if (res) {
      setDocPrefix(res);
      console.log(res);
    }
  };
  const getPrefix = async () => {
    let res = await GetPrefix();
    if (res) {
      setPrefixs(res);
      console.log(res);
    }
  };
  const getPolicing = async () => {
    let res = await GetPolicing();
    if (res) {
      setPolicings(res);
      console.log(res);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const touchPage = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    getGender();
    getPrefix();
    getPolicing();
    getDocPrefix();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      PrefixID: convertType(Patiends.PrefixID),
      GenderID: convertType(Patiends.GenderID),
      PolicingID: convertType(Patiends.PolicingID),
      Name: Name,
      Age: convertType(Age),
      Phone: Phone,
      ID_card: ID_card,
      Address: Address,
      Date_of_birth: Date_of_birth,
    };
    console.log(data);
    let res = await CreatePatiend(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
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
              ประวัติข้อมูลส่วนตัว
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={1} sx={{ padding: 2 }}>
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="LocationReservationID"
                type="search"
                label="ป้อนรหัสประจำตัวของแพทย์ หรือเลขบัตรประชาชน"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1.3}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClickOpen}
              startIcon={<SearchIcon />}
            >Find</Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              startIcon={<AddIcon />}
            >
              Add New
            </Button>
            <Dialog
              open={open}
              // onClose={touchPage(false)}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>เพิ่มข้อมูลของแพทย์</DialogTitle>
              <DialogContent>
                {/* <ส่วนที่1 ข้อมูลส่วนตัว/> */}
                <DialogTitle>1. ข้อมูลส่วนตัว</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  {/* <คำนำหน้า ชื่อจริงสกุล/> */}
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          คำนำหน้า
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="ชื่อจริง"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="นามสกุล"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>

                  {/* <ชื่อสกุลอิ้ง วันเกิด/> */}
                  <Grid item xs={4.5}>
                    <TextField
                      label="First Name"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4.5}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="เลือกวันเกิด"
                        inputFormat="MM/DD/YYYY"
                        value={valueDate}
                        onChange={handleChangeDate}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  {/* <เพศ เลือด สถานภาพ ศาสนา อื่นๆ/> */}
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          เพศ
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          หมู่โลหิต
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.5}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          สถานภาพ
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.5}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          ศาสนา
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="อื่นๆ "
                      // disabled
                      fullWidth
                      id="ddaa"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>

                  {/* <สัญชาติ เชื้อชาติ รหัส หมายเลขบัตร/> */}
                  <Grid item xs={2.2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          สัญชาติ
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          เชื้อชาติ
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.6}>
                    <TextField
                      label="รหัสประจำตัวแพทย์"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="หมายเลขบัตรประชาชน"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่2 ข้อมูลการติดต่อ/> */}
                <DialogTitle>2. ข้อมูลการติดต่อ</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  {/* <ค้นหารหัสไปรษณีย์/> */}
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      id="LocationReservationID"
                      type="search"
                      label="ป้อนรหัสไปรษณีย์"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={1.3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleClickOpen}
                      startIcon={<SearchIcon />}
                    >Find</Button>
                  </Grid>
                  <Grid item xs={7}></Grid>

                  {/* <ที่อยู่ ตำบล อำเภอ/> */}
                  <Grid item xs={6}>
                    <TextField
                      label="ที่อยู่"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="ตำบล"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="อำเภอ"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>

                  {/* <จังหวัด เบอร์ โทรสาร/> */}
                  <Grid item xs={5}>
                    <TextField
                      label="จังหวัด"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="เบอร์โทรศัพท์"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="โทรสาร"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่2 ข้อมูลบิดา/> */}
                <DialogTitle>3. ข้อมูลบิดา</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          คำนำหน้า
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="ชื่อจริง"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="นามสกุล"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="อาชีพ"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="เลขบัตรประชาชน"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่4 ข้อมูลมารดาดา/> */}
                <DialogTitle>4. ข้อมูลมารดา</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          คำนำหน้า
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="ชื่อจริง"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="นามสกุล"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="อาชีพ"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="เลขบัตรประชาชน"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่5 ข้อมูลคู่สมรส/> */}
                <DialogTitle>5. ข้อมูลคู่สมรส</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          คำนำหน้า
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="ชื่อจริง"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="นามสกุล"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="อาชีพ"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="เลขบัตรประชาชน"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="เบอร์โทร"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่6 ประวัติการศึกษา/> */}
                <DialogTitle>6. ประวัติการศึกษา</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Patiends.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          ระดับการศึกษาสูงสุด
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      label="ชื่อปริญา"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="สาขาวิชาเอก"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      label="สถานศึกษา"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="ปีที่เข้ารับการศึกษา"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="ปีที่จบการศึกษา"
                      fullWidth
                      id="Name"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>ยกเลิก</Button>
                <Button onClick={handleClose}>บันทึกข้อมูล</Button>
              </DialogActions>
            </Dialog>
          </Grid>

          <Grid item xs={6}>
            <p>โชว์ข้อมูลแพทย์ทั้งหมด</p>
            <p>1.</p>
            <p>2.</p>
            <p>3.</p>
            <p>4.</p>
            <p>5.</p>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Doctor;
