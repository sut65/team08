//import React from "react";
import { PatientsInterface } from "../Models/IPatient";
import { Screening_officersInterface } from "../Models/IScreening_officer";
import { DoctorInterface } from "../Models/IDoctor";
import { LabInterface } from "../Models/ILab";
import { TreatmentsInterface } from "../Models/ITreatment";
import { Save_ITIsInterface } from "../Models/ISave_ITI";
import { Operating_RoomsInterface } from "../Models/IOperating_Room";
import { DispenseInterface } from "../Models/IDispense";
import { AppointInterface } from "../Models/IAppoint";
import { MedEmployeeInterface } from "../Models/IMedEmployee";
import { MedicalEquimentInterface } from "../Models/IMedEquipment";
import { RequestInterface } from "../Models/IRequest";
import { SigninInterface } from "../Models/ISignin";
import { OfficersInterface } from "../Models/IOfficer";
import { SigninMedInterface } from "../Models/ISigninMed";
import { SigninScreeningInterface } from "../Models/ISigninScreening";
import { SigninDoctorInterface } from "../Models/ISigninDoctor";

const apiUrl = "http://localhost:8080";


///////Doc
async function LoginDoctor(data: SigninDoctorInterface) {
  const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login_Doctor`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log("if (res.data)");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("uid", res.data.id);
              localStorage.setItem("role", "doctor");
              return res.data;
          } else {
              console.log("else จาก POST -> function LoginDoctor");
              return false;
          }
      });

  return res;
}
async function GetDoctorByUID() {
  const uid = localStorage.getItem("uid");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/Doctor/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              // console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
async function Doctor (data: DoctorInterface) {
  const requestOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Doctor`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
async function Create_Doctor(data: DoctorInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Doctor`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
/////Screening_officer
async function Screening_officer(data: Screening_officersInterface) {
  const requestOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Screening_officer/create`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });

  return res;
}
async function GetScrenByUID() {
  const uid = localStorage.getItem("uid");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/Screening_officer/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
/////////////////////////////////////////////////////////////GET BY UID
async function GetOfficerByUID() {
  let uid = localStorage.getItem("uid");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/officer/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
async function LoginByOfficer(data: SigninInterface) {
  const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("uid", res.data.id);
              localStorage.setItem("role", res.data.role);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
async function GetOfficers() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/officers`, requestOptions) 
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
////////////////Med
async function Med_Employee(data: MedEmployeeInterface) {
  const requestOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/medemployees/create`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });

  return res;
}


async function GetMedByUID() {
  const uid = localStorage.getItem("uid");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/medemployees/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
/// Med
/////////////////////////////////////////////////////// CREATE 
async function CreateOfficer(data: OfficersInterface) {
  const requestOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/officers/create`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });

  return res;
}


async function LoginMed_empolyee(data: SigninMedInterface) {
  const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login_s`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log("if (res.data)");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("uid", res.data.id);
              localStorage.setItem("role", "med_employee");
              return res.data;
          } else {
              console.log("else ");
              return false;
          }
      });

  return res;
}


async function LoginScreening_officer(data: SigninScreeningInterface) {
  const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login_screen`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log("if (res.data)");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("uid", res.data.id);
              localStorage.setItem("role", "screening_officer");
              return res.data;
          } else {
              console.log("else ");
              return false;
          }
      });

  return res;
}





async function GetGender() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Genders`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetPrefix() {
  const requestOptions = {
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Prefixs`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
          // console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetDocPrefix() {
    const requestOptions = {
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};
    let res = await fetch(`${apiUrl}/DocPrefixs`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
            // console.log(res.data);
            return res.data;
        } else {
            return false;
        }
    });
    return res;
}

async function GetBlood() {
    const requestOptions = {
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};
    let res = await fetch(`${apiUrl}/Bloods`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
            // console.log(res.data);
            return res.data;
        } else {
            return false;
        }
    });
    return res;
}

async function GetMarital() {
    const requestOptions = {
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};
    let res = await fetch(`${apiUrl}/Maritals`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
            // console.log(res.data);
            return res.data;
        } else {
            return false;
        }
    });
    return res;
}

async function GetReligion() {
    const requestOptions = {
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};
    let res = await fetch(`${apiUrl}/Religions`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
            // console.log(res.data);
            return res.data;
        } else {
            return false;
        }
    });
    return res;
}

async function GetNationality() {
    const requestOptions = {
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};
    let res = await fetch(`${apiUrl}/Nationalities`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
            // console.log(res.data);
            return res.data;
        } else {
            return false;
        }
    });
    return res;
}

async function GetAddressThailand() {
    const requestOptions = {
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};
    let res = await fetch(`${apiUrl}/AddressThailands`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
            // console.log(res.data);
            return res.data;
        } else {
            return false;
        }
    });
    return res;
}

async function GetEducation() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Educations`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetScreening_officer() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Screening_officers`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetPatient() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Patients`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetDoctor() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Doctors`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetShow() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/treatmentstatus`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // console.log(res.data);
        return res.data;
      } else {
        console.log("else");
        return false;
      }
    });

  return res;
}
async function ListLabName() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/LabNames`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // console.log(res.data," -> true function GetLabName()");
        return res.data;
      } else {
        console.log("else function GetLabName()");
        return false;
      }
    });

  return res;
}
async function ListLab() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Labs`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // console.log(res.data," -> true function GetLabName()");
        return res.data;
      } else {
        // console.log("else function GetLabName()");
        return false;
      }
    });

  return res;
}

