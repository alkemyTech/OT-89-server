const sgMail = require('@sendgrid/mail')
const config = require('../config')

sgMail.setApiKey(config.SENDGRIND_API_KEY) //ApiKey created in sendGrid
function sendMail(to, subject, text) {

    const msg = {
        to: to,
        from: 'somosfundacionmas.argentina@gmail.com', // Use the email address or domain you verified above
        subject: subject,
        text: text,
        html: `<p>${text}</p>`,
    }
    try {
        sgMail.send(msg)
    } catch (error) {
        return error.code
    }
    
        

};


module.exports = sendMail;