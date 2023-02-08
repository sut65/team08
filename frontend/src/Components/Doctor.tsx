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
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowParams,
  GridEventListener,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
// import { dateFormatter } from "date"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PrefixsInterface } from "../Models/IPrefix";
import { GendersInterface } from "../Models/IGender";
import { PatientsInterface } from "../Models/IPatient";

import { DocPrefixInterface } from "../Models/IDocPrefix";
import { BloodInterface } from "../Models/IBlood";
import { MaritalInterface } from "../Models/IMarital";
import { ReligionInterface } from "../Models/IReligion";
import { NationalityInterface } from "../Models/INationality";
import { AddressThailandInterface } from "../Models/IAddressThailand";
import { EducationsInterface } from "../Models/IEducation";
import { DoctorInterface } from "../Models/IDoctor";

import {
  GetGender,
  GetPrefix,
  GetDocPrefix,
  CreatePatient,
  GetEducation,
  GetScreening_officer,
  //CreateScreening_officer,
  GetPatient,
  GetBlood,
  GetMarital,
  GetReligion,
  GetNationality,
  GetAddressThailand,
  GetDoctor,
  CreateDoctor,
  GetOfficerByUID,
} from "../Services/HttpClientService";
import { OfficersInterface } from "../Models/IOfficer";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Doctor() {
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", },
  };

  const [Patients, setPatients] = useState<PatientsInterface>({});
  const [Genders, setGenders] = useState<GendersInterface[]>([]);
  const [Prefixs, setPrefixs] = useState<PrefixsInterface[]>([]);
  const [DocPrefix, setDocPrefix] = useState<DocPrefixInterface[]>([]);

  const [Blood, setBlood] = useState<BloodInterface[]>([]);
  const [Marital, setMarital] = useState<MaritalInterface[]>([]);
  const [Religion, setReligion] = useState<ReligionInterface[]>([]);
  const [Nationality, setNationality] = useState<NationalityInterface[]>([]);
  const [AddressThailand, setAddressThailand] = useState<
    AddressThailandInterface[]
  >([]);
  const [FindAddress, setFindAddress] = useState<
    Partial<AddressThailandInterface>
  >({});
  const [Address, setAddress] = useState<AddressThailandInterface[]>([]);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isAddress, setIsAddress] = useState(true);
  const [isDisabledPrefix, setIsDisabledPrefix] = useState(false);
  const [Educations, setEducations] = useState<EducationsInterface[]>([]);

  const [Doctor, setDoctor] = useState<Partial<DoctorInterface>>({});

  const [DoctorA, setDoctorA] = useState<DoctorInterface[]>([]);

  const [DocterCode, setDocterCode] = useState<string>("");
  const [DocterIDCar, setDocterIDCar] = useState<string>("");
  const [FirstNameTH, setFirstNameTH] = useState<string>("");
  const [LastNameTH, setLastNameTH] = useState<string>("");
  const [FirstNameEN, setFirstNameEN] = useState<string>("");
  const [LastNameEN, setLastNameEN] = useState<string>("");

  const [TelPhone, setTelPhone] = useState<string>("");
  const [ReOther, setReOther] = useState<string>("");
  const [TelOffice, setTelOffice] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [AllAddress, setAllAddress] = useState<string>("");

  const [Subdistrict, setSubdistrict] = useState<string>("");
  const [District, setDistrict] = useState<string>("");
  const [Province, setProvince] = useState<string>("");
  const [Zip, setZip] = useState<string>("");

  const [FaIDCard, setFaIDCard] = useState<string>("");

  const [FaFirstName, setFaFirstName] = useState<string>("");
  const [FaLastName, setFaLastName] = useState<string>("");
  const [FaOccupation, setFaOccupation] = useState<string>("");
  const [MoIDCard, setMoIDCard] = useState<string>("");

  const [MoFirstName, setMoFirstName] = useState<string>("");
  const [MoLastName, setMoLastName] = useState<string>("");
  const [MoOccupation, setMoOccupation] = useState<string>("");
  const [WiIDCard, setWiIDCard] = useState<string>("");

  const [WiFirstName, setWiFirstName] = useState<string>("");
  const [WiLastName, setWiLastName] = useState<string>("");
  const [WiOccupation, setWiOccupation] = useState<string>("");
  const [WiPhone, setWiPhone] = useState<string>("");

  const [EducationName, setEducationName] = useState<string>("");
  const [EducationMajor, setEducationMajor] = useState<string>("");
  const [University, setUniversity] = useState<string>("");
  const [DocPassword, setDocPassword] = useState<string>("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  // const [valueDate, setValueDate] = React.useState<Dayjs | Date | null>(
  //   dayjs("2000-01-01T21:11:54")
  // );

  const [DoctorID, setDoctorID] = React.useState(0);
  const [openDelete, setOpendelete] = React.useState(false);
  const [openUpdate, setOpenupdate] = React.useState(false);

  const [startEDU, setStartEDU] = useState(new Date());
  const [endEDU, setEndEDU] = useState(new Date());
  const [message, setAlertMessage] = React.useState("");
  const [officers, setOfficers] = useState<OfficersInterface[]>([]);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setDoctorID(Number(params.row.ID));
    localStorage.setItem("DoctorID", params.row.ID);
  };

  const Delete_Doctor = async () => {
    const apiUrl = `http://localhost:8080/Doctor/${DoctorID}`;
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
    getDoctor();
  };

  ///
  const handleClickAnyRegion = () => {
    console.log(Doctor.ReligionID);
    setIsDisabled(false);
  };

  const getDocCode = async () => {
    let new_Date: Date = new Date();
    let result: string = new_Date.toLocaleString();

    fetch(`${apiUrl}/Doctors`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        // console.log(result[6]);
        // console.log(result[7]);
        let num: number = +(result[6] + result[7]) * 1000 + res.data.length + 1;
        let docid: string = "D" + num.toString();
        // console.log("The date is: " + docid);
        setDocterCode(docid);
      });
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
    const name = event.target.name as keyof typeof Patients;
    const value = event.target.value;
    setPatients({
      ...Patients,
      [name]: value,
    });
    // console.log(`${name}: ${value}`);
  };
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof FindAddress;
    const { value } = event.target;

    setFindAddress({
      ...FindAddress,
      [id]: value,
    });
    // console.log(FindAddress);
    // console.log(id,"=", value); //แสดงค่าที่ป้อนเข้ามาในช่อง
  };
  const handleChangeDoctor = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Doctor;
    const value = event.target.value;
    setDoctor({
      ...Doctor,
      [name]: value,
    });
  };
  const handleChangeSubdistrict = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Doctor;
    const value = event.target.value;
    setDoctor({
      ...Doctor,
      [name]: value,
    });
  };
  const handleChangeReligion = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Doctor;
    const value = event.target.value;
    setDoctor({
      ...Doctor,
      [name]: value,
    });

    // console.log(Doctor.ReligionID)
    if (event.target.value === "5") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const handleChangeMarital = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Doctor;
    const value = event.target.value;
    setDoctor({
      ...Doctor,
      [name]: value,
    });

    // console.log(Doctor.ReligionID)
    if (event.target.value === "0") {
      setIsDisabledPrefix(true);
    } else if (event.target.value === "1") {
      setIsDisabledPrefix(true);
    } else if (event.target.value === "4") {
      setIsDisabledPrefix(true);
    } else {
      setIsDisabledPrefix(false);
    }
  };
  // const handleChangeDate = (newValue: Dayjs | null) => {
  //   setValueDate(newValue);
  // };
  const getGender = async () => {
    let res = await GetGender();
    if (res) {
      setGenders(res);
      // console.log(res);
    }
  };
  const getDocPrefix = async () => {
    let res = await GetDocPrefix();
    if (res) {
      setDocPrefix(res);
      // console.log(res);
    }
  };
  const getPrefix = async () => {
    let res = await GetPrefix();
    if (res) {
      setPrefixs(res);
      // console.log(res);
    }
  };
  const getBlood = async () => {
    let res = await GetBlood();
    if (res) {
      setBlood(res);
      // console.log(res);
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
  const getOfficersID = async () => {
    let res = await GetOfficerByUID();
    Doctor.OfficerID = res.ID;
    console.log(Doctor.OfficerID);
    if (res) {
        setOfficers(res);
    }
  };

  const getMarital = async () => {
    let res = await GetMarital();
    if (res) {
      setMarital(res);
      // console.log(res);
    }
  };
  const getReligion = async () => {
    let res = await GetReligion();
    if (res) {
      setReligion(res);
      // console.log(res);
    }
  };
  const getNationality = async () => {
    let res = await GetNationality();
    if (res) {
      setNationality(res);
      // // console.log("OkkkOkkkOkkkk");
      // // console.log(res);
    }
  };
  const getAddressThailand = async () => {
    let res = await GetAddressThailand();
    if (res) {
      setAddressThailand(res);
      // console.log(res);
    }
  };
  const getEducations = async () => {
    let res = await GetEducation();
    if (res) {
      setEducations(res);
      // console.log(res);
    }
  };

  const handleClickOpen = () => {
    // setOpen(true);
    setOpenD(true);
  };
  const touchPage = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    getDoctor();
    getBlood();
    getMarital();
    getReligion();
    getNationality();
    getAddressThailand();
    getGender();
    getPrefix();
    getDocPrefix();
    getEducations();
    setIsDisabled(!isDisabled);
    getDocCode();
    setIsDisabledPrefix(true);
    getOfficersID();

  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const convertTypePrefix = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    if (typeof val === "undefined") {
      return 99;
    } else if (val > 0) {
      return val;
    } else {
      return 99;
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
      field: "DocterCode",
      headerName: "รหัสประจำตัว",
      width: 100,
    },
    {
      field: "DocterIDCard",
      headerName: "หมายเลขบัตรประชาชน",
      width: 130,
    },
    {
      field: "DocPrefix",
      headerName: "คำนำหน้า",
      width: 80,
      valueFormatter: (params) => params.value.PreInitialTH,
    },
    {
      field: "FirstNameTH",
      headerName: "ชื่อจริง",
      width: 100,
    },
    {
      field: "LastNameTH",
      headerName: "นามสกุล",
      width: 100,
    },
    {
      field: "FirstNameEN",
      headerName: "FirstName",
      width: 150,
    },
    {
      field: "LastNameEN",
      headerName: "LastName",
      width: 150,
    },
    {
      field: "Gender",
      headerName: "เพศ",
      width: 150,
      valueFormatter: (params) => params.value.Description,
    },
    {
      field: "Blood",
      headerName: "หมู่โลหิต",
      width: 150,
      valueFormatter: (params) => params.value.Phenotype,
    },
    {
      field: "Marital",
      headerName: "สถานภาพ",
      width: 150,
      valueFormatter: (params) => params.value.MaritalStatus,
    },
    {
      field: "Birthday",
      headerName: "วันเดือนปีเกิด",
      type: "date",
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "Religion",
      headerName: "ศาสนา",
      width: 150,
      valueFormatter: (params) => params.value.ReligionType,
    },
    {
      field: "ReOther",
      headerName: "อื่นๆ",
      width: 150,
    },
    {
      field: "Nationality",
      headerName: "สัญชาติ",
      width: 150,
      valueFormatter: (params) => params.value.NationalityType,
    },
    {
      field: "Country",
      headerName: "เชื้อชาติ",
      width: 150,
      valueFormatter: (params) => params.value.NationalityType,
    },
    {
      field: "TelPhone",
      headerName: "โทรศัพท์",
      width: 150,
    },
    {
      field: "TelOffice",
      headerName: "โทรสาร",
      width: 150,
    },
    {
      field: "Email",
      headerName: "อีเมล์",
      width: 150,
    },
    {
      field: "AllAddress",
      headerName: "ที่อยู่",
      width: 150,
    },
    {
      field: "Subdistrict",
      headerName: "ตำบล",
      width: 150,
    },
    {
      field: "District",
      headerName: "อำเภอ",
      width: 150,
    },
    {
      field: "Province",
      headerName: "จังหวัด",
      width: 150,
    },
    {
      field: "Address",
      headerName: "รหัสไปรษณีย์",
      width: 150,
      valueFormatter: (params) => params.value.Zipcode,
    },
    {
      field: "FaIDCard",
      headerName: "หมายเลขบัตรประชาชน",
      width: 150,
    },
    {
      field: "DocFaPrefix",
      headerName: "คำนำหน้าชื่อ",
      width: 150,
      valueFormatter: (params) => params.value.PreInitialTH,
    },
    {
      field: "FaFirstName",
      headerName: "ชื่อจริง",
      width: 150,
    },
    {
      field: "FaLastName",
      headerName: "นามสกุล",
      width: 150,
    },
    {
      field: "FaOccupation",
      headerName: "อาชีพ",
      width: 150,
    },
    {
      field: "MoIDCard",
      headerName: "หมายเลขบัตรประชาชน",
      width: 150,
    },
    {
      field: "DocMoPrefix",
      headerName: "คำนำหน้าชื่อ",
      width: 150,
      valueFormatter: (params) => params.value.PreInitialTH,
    },
    {
      field: "MoFirstName",
      headerName: "ชื่อจริง",
      width: 150,
    },
    {
      field: "MoLastName",
      headerName: "นามสกุล",
      width: 150,
    },
    {
      field: "MoOccupation",
      headerName: "อาชีพ",
      width: 150,
    },
    {
      field: "WiIDCard",
      headerName: "หมายเลขบัตรประชาชน",
      width: 150,
    },
    {
      field: "DocWiPrefix",
      headerName: "คำนำหน้าชื่อ",
      width: 150,
      valueFormatter: (params) => params.value.PreInitialTH,
    },
    {
      field: "WiFirstName",
      headerName: "ชื่อจริง",
      width: 150,
    },
    {
      field: "WiLastName",
      headerName: "นามสกุล",
      width: 150,
    },
    {
      field: "WiOccupation",
      headerName: "อาชีพ",
      width: 150,
    },
    {
      field: "WiPhone",
      headerName: "โทรศัพท์",
      width: 150,
    },
    {
      field: "Education",
      headerName: "ระดับการศึกษา",
      width: 150,
      valueFormatter: (params) => params.value.Description,
    },
    {
      field: "EducationName",
      headerName: "ชื่อปริญญา",
      width: 150,
    },
    {
      field: "EducationMajor",
      headerName: "สาขาวิชาเอก",
      width: 150,
    },
    {
      field: "University",
      headerName: "สถานศึกษา",
      width: 150,
    },
    {
      field: "StartEducation",
      headerName: "ปีที่เข้าการศึกษา",
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("YYYY"),
    },
    {
      field: "EndEducation",
      headerName: "ปีที่จบการศึกษา",
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("YYYY"),
    },
  ];

  async function shearch() {
    let check: string = "" + FindAddress.ID;
    let idcheck = +check;

    fetch(`${apiUrl}/ZipAddressThailand/${FindAddress.ID}`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAddress(res.data);
          setDistrict(res.data[0].District);
          setSubdistrict(res.data[0].Subdistrict);
          setProvince(res.data[0].Province);
          setIsAddress(false);
        } else {
        }
      });
  }

  async function submit() {
    // console.log(Zip);

    let data = {
      DocterCode: DocterCode,
      DocterIDCard: DocterIDCar,
      DocPrefixID: convertType(Doctor.DocPrefixID),
      FirstNameTH: FirstNameTH,

      LastNameTH: LastNameTH,
      FirstNameEN: FirstNameEN,
      LastNameEN: LastNameEN,
      GenderID: convertType(Doctor.GenderID),

      BloodID: convertType(Doctor.BloodID),
      MaritalID: convertType(Doctor.MaritalID),
      ReligionID: convertType(Doctor.ReligionID),
      ReOther: ReOther,

      NationalityID: convertType(Doctor.NationalityID),
      CountryID: convertType(Doctor.CountryID),
      TelPhone: TelPhone,
      TelOffice: TelOffice,

      Email: Email,
      AllAddress: AllAddress,
      Subdistrict: Subdistrict,
      District: District,

      Province: Province,
      AddressID: convertType(Zip),
      FaIDCard: FaIDCard,
      DocFaPrefixID: convertType(Doctor.DocFaPrefixID),

      FaFirstName: FaFirstName,
      FaLastName: FaLastName,
      FaOccupation: FaOccupation,
      MoIDCard: MoIDCard,

      DocMoPrefixID: convertType(Doctor.DocMoPrefixID),
      MoFirstName: MoFirstName,
      MoLastName: MoLastName,
      MoOccupation: MoOccupation,

      WiIDCard: WiIDCard,
      DocWiPrefixID: convertTypePrefix(Doctor.DocWiPrefixID),
      WiFirstName: WiFirstName,
      WiLastName: WiLastName,

      WiOccupation: WiOccupation,
      WiPhone: WiPhone,
      EducationID: convertType(Doctor.EducationID),
      EducationName: EducationName,

      EducationMajor: EducationMajor,
      University: University,
      Birthday: Doctor.Birthday,
      StartEducation: Doctor.StartEducation,
      EndEducation: Doctor.EndEducation,

      OfficerID: convertType(Doctor.OfficerID),
    };
    console.log("เมื่อกด submit ก็จะขึ้น data ดังนี้");
    console.log(data);

    let res = await CreateDoctor(data);
    // console.log(res);
    // console.log(res.error);
    // console.log(res.data);

    if (res.error) {
      setError(true);
      setAlertMessage(res.error);
      console.log("เข้าเงื่อนไข res.error");
    } else {
      setSuccess(true);
      getDocCode();
      console.log("ไม่มี res.error");
      getDoctor();
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
                onClick={Delete_Doctor}
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
          id="success"
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
          id="error"
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            {/* {message} */}
            {message}
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
            <Grid item xs={12} md={5} sm={12}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="LocationReservationID"
                  type="search"
                  label="ป้อนรหัสประจำตัวของแพทย์ หรือเลขบัตรประชาชน"
                  variant="outlined"
                  size="small"
                  // value={FindAddress.ID}
                  // onChange={handleInputChange}
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
            <Grid item xs={12} md={1.3} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<SearchIcon />}
              >
                Find
              </Button>
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<AddIcon />}
              >
                Add New
              </Button>
              <Dialog
                open={openD}
                // onClose={touchPage(false)}
                fullWidth
                maxWidth="md"
              >
                <DialogTitle>เพิ่มข้อมูลของแพทย์</DialogTitle>
                <DialogContent>
                  {/* <ส่วนที่1 ข้อมูลส่วนตัว/> */}
                  <DialogTitle>ข้อมูลส่วนตัว</DialogTitle>
                  <Grid container spacing={2} sx={{ padding: 4 }}>
                    {/* <คำนำหน้า ชื่อจริงสกุล/> */}
                    <Grid item xs={2}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.DocPrefixID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "DocPrefixID",
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
                        id="FirstNameTH"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setFirstNameTH(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="นามสกุล"
                        fullWidth
                        id="LastNameTH"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setLastNameTH(event.target.value)}
                      />
                    </Grid>

                    {/* <ชื่อสกุลอิ้ง วันเกิด/> */}
                    <Grid item xs={4.5}>
                      <TextField
                        label="First Name"
                        fullWidth
                        id="FirstNameEN"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setFirstNameEN(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4.5}>
                      <TextField
                        label="Last Name"
                        fullWidth
                        id="LastNameEN"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setLastNameEN(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="เลือกวันเกิด"
                          inputFormat="MM/DD/YYYY"
                          value={Doctor.Birthday}
                          onChange={(e) => {
                            setDoctor({
                              ...Doctor,
                              Birthday: e,
                            });
                          }}
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
                          value={Doctor.GenderID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "GenderID",
                          }}
                        >
                          <option aria-label="None" value="">
                            เพศ
                          </option>
                          {Genders.map((item: GendersInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.Description}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.BloodID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "BloodID",
                          }}
                        >
                          <option aria-label="None" value="">
                            หมู่โลหิต
                          </option>
                          {Blood.map((item: BloodInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.Phenotype}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2.5}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.MaritalID + ""}
                          onChange={handleChangeMarital}
                          inputProps={{
                            name: "MaritalID",
                          }}
                        >
                          <option aria-label="None" value="">
                            สถานภาพ
                          </option>
                          {Marital.map((item: MaritalInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.MaritalStatus}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2.5}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.ReligionID + ""}
                          onChange={handleChangeReligion}
                          inputProps={{
                            name: "ReligionID",
                          }}
                        >
                          <option aria-label="None" value="">
                            ศาสนา
                          </option>
                          {Religion.map((item: ReligionInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.ReligionType}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        label="โปรดระบุฯ "
                        disabled={isDisabled}
                        fullWidth
                        id="ddaa"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setReOther(event.target.value)}
                      />
                    </Grid>

                    {/* <สัญชาติ เชื้อชาติ รหัส หมายเลขบัตร/> */}
                    <Grid item xs={2.2}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.NationalityID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "NationalityID",
                          }}
                        >
                          <option aria-label="None" value="">
                            สัญชาติ
                          </option>
                          {Nationality.map((item: NationalityInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.NationalityType}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2.2}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.CountryID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "CountryID",
                          }}
                        >
                          <option aria-label="None" value="">
                            เชื้อชาติ
                          </option>
                          {Nationality.map((item: NationalityInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.NationalityType}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2.6}>
                      <TextField
                        disabled
                        label="รหัสประจำตัวแพทย์"
                        fullWidth
                        id="DocterCode"
                        type="string"
                        variant="outlined"
                        size="small"
                        defaultValue={DocterCode}
                        onChange={(event) => setDocterCode(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="หมายเลขบัตรประชาชน"
                        fullWidth
                        id="DocterIDCar"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setDocterIDCar(event.target.value)}
                      />
                    </Grid>
                  </Grid>

                  {/* <ส่วนที่2 ข้อมูลการติดต่อ/> */}
                  <DialogTitle>ข้อมูลการติดต่อ</DialogTitle>
                  <Grid container spacing={2} sx={{ padding: 4 }}>
                    {/* <ค้นหารหัสไปรษณีย์/> */}
                    <Grid item xs={4}>
                      <TextField
                        // value={Doctor.GenderID + ""}
                        fullWidth
                        id="ID"
                        type="search"
                        label="ป้อนรหัสไปรษณีย์"
                        variant="outlined"
                        size="small"
                        value={FindAddress.ID}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={1.3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={shearch}
                        // onClick={handleClickAnyRegion}
                        startIcon={<SearchIcon />}
                      >
                        Find
                      </Button>
                    </Grid>
                    <Grid item xs={6.7}>
                      <TextField
                        label="อีเมล์"
                        fullWidth
                        id="Email"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Grid>

                    {/* <ที่อยู่ ตำบล อำเภอ/> */}
                    <Grid item xs={6}>
                      <TextField
                        disabled={isAddress}
                        label="ที่อยู่"
                        fullWidth
                        id="AllAddress"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setAllAddress(event.target.value)}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.Subdistrict + ""}
                          // onChange={handleChangeSubdistrict}
                          onChange={(e: SelectChangeEvent) => {
                            handleChangeSubdistrict(e);
                            setZip(e.target.value);
                          }}
                          inputProps={{
                            name: "Subdistrict",
                          }}
                        >
                          <option aria-label="None" value="">
                            ตำบล
                          </option>
                          {Address.map((item: AddressThailandInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.Subdistrict}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        disabled
                        label="อำเภอ"
                        fullWidth
                        id="District"
                        type="string"
                        variant="outlined"
                        size="small"
                        value={District}
                        onChange={(event) => setDistrict(event.target.value)}
                      />
                    </Grid>

                    {/* <จังหวัด เบอร์ โทรสาร/> */}
                    <Grid item xs={5}>
                      <TextField
                        disabled
                        label="จังหวัด"
                        fullWidth
                        id="Province"
                        type="string"
                        variant="outlined"
                        size="small"
                        value={Province}
                        onChange={(event) => setProvince(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3.5}>
                      <TextField
                        label="เบอร์โทรศัพท์"
                        fullWidth
                        id="TelPhone"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setTelPhone(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3.5}>
                      <TextField
                        label="โทรสาร"
                        fullWidth
                        id="TelOffice"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setTelOffice(event.target.value)}
                      />
                    </Grid>
                  </Grid>

                  {/* <ส่วนที่2 ข้อมูลบิดา/> */}
                  <DialogTitle>ข้อมูลบิดา</DialogTitle>
                  <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid item xs={2}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.DocFaPrefixID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "DocFaPrefixID",
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
                        id="FaFirstName"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setFaFirstName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="นามสกุล"
                        fullWidth
                        id="FaLastName"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setFaLastName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="อาชีพ"
                        fullWidth
                        id="FaOccupation"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) =>
                          setFaOccupation(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="เลขบัตรประชาชน"
                        fullWidth
                        id="FaIDCard"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setFaIDCard(event.target.value)}
                      />
                    </Grid>
                  </Grid>

                  {/* <ส่วนที่4 ข้อมูลมารดาดา/> */}
                  <DialogTitle>ข้อมูลมารดา</DialogTitle>
                  <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid item xs={2}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.DocMoPrefixID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "DocMoPrefixID",
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
                        id="MoFirstName"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setMoFirstName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="นามสกุล"
                        fullWidth
                        id="MoLastName"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setMoLastName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="อาชีพ"
                        fullWidth
                        id="MoOccupation"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) =>
                          setMoOccupation(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="เลขบัตรประชาชน"
                        fullWidth
                        id="MoIDCard"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setMoIDCard(event.target.value)}
                      />
                    </Grid>
                  </Grid>

                  {/* <ส่วนที่5 ข้อมูลคู่สมรส/> */}
                  <DialogTitle>ข้อมูลคู่สมรส</DialogTitle>
                  <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid item xs={2}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          disabled={isDisabledPrefix}
                          value={Doctor.DocWiPrefixID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "DocWiPrefixID",
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
                        disabled={isDisabledPrefix}
                        id="WiFirstName"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setWiFirstName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="นามสกุล"
                        fullWidth
                        disabled={isDisabledPrefix}
                        id="WiLastName"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setWiLastName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="อาชีพ"
                        fullWidth
                        disabled={isDisabledPrefix}
                        id="WiOccupation"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) =>
                          setWiOccupation(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="เลขบัตรประชาชน"
                        fullWidth
                        disabled={isDisabledPrefix}
                        id="WiIDCard"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setWiIDCard(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="เบอร์โทร"
                        fullWidth
                        disabled={isDisabledPrefix}
                        id="WiPhone"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setWiPhone(event.target.value)}
                      />
                    </Grid>
                  </Grid>

                  {/* <ส่วนที่6 ประวัติการศึกษา/> */}
                  <DialogTitle>ประวัติการศึกษา</DialogTitle>
                  <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid item xs={4}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.EducationID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "EducationID",
                          }}
                        >
                          <option aria-label="None" value="">
                            ระดับการศึกษาสูงสุด
                          </option>
                          {Educations.map((item: EducationsInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.Description}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        label="ชื่อปริญา"
                        fullWidth
                        id="EducationName"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) =>
                          setEducationName(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="สาขาวิชาเอก"
                        fullWidth
                        id="EducationMajor"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) =>
                          setEducationMajor(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        label="สถานศึกษา"
                        fullWidth
                        id="University"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setUniversity(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          label="ปีที่เข้ารับการศึกษา"
                          value={Doctor.StartEducation}
                          onChange={(e) => {
                            setDoctor({
                              ...Doctor,
                              StartEducation: e,
                            });
                          }}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          label="ปีที่จบการศึกษา"
                          value={Doctor.EndEducation}
                          onChange={(e) => {
                            setDoctor({
                              ...Doctor,
                              EndEducation: e,
                            });
                          }}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseD}>ยกเลิก</Button>
                  <Button onClick={submit}>บันทึกข้อมูล</Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item xs={12} md={2.7} sm={12}></Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{ marginX: 0.5, marginY: 0, padding: 2 }}
          >
            <div style={{ height: 300, width: "98.5%" }}>
              <p>โชว์ข้อมูลแพทย์ทั้งหมด</p>
              <DataGrid
                rows={DoctorA}
                getRowId={(row) => row.ID}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onRowClick={handleRowClick}
              />
            </div>
          </Grid>
          <Grid container spacing={1} sx={{ marginY: 4, padding: 2 }}></Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default Doctor;
