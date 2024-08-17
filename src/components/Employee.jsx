import React, { useEffect, useState } from "react";
import CommonBtn from "../common/CommonBtn";
import { useNavigate } from "react-router-dom";
import CommonInput from "../common/CommonInput";
import TabelEmployee from "./TableEmployee";

const Employee = () => {
  const [delearCode, setDealerCode] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [pan, setPan] = useState("");
  const [mobile, setMobile] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [departmentValue, setDepartmentValue] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const history = useNavigate();

  useEffect(() => {
    const storedDepartments = localStorage.getItem("departmentListFinal");
    if (storedDepartments) {
      setDepartmentValue(JSON.parse(storedDepartments));
    }

    const storedEmployees = localStorage.getItem("employeeDetails");
    if (storedEmployees) {
      setEmployeeDetails(JSON.parse(storedEmployees));
    }
  }, []);

  useEffect(() => {
    if (employeeDetails.length > 0) {
      localStorage.setItem("employeeDetails", JSON.stringify(employeeDetails));
    }
  }, [employeeDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedEmployee = {
      name: userName.trim().toLowerCase(),
      department: selectedDepartment.trim().toLowerCase(),
      dealer: delearCode.trim().toLowerCase(),
      panCode: pan.trim().toLowerCase(),
      mobileNum: mobile.trim(),
      pinNum: pinCode.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim().toLowerCase(),
    };

    if (
      !normalizedEmployee.dealer ||
      !normalizedEmployee.name ||
      !normalizedEmployee.panCode ||
      !normalizedEmployee.mobileNum ||
      !normalizedEmployee.pinNum ||
      !normalizedEmployee.email ||
      !normalizedEmployee.address ||
      !normalizedEmployee.department
    ) {
      alert("All fields are required.");
      return;
    }

    if (normalizedEmployee.name.length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }

    if (normalizedEmployee.mobileNum.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    if (normalizedEmployee.pinNum.length !== 6) {
      alert("Pin code must be exactly 6 digits.");
      return;
    }

    if (normalizedEmployee.address.length < 5) {
      alert("Address must be at least 5 characters long.");
      return;
    }

    const duplicateEntry = employeeDetails.find(
      (employee) =>
        employee.name === normalizedEmployee.name ||
        employee.panCode === normalizedEmployee.panCode ||
        employee.mobileNum === normalizedEmployee.mobileNum ||
        employee.email === normalizedEmployee.email ||
        employee.dealer === normalizedEmployee.dealer
    );

    if (duplicateEntry) {
      const duplicateField = Object.keys(duplicateEntry).find(
        (key) => duplicateEntry[key] === normalizedEmployee[key]
      );
      alert(`Duplicate entry detected in field: ${duplicateField}`);
      return;
    }

    setEmployeeDetails((prevData) => [...prevData, normalizedEmployee]);

    clearForm();
  };

  const clearForm = () => {
    setDealerCode("");
    setUserName("");
    setSelectedDepartment(""); // Corrected spelling
    setPan("");
    setMobile("");
    setPinCode("");
    setEmail("");
    setAddress("");
  };

  const handleCancel = () => {
    clearForm();
  };

  const sortByName = () => {
    const sortedList = [...employeeDetails].sort((a, b) =>
      isSortedAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setEmployeeDetails(sortedList);
    setIsSortedAsc(!isSortedAsc);
  };

  const navigateToDepartment = () => {
    history("/");
  };

  const filteredEmployees = employeeDetails.filter(
    (employee) =>
      employee.name.includes(searchQuery.toLowerCase()) ||
      employee.department.includes(searchQuery.toLowerCase()) ||
      employee.dealer.includes(searchQuery.toLowerCase()) ||
      employee.panCode.includes(searchQuery.toLowerCase()) ||
      employee.mobileNum.includes(searchQuery) ||
      employee.email.includes(searchQuery.toLowerCase()) ||
      employee.address.includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className=" flex justify-center text-red-500 text-2xl">
        ADD Employee
      </h1>
      <div className=" flex justify-center items-center">
        <CommonInput
          inputLabel={"Dealer Code: "}
          inputPlaceholder={"Dealer Code"}
          inputValue={delearCode}
          monitorState={(e) => setDealerCode(e.target.value)}
        />

        <label>Department: </label>
        <select
          id="depStatus"
          className=" h-auto border-2 border-black rounded-lg w-auto ml-2"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)} // Corrected spelling
        >
          <option value="">Select Department</option>
          {departmentValue.map((val, index) => (
            <option value={val} key={index}>
              {val}
            </option>
          ))}
        </select>
      </div>

      {/* Second row */}
      <div className=" flex justify-center items-center w-full">
        <CommonInput
          inputLabel={"Name: "}
          inputPlaceholder={"Name"}
          inputValue={userName}
          monitorState={(e) => setUserName(e.target.value)}
        />
        <CommonInput
          inputLabel={"PAN: "}
          inputPlaceholder={"pan"}
          inputValue={pan}
          monitorState={(e) => setPan(e.target.value)}
        />
      </div>

      {/* Third row */}
      <div className=" flex justify-center items-center w-full">
        <CommonInput
          inputLabel={"Mobile: "}
          inputPlaceholder={"Mobile"}
          inputValue={mobile}
          monitorState={(e) => setMobile(e.target.value)}
        />
        <CommonInput
          inputLabel={"Pin Code: "}
          inputPlaceholder={"pin code"}
          inputValue={pinCode}
          monitorState={(e) => setPinCode(e.target.value)}
        />
      </div>

      {/* Fourth row */}
      <div className=" flex justify-center items-center w-full">
        <CommonInput
          inputLabel={"Email: "}
          inputPlaceholder={"email"}
          inputValue={email}
          monitorState={(e) => setEmail(e.target.value)}
        />
        <CommonInput
          inputLabel={"Address: "}
          inputPlaceholder={"address"}
          inputValue={address}
          monitorState={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className=" flex justify-center items-center mt-4">
        <CommonBtn btnName={"Save"} btnClick={handleSubmit} />
        <CommonBtn btnName={"Cancel"} btnClick={handleCancel} />
      </div>

      {/* Sort Button and Search Input */}
      <div className=" flex justify-center items-center mt-4">
        <CommonBtn
          btnName={isSortedAsc ? "Sort by Name (Asc)" : "Sort by Name (Desc)"}
          btnClick={sortByName}
        />
        <input
          type="text"
          placeholder="Search..."
          className="border-2 border-black rounded-lg ml-4 p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TabelEmployee employeeDetails={filteredEmployees} />

      <div>
        <div className=" flex justify-center items-center mt-4">
          <CommonBtn
            btnName={"To Department"}
            btnClick={navigateToDepartment}
          />
        </div>
      </div>
    </>
  );
};

export default Employee;
