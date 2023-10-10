import * as errorCodes from './ValidationErrors';

const showErrorMessage = props => {
  console.log(props);
  const {errorMsg, validationRules} = properties;
  const errorMsgs = errorMsg.split(',');
  let errorStr = '';
  errorMsgs.forEach(errorCode => {
    switch (errorCode) {
      case errorCodes.MIN_LENGTH_ERR:
        errorStr = setErroMsg(
          errorStr,
          `Enter at least ${validationRules['minLength']} value`,
        );
        break;
      case errorCodes.MAX_LENGTH_ERR:
        errorStr = setErroMsg(
          errorStr,
          `Enter the ${validationRules['maxLength']} value`,
        );
        break;
      case errorCodes.MANDATORY_ERR:
        errorStr = setErroMsg(errorStr, 'Enter field value');
        break;
      case errorCodes.NUMBER_ERR:
        errorStr = setErroMsg(errorStr, 'Enter only numbers');
        break;
      case errorCodes.ALPHA_ERR:
        errorStr = setErroMsg(errorStr, 'Alpha field');
        break;
      case errorCodes.EMAIL_ERR:
        errorStr = setErroMsg(errorStr, 'Invalid email');
        break;
      case errorCodes.IS_DATE:
        errorStr = setErroMsg(errorStr, 'Select Date');
        break;
    }
  });
  return errorStr;
};

const setErroMsg = (ErrMessage, message) => {
    let resMessage;
    if(ErrMessage.length > 0){
        resMessage =  ErrMessage.concat(',',message)
    }
    else
    resMessage = message
return resMessage
}

export default showErrorMessage
