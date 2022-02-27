import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { pushImage } from '../../Actions'

// import PropTypes from 'prop-types'

const ImageDescription = (props)=>{
    const [counter, setCounter] = useState(0);
    const [image, setImage] = useState()
    const dispatch = useDispatch();
    const imageList = useSelector(state => state.uploadImage);
    useEffect(()=>{
        let selectImage  = null;
        if(imageList && imageList[counter] && !imageList[counter].isVisited && !imageList[counter].isRejected){
            selectImage = imageList[counter];
        }
        setImage(selectImage);
    },[counter])
    
    const renderImage = () => {
        let selectImage  = null;
        if(!imageList[counter].isVisited && !imageList[counter].isRejected){
            selectImage = imageList[counter];
        }else{
            setCounter(counter+1);
        }
        console.log(selectImage);
        setImage(selectImage);
    }
    const visitedImage = (imageId, type) => {
        let actionType; 
        let keyTpe ;
        switch(type){
            case 'selected' :
                actionType = 'selectedID';
                keyTpe = 'isVisited';
                break;
            case 'rejected' :
                actionType = 'rejectedID';
                keyTpe = 'isRejected';
                break;
            default: break;
        }
        const storedIDs = JSON.parse(localStorage.getItem(actionType)) || {};
        const setID = {
            ...storedIDs,
            [imageId]: true
        }   
        localStorage.setItem(actionType,JSON.stringify(setID));
        const newListOfImages = {...imageList}
        newListOfImages[counter][keyTpe] = true;
        dispatch(pushImage(newListOfImages));
        setCounter(counter+1);
    }
    return image ? (
        <div>
            <h3>{image.id}</h3>
            <img src={image.urls.regular}/>
            <button onClick = {()=>visitedImage(image.id,'rejected')}> Reject </button>
            <button onClick = {()=>visitedImage(image.id,'selected')}> Accept </button>
        </div>
    ) :(
        <div>
            <button onClick={()=>renderImage()}>+</button>
        </div>
    )
}

// ImageDescription.propTypes = {

// }

export default ImageDescription;
