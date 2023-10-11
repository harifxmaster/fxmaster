const CommonHelper = {
    CustomError:(defaultError, CustomErrorObj = {}, errorOrderTop= false) => {
        let defaultErrorArray = defaultError.split(",");
        let singleError = defaultErrorArray.length > 1 ?
        defaultErrorArray[errorOrderTop ? 0 : defaultErrorArray.length -1] : defaultErrorArray[0]
        let returnError = singleError;
        for(let key in CustomErrorObj){
            if(key === singleError){
                returnError = CustomErrorObj[key];
            }
        }
        return returnError;
    },
    uniqueIdGenerator:() => {
        return Math.floor(100000000 + Math.random( ) * 900000000).toString();
    }

}

export default CommonHelper;