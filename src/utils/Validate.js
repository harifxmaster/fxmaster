import * as errorCodes from './ValidationErrors';
import moment from 'moment';

const Validate = (value,rules,customErrorMsg,customminerr) => {
    let isValid = true;
    let tmpErrorMsg = "";
    let tmpisValid;
    let errorMsg = "";
    let checkval;
    if(value instanceof Array && value[0] !== undefined){
        checkval = value[0]
    }else{
        if(value instanceof Array && value[0] === undefined)
            checkval =  '';
        else 
        checkval = value;
    }

for(let rule in rules){
    switch(rule){
        case "minLength":
            if(checkval = '' || checkval.length == 0){
                tmpisValid = true
            }else{
                tmpisValid = minLengthValidator(checkval,rules[rule]);
            }
            tmpErrorMsg = !tmpisValid ? (customminerr && customminerr !== "" ? customminerr :errorCodes.MIN_LENGTH_ERR):""
            isValid = isValid && tmpisValid
            if(!tmpisValid)
            errorMsg = setErrorMsg(errorMsg,tmpErrorMsg)
        break;

        case "maxLength":
            tmpisValid = maxLengthValidator(checkval,rules[rule]);
            tmpErrorMsg =!tmpisValid ? errorCodes.MAX_LENGTH_ERR : ""
            isValid = isValid && tmpisValid
            if(!tmpisValid)
            errorMsg = setErrorMsg(errorMsg, tmpErrorMsg)
        break;

        case "isRequired":
            if(rules[rule] === true){
                tmpisValid = requiredValidator(checkval);
                tmpErrorMsg = !tmpisValid ? (customErrorMsg && customErrorMsg != "" ? customErrorMsg : errorCodes.MANDATORY_ERR):''
                isValid = isValid && tmpisValid
                if(!tmpisValid)
                errorMsg= setErrorMsg(errorMsg,tmpErrorMsg)
            break;
            }else{
                errorMsg = '';
                isValid = true;
                break;
            }

        case "isNumber":
            tmpisValid = numberValidator(checkval);
            tmpErrorMsg = !tmpisValid ? errorCodes.NUMBER_ERR : ''
            isValid = isValid && tmpisValid
            if(!tmpisValid)
            errorMsg = setErrorMsg(errorMsg,tmpErrorMsg)
        break;

        case "isAlpha":
            tmpisValid = alphaValidator(checkval);
            tmpErrorMsg = !tmpisValid ? errorCodes.ALPHA_ERR :''
            isValid = isValid && tmpisValid
            if(!tmpisValid)
            errorMsg= setErrorMsg(errorMsg,tmpErrorMsg)
        break;

        case "isEmail":
            tmpisValid = emailValidator(checkval);
            tmpErrorMsg = !tmpisValid ? errorCodes.EMAIL_ERR : ''
            isValid = isValid && tmpisValid
            if(!tmpisValid)
            errorMsg =setErrorMsg(errorMsg, tmpErrorMsg)
        break;

        case "isDate":
            tmpisValid = dateValidator(checkval,rules[rule]);
            tmpErrorMsg = !tmpisValid ? errorCodes.IS_DATE : ''
            isValid = isValid && tmpisValid
            if(!tmpisValid)
            errorMsg= setErrorMsg(errorMsg,tmpErrorMsg)
        break;
    }
}
return {
    valid:isValid,
    errorMsg:errorMsg
}

}

const setErrorMsg = (ErrMessage, message) => {
    let resMessage;
    if(ErrMessage.length > 0){
        resMessage = ErrMessage.concat(',',message)
    }else
    resMessage = message
    return resMessage
}

const minLengthValidator =(value, minLength) => {
    return value.length>= minLength
}

const maxLengthValidator = (value,maxLength) => {
    return value.length <= maxLength
}   

const requiredValidator = (value) => {
return value != null ? (value.toString().trim() !== ""): false;
}

const numberValidator = (value) => {
if(value.length > 0 ){
    const pattern = /^[0-9]+$/
    return pattern.test(value)
}else
return true;
}

const alphaValidator = (value) => {
    if(value.length > 0 ){
        const pattern = /^[a-zA-Z]+$/
        return pattern.test(value)
    }else
    return true;
}

const emailValidator = (value) => {
if(value.length > 0){
    var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(value).toLowerCase());
}
else
return true
}

const dateValidator = () => {
     return moment (value,"DD/MM/YYYY", true).isValid()
}

export default Validate;