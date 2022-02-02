const nodemailer = require('nodemailer');

let fromMail = 'jaanurasiri1968@gmail.com';
let toMail = 'pavaudeshi@yahoo.com';
let subject = 'test sending email';
let text = "this is the body of the mail" 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: fromMail ,
        pass: '0712802283'
    }
    });


let mailOptions = {
        from: fromMail,
        to: toMail,
        subject: subject,
        text: text
        };

transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
            }
            console.log(response)
            });