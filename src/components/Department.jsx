import React, { useState, useEffect } from "react";
import CommonInput from "../common/CommonInput";
import CommonBtn from "../common/CommonBtn";
import Tabel from "./Table";

const Department = ({ setDepartmentList, navigateEmployee }) => {
  const [deptCode, setDepCode] = useState("");
  const [deptName, setDeptName] = useState("");
  const [departmentTableList, setDepartmentTableList] = useState(
    JSON.parse(localStorage.getItem("departmentTableList")) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "departmentTableList",
      JSON.stringify(departmentTableList)
    );
    setDepartmentList(departmentTableList.map((dept) => dept.departmentName));
  }, [departmentTableList, setDepartmentList]);

  const addDepartment = (e) => {
    e.preventDefault();
    if (validation()) {
      const newDepartment = {
        departmentCode: deptCode,
        departmentName: deptName,
      };
      setDepartmentTableList((prevData) => [...prevData, newDepartment]);
      setDeptName("");
      setDepCode("");
    }
  };

  const validation = () => {
    if (!deptCode) {
      alert("Department Code cannot be empty");
      return false;
    } else if (!/^\d+$/.test(deptCode)) {
      alert("Department Code should contain only numbers");
      return false;
    }

    if (!deptName) {
      alert("Department Name cannot be empty");
      return false;
    }

    const normalizedDeptCode = deptCode.toLowerCase();
    const isDuplicate = departmentTableList.some(
      (dept) =>
        dept.departmentCode.toLowerCase() === normalizedDeptCode ||
        dept.departmentName === deptName
    );
    if (isDuplicate) {
      alert("Duplicate department entry is not allowed");
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="flex justify-center text-red-500 text-2xl">
          ADD Department
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <CommonInput
          inputPlaceholder={"Department Code"}
          inputValue={deptCode}
          monitorState={(e) => setDepCode(e.target.value)}
        />
        <CommonInput
          inputPlaceholder={"Department Name"}
          inputValue={deptName}
          monitorState={(e) => setDeptName(e.target.value)}
        />
        <CommonBtn btnName={"ADD"} btnClick={addDepartment} />
      </div>
      <Tabel departmentTableList={departmentTableList} />

      <div className="flex justify-center items-center">
        <CommonBtn
          btnName={"To Employee Details"}
          btnClick={navigateEmployee}
        />
      </div>
    </>
  );
};

export default Department;
