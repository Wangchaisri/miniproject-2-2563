import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/thaidessert.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import Image from 'next/image';
const URL = "http://localhost/api/thaidesserts";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [thaidesserts, setThaidesserts] = useState({});
  const [Dessert, setDessert] = useState("");
  const [Mean, setMean] = useState("");
  const [Popular, setPopular] = useState("");
  const [Price, setPrice] = useState(0);
  const [thaidessert, setThaidessert] = useState({});
  useEffect(() => {
    getThaidesserts();
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

  const getthaidessert = async (id) => {
    const result = await axios.get(`${URL}/${id}`)
    console.log('thaidessert id: ', result.data)
    setThaidessert(result.data)
}
 
  const getThaidesserts = async () => {
    let result = await axios.get(URL);
    setThaidesserts(result.data.list);
  };

  const addThaidessert = async () => {
    let result = await axios.post(URL, {
      Dessert,
      Mean,
      Popular,
      Price,
    });
    console.log(result);
    getThaidesserts();
  };

  const deleteThaidessert = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getThaidesserts();
  };

  const updateThaidessert = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      Dessert,
      Mean,
      Popular,
      Price,
    });
    console.log(result);
    getThaidesserts();
  };

  const showThaidesserts = () => {
    if (thaidesserts && thaidesserts.length) {
      return thaidesserts.map((item, index) => {
        return (
          <Col className="col-lg-7 col-15">     
        {/* lg ขนาด 15/3=4ต้องการให้มีกี่เอาตัวเลขแถวมาหาร, col  */}
          <div className={styles.listItem} key={index}>
            <b>ชื่อขนมไทย:</b> {item.Dessert} <br />
            <Image src={item.รูป} alt="me" width="150" height="150" />

            <b>หมายถึง:</b> {item.Mean} <br />
            <b>นิยม:</b> {item.Popular} <br />
            <b>ราคา:</b> {item.Price} ฿
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getthaidessert(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updateThaidessert(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deleteThaidessert(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
          </Col>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <h1><ins>Thai Dessert Data Edit </ins></h1>
      <div className={styles.form_add}>
        <h2>Add Thai Dessert</h2>
        ชื่อขนมไทย:
        <input
          type="text"
          name="ชื่อขนมไทย"
          onChange={(e) => setDessert(e.target.value)}
        ></input>
        หมายถึง:
        <input
          type="text"
          name="หมายถึง"
          onChange={(e) => setMean(e.target.value)}
        ></input>
        นิยม:
        <input
          type="text"
          name="นิยม"
          onChange={(e) => setPopular(e.target.value)}
        ></input>
        ราคา:
        <input
          type="number"
          name="ราคา"
          onChange={(e) => setPrice(e.target.value)}
        ></input>฿
        <button
          className={styles.button_add}
          onClick={() => addThaidessert(Dessert, Mean, Popular, Price)}
        >
          Add
        </button>
      </div>

      <Row><div className={styles.list}>{showThaidesserts()}</div></Row>
      <div className={styles.list1}><b><i><ins>(Selected Thai Dessert)</ins></i></b> <b>  ชื่อขนมไทย:</b>{thaidessert.Dessert}<b>  หมายถึง:</b>{thaidessert.Mean} <b>  นิยม:</b>{thaidessert.Popular}  <b>ราคา:</b>{thaidessert.Price}  </div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}