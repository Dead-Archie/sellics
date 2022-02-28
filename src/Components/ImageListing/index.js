import React from 'react'
import { useSelector }  from 'react-redux';
import styled from "styled-components";

const ImageListingWrapper = styled.div`
    & div.approveImage{
        overflow-x: auto;
        overflow-y: hidden;
        
        & div.imageSlider{
            width: ${props => props.maxWidth*120}px;
            & img.image {
                height:100px;
                width:100px;
                margin:10px;
            }
        }
    }
`;

const ImageListing = ()=>{
    let imageList = useSelector(state => state.uploadImage)||{};
    imageList = Object.values(imageList);
    if(imageList.length<1) return null;
    const approvedImageCount = imageList && imageList.filter(image => image.isVisited && !image.isRejected)
    return (
        <ImageListingWrapper maxWidth={approvedImageCount.length}>
            <h3>Approved Images ({approvedImageCount && approvedImageCount.length})</h3>
            <div className="approveImage">
                <div className="imageSlider">
                { 
                    imageList && imageList.map(imageData => {
                        const {isVisited, isRejected} = imageData;
                        if(isVisited && !isRejected){
                            return (<img className="image" key={imageData.id} src={imageData.urls.small}/>)
                        }
                    }) 
                }
                </div>
            </div>
        </ImageListingWrapper>
    )
}
export default ImageListing;

