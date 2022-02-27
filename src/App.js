import React,{ useEffect } from 'react'
import axios from 'axios'
import { useDispatch}  from 'react-redux'
import ImageListing from './Components/ImageListing'
import ImageDescription from './Components/ImageDescription'
import {API_KEY,URL,URLPARAM } from './Constant'
import { pushImage } from './Actions'
import styled from "styled-components";

const Wrapper = styled.div`
  width: 30%;
  padding: 30px;
  background: white;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    width: 80%;
  }
  margin: 0px auto;
  color: #777;

  & h1{
    font-size: 27px;
  }
`;

function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
    axios.get(`${URL}?${URLPARAM}=${API_KEY}`)
      .then(res => {
        const data = res.data;
        const acceptedIDs = JSON.parse(localStorage.getItem('selectedID')) || {};
        const rejectedIDs = JSON.parse(localStorage.getItem('rejectedID')) || {};
        data && data.map(imageData=>{
          const _imageData = imageData;
          const {id} = _imageData;
          if(acceptedIDs[id]){
            _imageData.isVisited = true;
          }
          if(rejectedIDs[id]){
            _imageData.isRejected = true;
          }
          return _imageData
        })

        dispatch(pushImage(data))
      })
  },[])
  return (
      <Wrapper>
        <h1>Image Approval Application</h1>
        <ImageListing/>
        <ImageDescription/>
      </Wrapper>
  );
}

export default App;
