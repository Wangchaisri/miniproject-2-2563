import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/student.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/students";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [students, setStudents] = useState({});
  const [ชื่อขนมไทย, setName] = useState("");
  const [หมายถึง, setSurname] = useState("");
  const [นิยม, setMajor] = useState("");
  const [สี, setGPA] = useState(0);
  const [student, setStudent] = useState({});
  useEffect(() => {
    getStudents();
    profileUser();
  }, []);
  const profileUser = async () => {
    try {
      
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getstudent = async (id) => {
    const result = await axios.get(`${URL}/${id}`)
    console.log('student id: ', result.data)
    setStudent(result.data)
}
 
  const getStudents = async () => {
    let result = await axios.get(URL);
    setStudents(result.data.list);
  };

  const addStudent = async () => {
    let result = await axios.post(URL, {
      ชื่อขนมไทย,
      หมายถึง,
      นิยม,
      สี,
    });
    console.log(result);
    getStudents();
  };

  const deleteStudent = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getStudents();
  };

  const updateStudent = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      ชื่อขนมไทย,
      หมายถึง,
      นิยม,
      สี,
    });
    console.log(result);
    getStudents();
  };

  const showStudents = () => {
    if (students && students.length) {
      return students.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <b>ชื่อขนมไทย:</b> {item.name} <br />
            <b>หมายถึง:</b> {item.surname} <br />
            <b>นิยม:</b> {item.major} <br />
            <b>สี:</b> {item.GPA}
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getstudent(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updateStudent(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deleteStudent(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <h1><ins>Student Data Edit </ins></h1>
      <div className={styles.form_add}>
        <h2>Add Students</h2>
        ชื่อขนมไทย:
        <input
          type="text"
          name="ชื่อขนมไทย"
          onChange={(e) => setName(e.target.value)}
        ></input>
        หมายถึง:
        <input
          type="text"
          name="หมายถึง"
          onChange={(e) => setSurname(e.target.value)}
        ></input>
        นิยม:
        <input
          type="text"
          name="นิยม"
          onChange={(e) => setMajor(e.target.value)}
        ></input>
        สี:
        <input
          type="number"
          name="สี"
          onChange={(e) => setGPA(e.target.value)}
        ></input>
        <button
          className={styles.button_add}
          onClick={() => addStudent(ชื่อขนมไทย, หมายถึง, นิยม, สี)}
        >
          Add
        </button>
      </div>

      <div className={styles.list}>{showStudents()}</div>
      <div className={styles.list1}><b><i><ins>(selected student)</ins></i></b> <b>  ชื่อขนมไทย:</b>{student.name}<b>  หมายถึง:</b>{student.surname} <b>  นิยม:</b>{student.major}  <b>สี:</b>{student.GPA}</div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
