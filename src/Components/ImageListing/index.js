import React from 'react'
//import PropTypes from 'prop-types'
import { useSelector }  from 'react-redux'

const ImageListing = (props)=>{
    let imageList = useSelector(state => state.uploadImage);
    imageList = Object.values(imageList);
    if(imageList.length<1) return null;
    return (
        <div>
            {
                imageList && imageList.map(imageData => {
                    const {isVisited, isRejected, id } = imageData;
                    if(isVisited && !isRejected){
                        return (
                            <div>
                                {id}
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

// ImageListing.propTypes = {

// }

export default ImageListing

