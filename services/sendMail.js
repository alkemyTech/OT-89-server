const sgMail = require('@sendgrid/mail')
const config = require('../config')

sgMail.setApiKey('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') //ApiKey created in sendGrid
function sendMail(to, subject, text) {

    const msg = {
        to: to,
        from: 'somosfundacionmas@gmail.com', // Use the email address or domain you verified above
        subject: subject,
        text: text,
        html: `<strong>${text}}</strong>`,
    }
    sgMail.send(msg).then(() => {}, error => {
        console.log(error);
        if (error.response) {
            console.log(error.response.body)
        }
    })
};

module.exports = sendMail;