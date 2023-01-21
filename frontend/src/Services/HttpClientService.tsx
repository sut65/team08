import React from "react";
import { Screening_officersInterface } from "../Models/IScreening_officer";

const apiUrl = "http://localhost:8080";


async function GetGender() {
    const requestOptions = {
        method: "GET",
        headers: {
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/Genders`, requestOptions)
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

async function GetPrefix() {
    const requestOptions = {
        method: "GET",
        headers: {
           // Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/Prefixs`, requestOptions)
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

async function GetEducation() {
    const requestOptions = {
        method: "GET",
        headers: {
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/Educations`, requestOptions)
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

async function GetScreening_officer() {
    const requestOptions = {
        method: "GET",
        headers: {
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/Screening_officers`, requestOptions)
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
            console.log(res.data);
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  export {
    GetEducation,
    GetGender,
    GetPrefix,
    GetScreening_officer,
    CreateScreening_officer,
  }