import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import "bootstrap/dist/css/bootstrap.css";
import Image from 'next/image';

const Profile1 = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Head>
                <title>Profile</title>
            </Head>
                <Navbar/>
                <div className={styles.contain}>
                <h1 className={styles.text_margin}>ประวัติยายเบญเจ้าของสูตร</h1>
                <Image src="/granbenz.jpg" alt="me" width="500" height="700"></Image>
                <div className={styles.pad_lr}>
                    <p className={styles.text_de}><b>ยายเบญ : </b>
                    มีชื่อจริงว่า นางอัมมร ณ นครศรีธรรมราช</p>
                    <p className={styles.text_de}><b>วันเกิด : </b>
                    เกิดวันที่ 14 ( พฤหัส ) ขึ้น 13 ค่ำ เดือน : กุมภาพันธ์ ( เดือน 3 ตามปฏิทินจันทรคติ ) พุทธศักราช : 2489 ( ปีระกา ) คริสตศักราช : 1946 ราศี : มังกรv</p>
                    <p className={styles.text_de}><b>ชาติกำเนิด : </b>
                    เป็นคนนับถือศาสนาพุทธ เป็นลูกคน 7 ซึ่งเป็นลูกคนสุดท้อง ยายเบญมีหลายเชื้อสายเนื่องจากต้นตระกูลเป็นลูกครึ่งแต่มาแต่งงานกับคนไทย ทำให้ยายเบญมีเชื้อสายโปรตุเกส, ญี่ปุ่น,เบงกอล, ไทยและจีน โดยที่ต้นตระกูลฝั่งแม่อพยพมาจากอาณานิคมโปรตุเกสในเมืองกัว แต่ต้นตระกูลฝั่งพ่อเป็นคนไทย</p>
                    <p className={styles.text_de}><b>ชีวิตสมรส : </b>
                    ยายเบญได้พบรักกับสามีชื่อว่า นายอยู่ยืน ณ นครศรีธรรมราช ที่จังหวัดกรุงเทพ และแต่งงานกันเมื่อปี พ.ศ. 2512 ด้วยวัย 23 ปี ปัจจุบันทั้งคู่ครองรักกันมาแล้ว 52 ปี</p>
                    <p className={styles.text_de}><b>ลูก : </b>
                    ยายเบญมีลูกกับตายืนด้วยกัน 2 คน เป็นผู้หญิงทั้ง 2 คน ปัจจุบันช่วยกันบริหารเปิดร้านขนมไทยโบราณเพื่อสืบทอดสูตรขนมไทยเป็นรุ่นที่ 4 ชื่อร้าน ขนมไทยโบราณสูตรยายเบญ ที่อำเภอเมือง จังหวัดนครศรีธรรมราช</p>
                    <p className={styles.text_de}><b>บ้านเดิม : </b>
                    บ้านเดิมยายเบญเกิดที่จังหวัดพระนครศรีอยุธยา แต่ตอนหลังยายเบญได้มาพบรักกับคุณตาอยู่ยืนทำให้คุณยายเบญย้ายมาอยู่บ้านคุณตาที่จังหวัดนครศรีธรรมราชซึ่งเป็นบ้านเกิดคุณตาอยู่ยืน</p>
                    <p className={styles.text_de}><b>ประวัติขนมไทย</b><br/>
                    ในสมัยโบราณคนไทยจะทำขนมเฉพาะวาระสำคัญเท่านั้น เป็นต้นว่างานทำบุญ งานแต่ง เทศกาลสำคัญ หรือต้อนรับแขกสำคัญ เพราะขนมบางชนิดจำเป็นต้องใช้กำลังคนอาศัยเวลาในการทำพอสมควร ส่วนใหญ่เป็น ขนบประเพณี เป็นต้นว่า ขนมงาน เนื่องในงานแต่งงาน ขนมพื้นบ้าน เช่น ขนมครก ขนมถ้วย ฯลฯ ส่วนขนมในรั้วในวังจะมีหน้าตาสวยงาม ประณีตวิจิตรบรรจงในการจัดวางรูปทรงขนมสวยงาม</p>
                    <p className={styles.text_de}><b>สูตรขนมโบราณ : </b>
                    เนื่องจากคุณยายเป็นเหลนรุ่นที่ 3 ของท้าวทองกีบม้า จึงทำให้สืบทอดสูตรขนมไทยโบราณตระกูลทองชนิดๆ แต่ด้วยตัวคุณยายชอบทำขนมอยู่แล้ว ท่านจึงได้เรียนรู้สูตรขนมอื่นๆ เพิ่มขึ้นมาจากการเป็นครูพักลักจํา จำจากการเห็นคนอื่นทำและมาดัดแปลงเป็นสูตรของยายในปัจจุบัน </p>
                </div>
            </div>
        </Layout>
    )
}

export default Profile1

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
