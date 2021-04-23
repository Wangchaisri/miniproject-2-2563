import Head from 'next/head' 
import Layout from '../components/layout' 
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { } from "react";
import styles from "../styles/Index.module.css";
import Navbar from "../components/navbar";
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
          <div className={styles.listItem} key={index}>
            <div><b>ชื่อขนมไทย:</b> {item.ชื่อขนมไทย}</div>
            <div><b>หมายถึง:</b> {item.หมายถึง}</div>
             <div> <b>นิยม:</b> {item.นิยม} </div>
            <div><b>สี:</b> {item.สี}</div>
            
            <div>
            <button
              className={styles.btn}
              onClick={() => selStu(item.id)}
            >
              Select
            </button></div>
           
          </div>
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
        {showStudents()}
      </div>
    </div>
    
    </Layout>
  );
};
export default index;
