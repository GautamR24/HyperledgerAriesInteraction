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


export default function Definition() {
  let counter=0;
  const handleDropdownValue = async()=>{
    if(counter === 0){
    var instance = getAx();
    var response = await instance.get(`${agentUrl}/credential-definitions/created`);
    console.log("this is the response", response.data);
    for(let i=0;i<response.data.credential_definition_ids.length;i++){
        var dropdownID = document.getElementById('dropId');
        var dropdownAtt = document.createElement('option');
        dropdownAtt.innerText = JSON.stringify(response.data.credential_definition_ids[i]);
        dropdownID.appendChild(dropdownAtt);
        counter++;
        }
      }else{}
  }

  const handleDropdownSelection = async(value)=>{
    
    if(value === 'Select the credential'){
      document.getElementById('exampleFormControlTextarea1').innerText ='';
    }else{
          var instance = getAx();
          var response = await instance.get(`${agentUrl}/credential-definitions/${JSON.parse(value)}`);
          document.getElementById('exampleFormControlTextarea1').innerText = JSON.stringify(response.data);
        }
  }
  return (
    <>
      <div className="container my-3">
        <select className="form-select" aria-label="Default select example" id='dropId' onClick={handleDropdownValue} onChange={(e)=>{handleDropdownSelection(e.target.value)}}>
          <option defaultValue>Select the credential</option>
            {/* <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
        </select>
        <div className="mb-3 my-4">
          <label htmlFor="exampleFormControlTextarea1" className="form-label" >Credential definition preview</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" ></textarea>
        </div>
      </div>
    </>
  )
}
