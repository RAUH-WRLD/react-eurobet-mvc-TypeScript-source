const mailer = require("nodemailer");
const getEmailData = (to, text, subject) => {
    const data = {
        from: "Eurobet Authorization Bot <----------------------->",
        to,
        subject,
        html: `<p>${text}</p>`,
    };
    return data;
};
const sendEmail = (to, text, subject, res) => {
    const SMTPTransport = mailer.createTransport({
        service: "Hotmail",
        auth: {
            user: "-----------------------@hotmail.com",
            pass: "-----------------------",
        },
    });
    const mail = getEmailData(to, text, subject);
    SMTPTransport.sendMail(mail, (error, response) => {
        if (error) {
            console.log(error);
            SMTPTransport.close();
            res.status(400);
            return res.send(error);
        } else {
            console.log("Email sent successfully");
            SMTPTransport.close();
            return res.send("Email sent successfully");
        }
    });
};
module.exports = {sendEmail};
