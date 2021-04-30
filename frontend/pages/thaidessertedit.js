import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/thaidessert.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import config from '../config/config'
// import Image from 'next/image';
const API_URL = "http://localhost/api/thaidesserts";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [thaidesserts, setThaidesserts] = useState({});
  const [Dessert, setDessert] = useState("");
  const [Mean, setMean] = useState("");
  const [Popular, setPopular] = useState("");
  const [Ingredient, setIngredient] = useState(0);
  const [Procedure, setProcedure] = useState(0);
  const [thaidessert, setThaidessert] = useState({});
  const [imageUrl, setImageUrl] = useState();
  
  const handleChangeImage = e => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImageUrl(imgUrl);    //ดึงข้อมูล url มาได้เลย
  }
  // const [thaidessert, setThaidesserts] = useState({});
  // useEffect(() => {
  //   setImageUrl();
  //   getThaidesserts();
  //   profileUser();
  // }, []);

  useEffect(() => {
    setImageUrl();
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
    const result = await axios.get(`${API_URL}/${id}`)
    console.log('thaidessert id: ', result.data)
    setThaidessert(result.data)
}
 
  const getThaidesserts = async () => {
    let result = await axios.get(API_URL);
    setThaidesserts(result.data.list);
  };

  const addThaidessert = async () => {
    let result = await axios.post(API_URL, {
      Dessert,
      Mean,
      Popular,
      Ingredient,
      Procedure,
      imageUrl,
    });
    console.log(result);
    getThaidesserts();
  };

  const deleteThaidessert = async (id) => {
    let result = await axios.delete(`${API_URL}/${id}`);
    getThaidesserts();
  };

  const updateThaidessert = async (id) => {
    let result = await axios.put(`${API_URL}/${id}`, {
      Dessert,
      Mean,
      Popular,
      Ingredient,
      Procedure,
      imageUrl,
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
            {/* <Image src={item.imageUrl} alt="me" width="500" height="500" /> */}
            <div><img src={item.imageUrl } style={{ width: "630px", height: "350px" }} /></div>
            <b>หมายถึง:</b> {item.Mean} <br />
            <b>นิยม:</b> {item.Popular} <br />
            <b>ส่วนผสม:</b> {item.Ingredient}
            <b>ขั้นตอนการทำ:</b> {item.Procedure}
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
      <Navbar token={token}/>
      <h1><ins>Thai Dessert Data Edit </ins></h1>
      <div className={styles.form_add}>
        <h2>Add Thai Dessert</h2>
        ชื่อขนมไทย:
        <input
          type="text"
          name="ชื่อขนมไทย"
          onChange={(e) => setDessert(e.target.value)}
        ></input>
        <label className='form-control'>
          <img className='image' src={imageUrl} />
          <input className='input-file' type='file' onChange={handleChangeImage} />
        </label>
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
        ส่วนผสม:
        <input
          type="text"
          name="ส่วนผสม"
          onChange={(e) => setIngredient(e.target.value)}
        ></input>
        ขั้นตอนการทำ:
        <input
          type="text"
          name="ขั้นตอนการทำ"
          onChange={(e) => setProcedure(e.target.value)}
        ></input>
        <button
          className={styles.button_add}
          onClick={() => addThaidessert(Dessert, Mean, Popular, Ingredient, Procedure, imageUrl)}
        >
          Add
        </button>
      </div>

      <Row><div className={styles.list}>{showThaidesserts()}</div></Row>
      <div className={styles.list1}><b><i><ins>(Selected Thai Dessert)</ins></i></b> <b>  ชื่อขนมไทย:</b>{thaidessert.Dessert}<b>  หมายถึง:</b>{thaidessert.Mean} <b>  นิยม:</b>{thaidessert.Popular}  <b>ส่วนผสม:</b>{thaidessert.Ingredient}  </div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}