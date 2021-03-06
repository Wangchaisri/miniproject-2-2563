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
const URL = "http://localhost/api/thaidesserts";
const URL_SEL = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const index = ({ token }) => {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  
  const selStu = async (id) => {
    let result = await axios.post(`${URL_SEL}/${id}`)
    mutate(URL, data);
  }

  const showThaidesserts = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        console.log(item)
        return (
        <Col className="col-lg-12 col-12">     
        {/* lg ขนาด 15/3=4ต้องการให้มีกี่เอาตัวเลขแถวมาหาร, col  */}
          <div className={styles.listItem} key={index}>
            <div><b>ชื่อขนมไทย:</b> {item.Dessert}</div>
            <Image src={item['imageUrl']} alt="me" width="780" height="500" />
            <div><b>หมายถึง:</b> {item.Mean}</div>
             <div> <b>นิยม:</b> {item.Popular} </div>
            <div><b>ส่วนผสม:</b> {item.Ingredient} </div>
            <div><b>ขั้นตอนการทำ:</b> {item.Procedure} </div>
            <div>
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
    <div className={styles.container}><Navbar token={token}/>
      <div className={styles.title}>
      <marquee bgcolor="#33CC66" direction="lefe" scrollamount="5" width="100%"><ins>สูตรขนมไทยดั้งเดิม โดยแม่เบญ</ins></marquee></div>
      <div className={styles.list}>
        <Row>{showThaidesserts()}</Row>
      </div>
    </div>
    </Layout>
  );
};
export default index;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}