async function CreatePatient(data: PatientsInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  console.log(requestOptions);

  let res = await fetch(`${apiUrl}/Patients`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function CreateDoctor(data: DoctorInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Doctor`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      // console.log(res.data);
      if (res.data) {
        console.log("เข้า fetch(`${apiUrl}/Doctor` แล้ววววววววว")
        console.log(res.data);
        return res;
      } else {
        console.log("ไม่เข้า fetch จาก function CreateDoctor")
        return res;
      }
    });

  return res;
}


async function CreateLab(data: LabInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Lab`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        console.log("เข้า fetch(`${apiUrl}/Lab` น้าาาา")
        console.log(res.data);
        return res;
      } else {
        console.log("ไม่เข้า fetch จาก function CreateLab")
        return res;
      }
    });

  return res;
}

//Gg
async function GetTreatment() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/treatments`, requestOptions) //////////
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function GetStatus() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/statuses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function GetTrack() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/tracks`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}


async function GetDisease() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/diseases`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function Treatment(data: TreatmentsInterface) {
  const requestOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/treatments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
            return { status: true, message: res.data };
          } else {
            return { status: false, message: res.error };
          }
      });

  return res;
}

// J

async function ListRoombyBuildings(bid: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Rooms/Building/${bid}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetBuilding() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/Buildings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
async function GetBuildingOne(id: any) {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/Building/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}


async function GetRoom() {
  const requestOptions = {
      method: "GET",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/Rooms`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function GetState() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/States`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function ListSave_ITIs() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/Save_ITIs`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function CreateSave_ITI(data: Save_ITIsInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Save_ITIs`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
          console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetOperating_Room() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/Operating_Rooms`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function CreateOperating_Room(data: Operating_RoomsInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Operating_Rooms`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
          console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListReady_Save() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/Save_ITIs/ready`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function GetReady_Save_ITI(id: any) {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/Save_ITI/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
//---------------------------------------------

// ทำให้คนไข้ภายในขึ้น นอนรักษาโรงพยาบาล

async function ListReady_Treat() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/treatments/ready`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function GetReady_Treat(id: any) {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };
// ****************
  let res = await fetch(`${apiUrl}/treatments/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
//เอิร์น
async function GetDrug() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/drugs`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetPractice() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/practice`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetDispense() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/dispense`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateDispense(data: DispenseInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/dispense`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}
async function ListReady_Dispense() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/treatments/readyyy`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
async function ListReady_Appoint() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/treatments/readyapp`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              console.log(res.data);
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
async function CreateAppoint(data: AppointInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/appoint`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}
async function GetAppoint() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/appoint`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetDepartment() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/department`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetLevelcure() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/levelcure`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
//ดึงข้อมูลการรักษา
async function Treatment_Disease_Text(id:any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/treatments/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//LEO
async function GetMedEmployees() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/medemployees`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;

  }

  async function CreateMedEmployee(data: MedEmployeeInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/medemployees`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // console.log(res.data);
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
  async function  GetBrand() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/brands`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  
    }
  
    async function  GetMedStatus() {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
    
      let res = await fetch(`${apiUrl}/medstatuses`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            return res.data;
          } else {
            return false;
          }
        });
    
      return res;
    
      }
  
  
  async function MedicalEquipments(data: MedicalEquimentInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/medicalequipments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  async function GetMedicalEquipments() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/medicalequipments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  //Gg
  //ระบบการเบิก
async function Request(data: RequestInterface) {
  const requestOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/requests`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          
          return { status: true, message: res.data };
        } else {
       
          return { status: false, message: res.error };
        }
      });

  return res;
}
async function GetLocation() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/locations`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
async function GetRequest() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };

  let res = await fetch(`${apiUrl}/requests`, requestOptions) //////////
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}
  


export {

  LoginDoctor,

  LoginScreening_officer,
  LoginMed_empolyee, //////
  LoginByOfficer,
  GetOfficers,
  CreateOfficer,
  GetOfficerByUID,

  GetMedByUID,
  

  //Login,
  GetEducation,
  GetGender,
  GetPrefix,
  GetScreening_officer,
  //CreateScreening_officer,
  GetPatient,
  CreatePatient,
  GetDocPrefix,
  GetBlood,
  GetMarital,
  GetReligion,
  GetNationality,
  GetAddressThailand,
  GetDoctor,
  GetShow,
  CreateDoctor,
  ListLabName,
  ListLab,
  CreateLab,

  //Gg
  GetTreatment,
  GetStatus,
  GetDisease,
  GetTrack,
  Treatment,
  ListReady_Treat,
  GetReady_Treat,


  //J
  GetState,
  GetBuilding,
  GetRoom,
  ListSave_ITIs,
  CreateSave_ITI,
  GetOperating_Room,
  CreateOperating_Room,
  ListReady_Save,
  GetReady_Save_ITI,
  ListRoombyBuildings,
  GetBuildingOne,

  //Aern
  GetDrug,
  GetPractice,
  GetDispense,
  CreateDispense,
  ListReady_Dispense,
  CreateAppoint,
  GetAppoint,
  GetLevelcure,
  GetDepartment,
  ListReady_Appoint,
  Treatment_Disease_Text,

  //LEO
  GetMedEmployees, //////
  CreateMedEmployee,
  GetMedicalEquipments,
  GetBrand,
  GetMedStatus,
  MedicalEquipments,

  //Gg
  Request,
  GetLocation,
  GetRequest,

  Med_Employee, ///

  GetScrenByUID,
  Screening_officer,

  GetDoctorByUID,
  Doctor,
  Create_Doctor,

};