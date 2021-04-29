import Layout from '../components/layout'
import Head from 'next/head'
import config from '../config/config'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import "bootstrap/dist/css/bootstrap.css";
import Image from 'next/image';
import axios from 'axios'


const GetConfig = () => {
    return (
        <Layout>
            <Head>
                <title>Contact Us</title>
            </Head>
                <Navbar/>
                <div className={styles.contain}>
                <h1 className={styles.text_margin}>ติดต่อร้านขนมไทย สูตรยายเบญ</h1>
                <Image src="/bbn.jpg" alt="me" width="600" height="600"></Image>
                    <div className={styles.pad_lr}>
                    <hr></hr>
                    <Image src="/l1.jpg" alt="me" width="300" height="300"></Image> 
                    <p className={styles.text_de}><b>เบอร์โทรศัพท์ร้าน : 07543210</b></p>   
                    <hr></hr>
                    <Image src="/l3.jpg" alt="me" width="300" height="300"></Image> 
                    <b><a href="https://line.me/th/">Line : ร้านขนมไทย สูตรยายเบญสาขานครศรีฯ</a></b>
                    <hr></hr>
                    <Image src="/l2.jpg" alt="me" width="300" height="300"></Image> 
                    <b><a href="https://facebook.com">Facebook : ร้านขนมไทย สูตรยายเบญสาขานครศรีฯ</a></b> 
                    <hr></hr>
                    <Image src="/l8.jpg" alt="me" width="300" height="300"></Image> 
                    <b><a href="https://www.instagram.com/">Instagram : ร้านขนมไทย สูตรยายเบญสาขานครศรีฯ</a></b>
                    <hr></hr>
                    <Image src="/l5.jpg" alt="me" width="300" height="300"></Image> 
                    <b><a href="https://www.google.com/gmail">E-Mail : ร้านขนมไทย สูตรยายเบญสาขานครศรีฯ</a></b> 
                    <hr></hr>
                    <Image src="/l7.jpg" alt="me" width="300" height="300"></Image> 
                    <b><a href="https://www.google.com/maps/dir/7.8864932,98.363613/%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%A3%E0%B8%B2%E0%B8%8A/@8.2512721,98.0041382,8z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x30530115a2a6568b:0x34e30843bc5f02f2!2m2!1d99.9631219!2d8.4303975!3e0">GPS : ร้านขนมไทย สูตรยายเบญสาขานครศรีฯ</a></b>
                    <hr></hr>
                    </div>
                </div>
        </Layout>
    )

}


export default GetConfig

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
