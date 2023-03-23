import React, { useState } from 'react'
import axios from 'axios';

const agentUrl = process.env.REACT_APP_ISSUER_URL;


const getAx =() =>{
      const instance = axios.create({
      baseURL: process.env.REACT_APP_ISSUER_URL,
      // timeout: 1000,
      headers: {'Content-type': 'application/json'}
      });
      return instance;
      
  }
export default function CreateInvitation() {

  const [inviAlias,setAlias] = useState('');
  const handleCreate = async() =>{
    const instance = getAx();
    var response = await instance.post(`${agentUrl}/connections/create-invitation?alias=${inviAlias}`);
    document.getElementById('exampleFormControlTextarea1').innerHTML = JSON.stringify(response.data,null,2);
    

  }
  return (
    <>
      <div className="container">
          <div className="mb-3 my-4">
              <label className="form-label" >Give unique name to this invitation</label>
              <textarea className="form-control" rows="2"  value={inviAlias} onChange={(e)=>{setAlias(e.target.value)}}></textarea>
          </div>
        <button className="btn btn-primary my-3 mx-19 " onClick={handleCreate}>Create invitation</button>
        <div className="mb-3 my-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label" >Invitation</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" ></textarea>
        </div>
      </div>
    </>
  )
}
