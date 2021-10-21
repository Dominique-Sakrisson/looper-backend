const nodemailer = require('nodemailer')

module.exports = class EmailService {
    

    static async sendVerifySignUp(newUser){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_EMAIL_ADDRESS,
                pass: process.env.MAILER_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.MAILER_EMAIL_ADDRESS,
            to: newUser.email,
            subject: 'Looper Nw User Email Verification',
            text: ''
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log('error: ' + error);
            }
            else{
                console.log("email send: " + info.response);
            }
        })
    }   
}
