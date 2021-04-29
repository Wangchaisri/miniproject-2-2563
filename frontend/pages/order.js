import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Order1 = () => {

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
                <title>User order</title>
            </Head>
            <div className={styles.container}>
                <Navbar/>
                <h1>User order</h1>
                <div>
                    This route is protected by token, user is required to login first.
                    <br/>
                    Otherwise, it will be redirect to Login page
                    <br/><br/>
                </div>
            </div>
        </Layout>
    )
}

export default Order1

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
