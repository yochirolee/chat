const moment=require('moment');

module.exports=function formatMessage(username,text){
    return {
        username,
        text,
        time:moment().format('h:mm a')
    };
};