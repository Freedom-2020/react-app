import './Header.css'
import Logo from '../assets/logo/logo.svg'


function Header(){
    return (
        <header className="flex relitive header-box">
            <img className="logo-img" src={Logo} alt="logo"/>
            <i className="avatar-box"></i>
        </header>
    )
}

export default Header;