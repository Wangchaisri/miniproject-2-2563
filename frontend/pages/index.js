import Head from 'next/head' 
import Layout from '../components/layout' 
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { } from "react";
import styles from "../styles/Index.module.css";
import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import Image from 'next/image';
const URL = "http://localhost/api/students";
const URL_SEL = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const index = () => {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  
  const selStu = async (id) => {
    let result = await axios.post(`${URL_SEL}/${id}`)
    mutate(URL, data);
  }

  const showStudents = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
        <Col className="col-lg-4 col-12">     
        {/* lg ขนาด 12/3=4ต้องการให้มีกี่เอาตัวเลขแถวมาหาร, col  */}
          <div className={styles.listItem} key={index}>
            <div><b>ชื่อขนมไทย:</b> {item.Dessert}</div>
            <Image src={item.รูป} alt="me" width="144" height="144" />

            <div><b>หมายถึง:</b> {item.Mean}</div>
             <div> <b>นิยม:</b> {item.Popular} </div>
            <div><b>ราคา:</b> {item.Price} ฿</div>
            
            <div>
            <button
              className={styles.btn}
              onClick={() => selStu(item.id)}
            >
              Select
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
    <Layout>
       <Head>
        <title>Thai Dessert by RoseBenz</title>
    </Head>
    <div className={styles.container}><Navbar />
      <div className={styles.title}>
      <marquee bgcolor="#33CC66" direction="lefe" scrollamount="5" width="100%"><ins>Welcome to Thai Dessert by RoseBenz</ins></marquee></div>
      <div className={styles.list}>
        <Row>{showStudents()}</Row>
      </div>
    </div>
    </Layout>
  );
};
export default index;
