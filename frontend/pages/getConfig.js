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
                        
                    </div>
                </div>
        </Layout>
    )

}


export default GetConfig

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
