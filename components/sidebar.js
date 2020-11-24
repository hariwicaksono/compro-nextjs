import React, {Component, useState} from 'react';
import Link from 'next/link';
import { Collapse} from 'react-bootstrap';

function SubMenu() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    return (
        <>
        <li>
            <Link href={'/admin'} title="Petunjuk" alt="Petunjuk">
              <span>Home</span>
            </Link>
        </li>
      <li>
        <Link href={'#'} onClick={() => setOpen1(!open1)} data-toggle="collapse" aria-controls="collapseKonten" aria-expanded={open1} className="dropdown-toggle">
            <span>Konten</span>
        </Link>
        <Collapse in={open1} id="collapseKonten">
        <ul className="list-unstyled">
            <li>
            <Link href={'/konten/identitasweb'} title="Identitas Web" alt="Identitas Web">
            <span>Identitas Web</span>
            </Link>
            </li>
            <li>
            <Link href={'/konten/profilweb'} title="Profil Web" alt="Profil Web">
            <span>Profil Web</span>
            </Link>
            </li>
            <li>
            <Link href={'/konten/caradaftar'} title="Profil Web" alt="Profil Web">
            <span>Cara Daftar</span>
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