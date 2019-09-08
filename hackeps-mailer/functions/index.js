const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors')({origin: true});
admin.initializeApp();

// TODO: Set password as environment variable
const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',

  auth: {
    user: 'lleidahack@gmail.com',
    pass: 'xxxxxx'
  }}
  )
);

const sendAdmissionMail = (user, isAccepted) => {
  const mailOptions = {
    from: 'LleidaHack <lleidahack@gmail.com>', 
    to: user.email,
    subject: 'Admisión HackEPS 2019', // email subject
  };
  
  if (isAccepted) {
    mailOptions['html'] = "Felicidades, has sido aceptado como participante de la HackEPS 2019"
  } else {
    mailOptions['html'] = "Lo sentimos... Este año tu petición no ha sido aceptada. Te esperamos el año que viene."
  }

  return transporter.sendMail(mailOptions, (error, info) => {
    // TODO: Log errors to firestore
    if (error) {
      return res.send(error.toString());
    }
    return res.send('Sended');
  });
}

exports.updateAdmission = functions.firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    const oldUser = change.after.data();
    const newUser = change.before.data();

    if (oldUser.accepted !== newUser.accepted) {
      this.sendMail(newUser, newUser.accepted === 'YES');
    }
  });