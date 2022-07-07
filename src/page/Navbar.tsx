import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css'
import classNames from 'classnames'

let menus = [
    { name: 'DASHBOARD', pathName: '/help', selected: false, icon: 'icon-dashboard' },
    { name: 'AGENT', pathName: '/agent', selected: true , icon: 'icon-sitemap'},
    { name: 'MY CRUISE', pathName: '/formEdit', selected: false , icon: 'icon-boat'},
    { name: 'HELP', pathName: '/help', selected: false , icon: 'icon-life-bouy'},
    
]

function Navbar(){
    const [menuList, setMenuList] = useState(menus)

    let history = useHistory()
    function clickLink(idx: number, pathName: string){
        setMenuList((menuList)=> {
            menuList.forEach(x => x.selected = false)
            menuList[idx].selected= true
            return [...menuList]
        })

        history.push(pathName)
    }

    useEffect(()=>{
        history.push('/formEdit')
    },[history])

    return (
        <ul className="font-color-wt menu-ul">
        {
            menuList.map((item, idx) => 
                <li key={idx} onClick={()=>{clickLink(idx, item.pathName)}} className={classNames('li-hv pointer', {'is-active': item.selected})}>
                    <i className={classNames(item.icon, 'menu-icon')}></i>
                    {item.name}
                </li>
            )
        }
        </ul>
    )
}

export default Navbar;