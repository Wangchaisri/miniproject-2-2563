import Link from 'next/link'
import styles from "../styles/navbar.module.css"
import Image from 'next/image';

const Navbar = ({token}) => (
    <div className = {styles.Navbar}>
        <Image src="/s.jpg" alt="me" width="68" height="40" />
        <Link href="/"><a className={styles.Backgound_menu}> <b>Home Page</b></a></Link>
        <Link href="/profile"><a className={styles.Backgound_menu}> <b>Profile</b> </a></Link>
        <Link href="/historyThaiDessert"><a className={styles.Backgound_menu}> <b>Thai Dessert</b></a></Link>
        { token && <span className={styles.Backgound_menu}><Link href="/thaidessertedit"><a> <b>Edit</b> </a></Link></span> }
        <Link href="/contactUs"><a className={styles.Backgound_menu}><b> Contact Us</b> </a></Link> 
        <Link href="/login"><a className={styles.Backgound_menu}> <b class = "text-danger">Admin Login</b></a></Link>
        { token && <span className={styles.Backgound_menu}><Link href="/logout"><a><b>Logout</b> </a></Link> </span> }
    </div>
)

export default Navbar