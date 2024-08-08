const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marjory.corkery15@ethereal.email',
        pass: 'MfXe7gTfkUnS4CWKC5'
    }
});
async function sendMail (req, res) {

    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <balram.saini@brainvire.com>', // sender address
        to: "bsa61405@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);

      res.json(info)
}

module.exports = {
    sendMail
}
