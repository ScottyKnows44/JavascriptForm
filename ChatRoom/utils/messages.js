const moment = require('moment');

function formatMessage(username, text){
    let time =  moment().format('h:mm a');
    return {
        username,
        text,
        time
    }
}
module.exports = formatMessage;