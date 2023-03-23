import React,{useState} from 'react';
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

export default function IssueCredential() {

  const [schema,selectedSchema] = useState('');
  const [credDef,selectedCredDef] = useState('');
  const [connection,selectedConnection] = useState('');

  let counter1=0;
  const handleSchemaDropdownValue = async() =>{

    if(counter1 == 0 && document.getElementById('dropId').innerText==="Select the schema"){
        var instance = getAx();
        var response =  await instance.get(`${agentUrl}/schemas/created`);
        console.log("this is the response ",response);
        for (let index = 0; index < response.data.schema_ids.length; index++) {
          var dropDownId = document.getElementById('dropId');
          var dropDownAtt = document.createElement('option');
          dropDownAtt.innerText =response.data.schema_ids[index];
          dropDownId.appendChild(dropDownAtt);
          counter1++;
        }
    }else{}
  }
  let counter2=0;
  const handleCredDefDropdownValue = async()=> {
    if(counter2 == 0 && document.getElementById('dropId1').innerText==="Select the Credential definition"){
      var instance = getAx();
      var response =  await instance.get(`${agentUrl}/credential-definitions/created`);
      console.log("this is the response ",response);
      for (let index = 0; index < response.data.credential_definition_ids.length; index++) {
        var dropDownId = document.getElementById('dropId1');
        var dropDownAtt = document.createElement('option');
        dropDownAtt.innerText =response.data.credential_definition_ids[index];
        dropDownId.appendChild(dropDownAtt);
        counter2++;
      }
    }else{}
  }

  let counter3=0;
  const handleConnectionDropdownValue = async()=>{
    if(counter3 == 0 && document.getElementById('dropId2').innerText==="Select the Connection ID"){
      var instance = getAx();
      var response = await instance.get(`${agentUrl}/connections`);
      console.log("this is the response",response.data.results);
      for (let index = 0; index < response.data.results.length; index++) {
        if(response.data.results[index].rfc23_state === "completed"){
          var dropDownId = document.getElementById('dropId2');
          var dropDownAtt = document.createElement('option');
          dropDownAtt.innerText =response.data.results[index].connection_id;
          dropDownId.appendChild(dropDownAtt);
        }
        counter3++;
      }
    }else{}
  }

  const handleCredPreview = async()=>{
    var send_offer = {
      "auto_remove": true,
      "comment": "string",
      "connection_id": "89bb170c-f362-42c0-95ce-09d930811f91",
      "cred_def_id": "CdeD7bX2JdwFX4wvJRywG1:3:CL:20:Degree_Credential",
      "credential_proposal": {
        "@type": "issue-credential/1.0/credential-preview",
        "attributes": [
          {
            "name": "University_Name",
            "value": "IIT-M"
          },
          {
            "name": "First_Name",
            "value": "Ftest"
          },
          {
            "name": "Last_Name",
            "value": "Ltest"
          },
          {
            "name": "Middle_name",
            "value": "Mtest"
          },
          {
            "name": "Program_Name",
            "value": "Ptest"
          },
          {
            "name": "Specialization",
            "value": "Stest"
          },
          {
            "name": "Awarded_On_dateint",
            "value": "Atest"
          }
        ]
      },
      "issuer_did": "CdeD7bX2JdwFX4wvJRywG1",
      "schema_id": "CdeD7bX2JdwFX4wvJRywG1:2:degree_schema:1.0",
      "schema_issuer_did": "CdeD7bX2JdwFX4wvJRywG1",
      "schema_name": "degree_schema",
      "schema_version": "1.0",
      "trace": true

    }
  }
  return (
   <>
    <div className="container my-3">
        <select className="form-select" aria-label="Default select example" id='dropId' onMouseEnter={handleSchemaDropdownValue} onChange={(e)=>{selectedSchema(e.target.value)}}>
          <option defaultValue>Select the schema</option>
        </select>
      </div>
      <div className="container my-3">
        <select className="form-select" aria-label="Default select example" id='dropId1' onMouseEnter={handleCredDefDropdownValue} onChange={(e)=>{selectedCredDef(e.target.value)}}>
          <option defaultValue>Select the Credential definition</option>
        </select>
      </div>
      <div className="container my-3">
        <select className="form-select" aria-label="Default select example" id='dropId2' onMouseEnter={handleConnectionDropdownValue} onChange={(e)=>{selectedConnection(e.target.value)}}>
          <option defaultValue>Select the Connection ID</option>
        </select>
        <button className="btn btn-primary my-2" onClick={handleCredPreview}>See preview</button>
      </div>
   </>
  )
}


