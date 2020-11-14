import React, {useState} from 'react';
import Link from 'next/link';
//import {X} from 'react-bootstrap-icons'

const SearchResults = (props) => {
  
  const options = props.data.map(r => (
  <div className="text-dark" key={r.id_seminar}>
    <h6><Link to={"/detail/"+r.id_seminar}>{r.nm_seminar}</Link> - <small>{r.tgl_seminar}</small></h6>
  </div>
   
  ))

  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div id="searchResult" className="col-md-5" style={{paddingLeft:0}}  onClick={() => setShow(false) + window.location.reload(true)}>
        
      <div className="card card-body" style={{maxHeight:'250px',overflowY: 'auto'}} >
      <div className="d-flex justify-content-end">
          <a href="#/" className="text-dark" >
            X
          </a>
        </div>
       {options}

      </div>
      
   </div>
    );
    
  }
  return true;
}

export default SearchResults