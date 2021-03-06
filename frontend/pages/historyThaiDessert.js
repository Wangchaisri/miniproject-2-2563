import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import "bootstrap/dist/css/bootstrap.css";
import Image from 'next/image';

const HistoryThaiDessert1 = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        orderUser()
    }, [])

    const orderUser = async () => {
        try {
            
            const users = await axios.get(`${config.URL}/order`, {
                headers: { Authorization: `Bearer ${token}` }
            })
           
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Head>
                <title>History Thai Dessert</title>
            </Head>
                <Navbar/>
                <div className={styles.contain}>
                <h1 className={styles.text_margin}>ประวัติขนมไทย</h1>
                <Image src="/gpa4.jpg" alt="me" width="800" height="500"></Image>
                <div className={styles.pad_lr}>
                    <hr></hr>
                    <p className={styles.text_de}><b>ขนมไทย : </b>
                    มีเอกลักษณ์ด้านวัฒนธรรมประจำชาติไทยคือ มีความละเอียดอ่อนประณีตในการเลือกสรรวัตถุดิบ วิธีการทำ ที่พิถีพิถัน รสชาติอร่อยหอมหวาน สีสันสวยงาม รูปลักษณ์ชวนรับประทาน ตลอดจนกรรมวิธีที่ประณีตบรรจง ขนมไทยดั้งเดิม มีส่วนผสมคือ แป้ง น้ำตาล กะทิ เท่านั้น ส่วนขนมที่ใช้ไข่เป็นส่วนประกอบ เช่น ทองหยิบ ทองหยอด เม็ดขนุน นั้น มารี กีมาร์ เดอ ปีนา (ท้าวทองกีบม้า) หญิงสาวชาวโปรตุเกส เป็นผู้นำสูตรมาจากโปรตุเกส</p>
                    <hr></hr>
                    <p className={styles.text_de}><b>ประวัติ : </b>
                    แบ่งตามวิธีการทำให้สุกได้ดังนี้
                    <li>ขนมที่ทำให้สุกด้วยการกวน ส่วนมากใช้กระทะทอง กวนตั้งแต่เป็นน้ำเหลวใสจนงวด แล้วเทใส่พิมพ์หรือถาดเมื่อเย็นจึงตัดเป็นชิ้น เช่น ตะโก้ ขนมลืมกลืน ขนมเปียกปูน ขนมศิลาอ่อน และผลไม้กวนต่าง ๆ รวมถึงข้าวเหนียวแดง ข้าวเหนียวแก้ว และกะละแม</li>
                    <li>ขนมที่ทำให้สุกด้วยการนึ่ง ใช้ลังถึง บางชนิดเทส่วนผสมใส่ถ้วยตะไลแล้วนึ่ง บางชนิดใส่ถาดหรือพิมพ์ บางชนิดห่อด้วยใบตองหรือใบมะพร้าว เช่น ช่อม่วง ขนมชั้น ข้าวต้มผัด สาลี่อ่อน สังขยา ขนมกล้วย ขนมตาล ขนมใส่ไส้ ขนมเทียน ขนมน้ำดอกไม้ ข้าวเกรียบปากหม้อ</li>
                    <li>ขนมที่ทำให้สุกด้วยการเชื่อม เป็นการใส่ส่วนผสมลงในน้ำเชื่อมที่กำลังเดือดจนสุก ได้แก่ ทองหยอด ทองหยิบ ฝอยทอง เม็ดขนุน กล้วยเชื่อม จาวตาลเชื่อม</li>
                    <li>ขนมที่ทำให้สุกด้วยการทอด เป็นการใส่ส่วนผสมลงในกระทะที่มีน้ำมันร้อนๆ จนสุก เช่น กล้วยทอด ข้าวเม่าทอด ขนมกง ขนมค้างคาว ขนมฝักบัว ขนมนางเล็ด</li>
                    <li>ขนมที่ทำให้สุกด้วยการนึ่งหรืออบ ได้แก่ ขนมหม้อแกง ขนมหน้านวล ขนมกลีบลำดวน ขนมทองม้วน สาลี่แข็ง นอกจากนี้ อาจรวม ขนมครก ขนมเบื้อง ขนมดอกลำเจียกที่ใช้ความร้อนบนเตาไว้ในกลุ่มนี้ด้วย</li>
                    <li>ขนมที่ทำให้สุกด้วยการต้ม ขนมประเภทนี้จะใช้หม้อหรือกระทะต้มน้ำให้เดือด ใส่ขนมลงไปจนสุกแล้วตักขึ้น นำมาคลุกหรือโรยมะพร้าว ได้แก่ ขนมถั่วแปบ ขนมต้ม ขนมเหนียว ขนมเรไร นอกจากนี้ยังรวมขนมประเภทน้ำ ที่นิยมนำมาต้มกับกะทิ หรือใส่แป้งผสมเป็นขนมเปียก และขนมที่กินกับน้ำเชื่อมและน้ำกะทิ เช่น กล้วยบวชชี มันแกงบวด สาคูเปียก ลอดช่อง ซ่าหริ่ม</li>
                    </p>
                    <hr></hr>
                    <p className={styles.text_de}><b>วัตถุดิบในการปรุงขนมไทย : </b>
                    ขนมไทยส่วนใหญ่ทำมาจากข้าวและจะใช้ส่วนประกอบอื่นๆ เช่น สี ภาชนะ กลิ่นหอมจากธรรมชาติ ข้าวที่ใช้ในขนมไทยมีทั้งใช้ในรูปข้าวทั้งเม็ดและข้าวที่อยู่ในรูปแป้ง นอกจากนั้นยังมีวัตถุดิบอื่นๆ เช่น มะพร้าว ไข่ น้ำตาล ซึ่งจะกล่าวถึงรายละเอียดดังต่อไปนี้
                    <li>ข้าวและแป้ง</li>
                    <li>มะพร้าวและกะทิ</li>
                    <li>น้ำตาล</li>
                    <li>ไข่</li>
                    <li>ถั่วและงา</li>
                    <li>กล้วย</li>
                    <li>สีที่ได้จากธรรมชาติ</li>
                    <li>กลิ่นหอมที่ใช้ในขนมไทย</li>
                    </p>
                    <hr></hr>
                    <p className={styles.text_de}><b>ขนมไทยที่ได้รับอิทธิพลจากขนมของชาติอื่น : </b>
                    ไทยได้รับเอาวัฒนธรรมด้านอาหารของชาติต่างๆ มาดัดแปลงให้เหมาะสมกับสภาพท้องถิ่น วัตถุดิบที่หาได้ เครื่องมือเครื่องใช้ ตลอดจนการบริโภคแบบไทย จนทำให้คนรุ่นหลัง แยกไม่ออกว่าอะไรคือขนมที่เป็นไทยแท้ และอะไรดัดแปลงมาจากวัฒนธรรมของชาติอื่น เช่น ขนมที่ใช้ไข่และขนมที่ต้องเข้าเตาอบ ซึ่งเข้ามาในรัชสมัยสมเด็จพระนารายณ์มหาราช จากคุณท้าวทองกีบม้าภรรยาเชื้อชาติญี่ปุ่น-โปรตุเกสของเจ้าพระยาวิชเยนทร์ ผู้เป็นกงสุลประจำประเทศไทยในสมัยนั้น ไทยมิใช่เพียงรับทองหยิบ ทองหยอด และฝอยทองมาเท่านั้น หากยังให้ความสำคัญกับขนมเหล่านี้โดยใช้เป็นขนมมงคลอีกด้วย ส่วนใหญ่ตำรับขนมที่ใส่ไข่มักเป็น "ของเทศ" เช่น ทองหยิบ ฝอยทอง ทองหยอดจากโปรตุเกส</p>
                    </div>
            </div>
        </Layout>
    )
}

export default HistoryThaiDessert1

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}