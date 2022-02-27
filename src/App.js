import React,{ useEffect } from 'react'
import axios from 'axios'
import { useDispatch}  from 'react-redux'
import ImageListing from './Components/ImageListing'
import ImageDescription from './Components/ImageDescription'
import {API_KEY,URL,URLPARAM } from './Constant'
import { pushImage } from './Actions'

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
      <div>
        <h1>Image Approval Application</h1>
        <ImageListing/>
        <ImageDescription/>
      </div>
  );
}

export default App;
