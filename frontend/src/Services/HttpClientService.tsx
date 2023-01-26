//import React from "react";
import { PatiendsInterface } from "../Models/IPatiend";
import { Screening_officersInterface } from "../Models/IScreening_officer";
import { DoctorInterface } from "../Models/IDoctor";
import { TreatmentsInterface } from "../Models/ITreatment";
import { Save_ITIsInterface } from "../Models/ISave_ITI";
import { Operating_RoomsInterface } from "../Models/IOperating_Room";

const apiUrl = "http://localhost:8080";

async function GetPolicing() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Policings`, requestOptions)
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

async function GetGender() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
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

async function GetPatiend() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Patiends`, requestOptions)
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
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
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

async function CreateScreening_officer(data: Screening_officersInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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

async function CreatePatiend(data: PatiendsInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Patiend`, requestOptions)
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
//เดียร์น่าจะลืมแก้
async function CreateDoctor(data: PatiendsInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Doctor`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log("เข้า fetch(`${apiUrl}/Doctor` แล้ววววววววว")
        console.log(res.data);
        return res.data;
      } else {
        console.log("ไม่เข้า fetchhhhhhhhhhhhh")
        return false;
      }
    });

  return res;
}

//Gg
async function GetTreatment() {
  const requestOptions = {
      method: "GET",
      headers: {
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
         // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
         // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/treatments`, requestOptions)
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

// J
async function GetBuilding() {
  const requestOptions = {
      method: "GET",
      headers: {
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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

async function GetRoom() {
  const requestOptions = {
      method: "GET",
      headers: {
         // Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
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

export {
  GetPolicing,
  GetEducation,
  GetGender,
  GetPrefix,
  GetScreening_officer,
  CreateScreening_officer,
  GetPatiend,
  CreatePatiend,
  GetDocPrefix,
  GetBlood,
  GetMarital,
  GetReligion,
  GetNationality,
  GetAddressThailand,
  GetDoctor,
  CreateDoctor,

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
};
