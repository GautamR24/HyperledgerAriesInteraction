import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Card from './Card';

const agentUrl = process.env.REACT_APP_ISSUER_URL;


const getAx =() =>{
      const instance = axios.create({
      baseURL: process.env.REACT_APP_ISSUER_URL,
      // timeout: 1000,
      headers: {'Content-type': 'application/json'}
      });
      return instance;
      
  }
export default function Connection() {

// var cardId = document.getElementById('cardId');
// var cardAtt1 = document.createElement('div');
// cardAtt1.className = "card";
// cardAtt1.style.width = "18rem";
// var cardAtt2 = document.createElement('div');
// cardAtt2.className = "card-body";
// var cardAtt3 = document.createElement('p');
// cardAtt3.innerText = "some quick";
// cardId.appendchild(cardAtt1);
// cardId.appendchild(cardAtt2);
// cardId.appendchild(cardAtt3);
let invitationArray = [];

const handleConnections=async()=>{
    const instance = getAx();
    var response = await instance.get(`${agentUrl}/connections?state=completed`);
    console.log("this is the response",response.data);
    invitationArray = response.data.results;
    for(let i=0;i<invitationArray.length;i++){
        console.log(`this is ${i} value`,invitationArray[i]);
    } 
}

//useEffect(() => console.log("this is the value",invitationCreated), [invitationCreated]);

return (
    <>
    <div className='container'>
        <button className="btn btn-primary my-3" onClick={handleConnections}>See all the connections</button>
        
        {
            invitationArray.map((element)=>(
                <p>{element}</p>
            ))
        }
        </div>
    </>
  )
}
