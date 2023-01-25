import React from "react";
import { PatiendsInterface } from "../Models/IPatiend";
import { Screening_officersInterface } from "../Models/IScreening_officer";
import { DoctorInterface } from "../Models/IDoctor";

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
        // console.log(res.data);
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
};
