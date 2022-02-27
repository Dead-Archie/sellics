import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { pushImage } from '../../Actions'
import styled from "styled-components";


const AddImageContainer = styled.div`
    & button {
        background: #d6d6d6;
        height: 500px;
        width: 100%;
        position: relative;
        color: #b8b4b4;
        font-size: 50px;
        border: 1px solid #b8b4b4;
      }

    & div {
        text-align:center;
        color:#777;
        padding : 6%;
    }
`;

const ImageContainer = styled.div`
    & img {
        background: #d6d6d6;
        height: 500px;
        width: 100%;
        position: relative;
        border: 1px solid #b8b4b4;
      }

    & div.buttonContainer {
        text-align:center;
        & button {
            
            width: 30%;
            margin: 10px;
            border: 1px solid #d6d6d6;
            border-radius: 5px;
        }
        & button.rejected {
            font-weight: bold;
            color: #777;
            font-size: 20px;
            padding: 10px;
        }
        & button.rejected:hover {
            background: #d6d6d6;
        }
        & button.accepted {
            color: #777;
            background: #d6d6d6;
            padding: 13px;
            position: relative;
            top: -2px;
        }
        & button.accepted:hover {
            background: #777;
            color: #d6d6d6;
        }
    }
`;

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
        <ImageContainer>
            <img src={image.urls.regular}/>
            <div className="buttonContainer">
                <button className="rejected" title="Rejected" onClick = {()=>visitedImage(image.id,'rejected')}> &#215; </button>
                <button className="accepted" title="Accepted" onClick = {()=>visitedImage(image.id,'selected')}> &#10004; </button>
            </div>
        </ImageContainer>
    ) :(
        <AddImageContainer>
            <button onClick={()=>renderImage()}>+</button>
            <div>
                Click on the <span>+</span> button in order to get image recommendations.
            </div>
        </AddImageContainer>
    )
}

export default ImageDescription;
