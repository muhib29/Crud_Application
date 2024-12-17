import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyData = () => {
  const [myId, setmyId] = useState(null);
  const [empName, setempName] = useState("");
  const [salary, setsalary] = useState(null);
  const [lst, setLst] = useState([]);

  const submitData = () => {
    let str = `INSERT INTO tbl_emp VALUES(${myId},'${empName}',${salary})`;
    Axios.post("http://localhost:3001/api/NonQuery", { mySQL: str })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        // DisplayData();
      })
      .catch((error) => {
        console.error("There was an error with the request!", error);
        const errorMessage =
          error.response?.data.message || "An unexpected error occurred!";
        toast.error(errorMessage);
      });
  };

  const updateData = () => {
    let str = `UPDATE tbl_emp SET emp_name = '${empName}', salary = ${salary} WHERE id = ${myId}`;
    Axios.post("http://localhost:3001/api/NonQuery", { mySQL: str })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error Updating the record!", error);
        const errorMessage =
          error.response?.data.message || "Error updating record!";
        toast.error(errorMessage);
      });
  };

  const deleteData = (id) => {
    let str = `DELETE FROM tbl_emp WHERE id = ${id}`;
    Axios.post("http://localhost:3001/api/NonQuery", { mySQL: str })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error deleting the record!", error);
        const errorMessage =
          error.response?.data.message || "Error deleting record!";
        toast.error(errorMessage);
      });
  };

  const DisplayData = () => {
    let str = `SELECT * FROM tbl_emp`;
    Axios.get(`http://localhost:3001/api/DataQuery`, { params: { sql: str } })
      .then((response) => {
        console.log(response.data);
        setLst(response.data);
        toast.success("Data fetched successfully!");
      })
      .catch((error) => {
        console.error("There was an error with the request!", error);
        const errorMessage =
          error.response?.data.message || "An unexpected error occurred!";
        toast.error(errorMessage);
      });
  };
  const handleEdit = (item) => {
    setmyId(item.ID);
    setempName(item.Emp_Name);
    setsalary(item.Salary);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[90vw] max-w-lg mx-auto transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">
          Employee Management
        </h1>
        <div className="space-y-4">
          <input
            type="number"
            value={myId}
            placeholder="Enter ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all"
            onChange={(e) => setmyId(parseInt(e.target.value))}
          />
          <input
            type="text"
            placeholder="Enter Name"
            value={empName}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all"
            onChange={(e) => setempName(e.target.value)}
          />
          <input
            type="number"
            value={salary}
            placeholder="Enter Salary"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all"
            onChange={(e) => setsalary(parseInt(e.target.value))}
          />
        </div>
        <div className="flex space-x-4 mt-8">
          <button
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all focus:ring-4 focus:ring-green-400"
            onClick={submitData}
          >
            Insert
          </button>
          <button
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-900 transition-all focus:ring-4 focus:ring-purple-400"
            onClick={DisplayData}
          >
            Read
          </button>
          <button
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-all focus:ring-4 focus:ring-yellow-400"
            onClick={updateData}
          >
            Update
          </button>
          <button
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all focus:ring-4 focus:ring-red-400"
            onClick={()=>deleteData(myId)}
          >
            Delete
          </button>
        </div>

        <div className="mt-8 max-h-64 overflow-y-auto border border-gray-300 rounded-lg">
          <table className="w-full text-center table-auto">
            <thead className="bg-purple-200">
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Salary</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lst.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-2">{item.ID}</td>
                  <td className="py-2">{item.Emp_Name}</td>
                  <td className="py-2">{item.Salary}</td>
                  <td className="flex gap-2 items-center cursor-pointer justify-center mt-3 ml-2">
                    <i
                      onClick={() => deleteData(item.ID)}
                      className="fa-solid fa-trash"
                    ></i>
                    <i
                      onClick={() => handleEdit(item)}
                      className="fa-solid fa-edit"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyData;
