const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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') //ApiKey created in sendGrid
function sendMail(to, subject, text) {

    const msg = {
        to: to,
        from: 'somosfundacionmas.argentina@gmail.com', // Use the email address or domain you verified above
        subject: subject,
        text: text,
        html: `<p>${text}</p>`,
    }
    sgMail.send(msg).then(() => {}, error => {
        console.log(error);
        if (error.response) {
            console.log(error.response.body)
        }
    })
};


module.exports = sendMail;