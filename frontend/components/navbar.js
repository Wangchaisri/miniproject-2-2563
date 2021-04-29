import Link from 'next/link'
import styles from "../styles/navbar.module.css"

const Navbar = ({token}) => (
    <div className = {styles.Navbar}>
        <Link href="/"><a> <b>Home Page</b></a></Link> |
        
        <Link href="/profile"><a> <b>Profile</b> </a></Link> | 
        <Link href="/foo"><a> <b>Foo </b></a></Link> |
        { token && <span><Link href="/thaidessertedit"><a> <b>Thai Dessert Edit</b> </a></Link> |</span> }
        <Link href="/getConfig"><a><b> Contact Us</b> </a></Link> 
        { token && <span>| <Link href="/logout"><a> <b>Logout</b> </a></Link> |</span> }
        |<Link href="/login"><a> <b class = "text-danger">Admin Login</b> </a></Link>
    </div>
)

export default Navbar