import Link from 'next/link'

const Navbar = () => (
    <div>
        <Link href="/"><a> <b>Home Page</b></a></Link> |
        <Link href="/login"><a> <b>Login</b> </a></Link> |
        <Link href="/profile"><a> <b>Profile</b> </a></Link> | 
        <Link href="/foo"><a> <b>Foo </b></a></Link> |
        <Link href="/thaidessertedit"><a> <b>Thai Dessert Edit</b> </a></Link> |
        <Link href="/getConfig"><a><b> Contact Us</b> </a></Link> | 
        <Link href="/logout"><a> <b>Logout</b> </a></Link> 
        
    </div>
)

export default Navbar