import React,{useState} from 'react'
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

export default function Schema() {
  const [schema,setSchema] = useState({
    
      "attributes": [
        "score"
      ],
      "schema_name": "prefs",
      "schema_version": "1.0"
    
});

  const [schemaName,setSchemaName] = useState('');
  const [schemaVersion,setSchemaVersion] = useState('');
  const [schemaAttr,setSchemaAttr] = useState([""]);


  const updateSchemaName=(event)=>{
    setSchemaName(event.target.value);
  }

  const updateSchemaAtt=(event)=>{
    setSchemaAttr(event.target.value);
  }

  const updateSchemaVersion=(event)=>{
    setSchemaVersion(event.target.value);
  }

  const createAndSubmitSchema=async()=>{
    console.log("the value of schema name is", schemaName);
    console.log("the value of schema version is", schemaVersion);
    console.log("the value of schema att is", schemaAttr);
    var schemaValue = {
      "attributes": JSON.stringify(schemaAttr.split(',')),
      "schema_name": schemaName,
      "schema_version": schemaVersion
    }
    console.log("this is the value of schem value",schemaValue);
    const instance = getAx();
    var response = await instance.post(`${agentUrl}/schemas`,JSON.stringify({
    
      "attributes": JSON.stringify(schemaAttr.split(',')),
      "schema_name": schemaName,
      "schema_version": schemaVersion
    
}));
    console.log("this is the response",response.data);
    setSchema(schemaValue);
    console.log("this is the value of schema",schema);
  }

  return (
    <>
    <div className='container my-4'>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="schema name" value={schemaName} onChange={updateSchemaName}/>
        <label htmlFor="floatingInput">Schema name</label>
    </div>
    <div className="form-floating">
      <input type="text" className="form-control" id="floatingPassword" placeholder="Schema version" value={schemaVersion} onChange={updateSchemaVersion}/>
      <label htmlFor="floatingPassword">Schema version</label>
    </div>
    <div className="form-floating my-4">
      <input type="text" className="form-control" id="floatingPassword" placeholder="Schema attributes" value={schemaAttr} onChange={updateSchemaAtt}/>
      <label htmlFor="floatingPassword">Schema attributes</label>
    </div>
      {/* <div className="mb-3 my-4">
        <label htmlFor="exampleFormControlTextarea1" className="form-label" >Schema preview</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" value={JSON.stringify(schema)} onChange={updateSchema} ></textarea>
        <button className="btn btn-primary my-1">Submit schema</button>
      </div> */}
      <button className="btn btn-primary my-1" onClick={createAndSubmitSchema}>Submit schema</button>
    </div>
    </>
  )
}
