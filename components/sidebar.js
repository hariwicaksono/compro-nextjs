import React, {Component, useState} from 'react';
import Link from 'next/link';
import { Collapse} from 'react-bootstrap';
import {FaHome, FaFile, FaNewspaper, FaWrench, FaSlidersH, FaSignOutAlt, FaKey} from 'react-icons/fa';
import { logout, isLogin } from '../libs/utils';

function SubMenu() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    return (
        <>
        <li>
            <Link href={'/admin'} passHref>
             <a><FaHome size="1.4rem"/> <span>Admin</span></a>
            </Link>
        </li>
        <li>
            <Link href={'/admin/blog'} passHref>
             <a><FaNewspaper size="1.4rem"/> <span>Blog Post</span></a>
            </Link>
        </li>
        <li>
            <Link href={'/admin/blog/category'} passHref>
             <a><FaNewspaper size="1.4rem"/> <span>Blog Kategori</span></a>
            </Link>
        </li>
        <li>
          <Link href={'/admin/setting'} passHref>
          <a title="Pengaturan" alt="Pengaturan"><FaWrench size="1.4rem"/> <span>Pengaturan</span></a>
            </Link>
        </li>
        <li>
        <a href='#' onClick={() => setOpen1(!open1)} data-toggle="collapse" aria-controls="collapsePengaturan" aria-expanded={open1} className="dropdown-toggle">
         <FaSlidersH size="1.4rem"/> <span>Profil</span></a>
      <Collapse in={open1}>
      <ul className="list-unstyled" id="collapsePengaturan">
        <li>
          <Link href={'/admin/setting'} passHref>
          <a title="Pengaturan" alt="Pengaturan"><FaWrench size="1.4rem"/> <span>Profil Saya</span></a>
            </Link>
        </li>
          <li>
          <Link href={'/admin/password'} passHref>
          <a title="Ganti Password" alt="Ganti Password"><FaKey size="1.4rem"/> <span>Ganti Password</span></a>
            </Link>
          </li>
          <li>
              <Link onClick={() => {logout()}} href='' passHref>
              <a title="Logout" alt="Logout"><FaSignOutAlt size="1.4rem"/> <span>Logout</span></a>
              </Link>
          </li>
      </ul>
      </Collapse>
    </li>
      
    </>
    );
  }
class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login:false 
        }
    }
    componentDidMount = () => {
        
    }

    render() {
      
    return(
        <>
        <nav id="sidebar" className={this.props.showMenu ? 'shadow' : 'shadow active' }>
        <ul className="list-unstyled components">
                    
        <SubMenu/>
 
        </ul>
        </nav>
      
        </>

    )

}
}

export default Sidebar