import React from 'react'
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

  const handleCreate = async() =>{
    const instance = getAx();
    var response = await instance.post(`${agentUrl}/connections/create-invitation`);
    document.getElementById('exampleFormControlTextarea1').innerHTML = JSON.stringify(response.data);

  }
  return (
    <>
      <div className="container">
        <button className="btn btn-primary my-3 mx-19 " onClick={handleCreate}>Create invitation</button>
        <div className="mb-3 my-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label" >Invitation</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" ></textarea>
        </div>
      </div>
    </>
  )
}
