export const imageList = () => {
    return { type : 'IMAGELIST'}
} ;
export const pushImage = (payload) => {
   return {
      type: 'UPLODAIMAGE',
      payload
   }
}