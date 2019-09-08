const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: functions.config().mailer
});

const sendAdmissionMail = (user, isAccepted) => {
  const mailOptions = {
    from: 'LleidaHack <lleidahack@gmail.com>',
    to: user.email,
    subject: 'Admisión HackEPS 2019',
  };

  if (isAccepted) {
    mailOptions['html'] = `
    ¡Saludos, <b>${user.nickname}</b>!
    <p>
    Hemos recibido tu solicitud para participar en esta nueva edición de la HackEPS.
    </p>
    <p>
    Nos emociona informarte que has sido admitido oficialmente para participar en la HackEPS2019 y por tanto te esperamos con los brazos abiertos y el Wifi preparado el próximo 23 de Noviembre en la Escuela Politécnica Superior de la Universidad de Lleida (Campus de Cappont. Calle Jaume II, 69. 25001 Lleida) entre las 8:30 y 10:30 para realizar el Check-In.
    </p>
    <p>
    Recuerda, si aún no lo has hecho, registrar tu equipo en la página para agilizar el proceso de llegada. Si no tienes equipo no te preocupes: podemos ayudarte a encontrar uno.
    </p>
    <p>
    También queremos pedirte que ante cualquier imprevisto o cambio de planes contactes con nosotros a través del correo lleidahack@gmail.com con la mayor brevedad para poder gestionarlo cuanto antes.
    </p>
    <p>
    Si tienes cualquier pregunta, no dudes en contactar con nosotros mediante un correo a lleidahack@gmail.com, Twitter o Instagram.
    </p>
    <p>
    ¡Nos vemos en la HackEPS!
    </p>
    <img src="https://drive.google.com/uc?export=view&id=1SqRZqcu-EHqKSzUF9-4t7ZY2JeHnN_tA"/>
    `;
  } else {
    mailOptions['html'] = `
    Saludos <b>${user.nickname}</b>,
    <p>
    hemos recibido tu inscripción para participar en la <b>HACKEPS2019</b>.
    </p>
    <p>
    Lamentablemente, debido a las quejas recibidas durante ediciones pasadas por la actitud y el incumplimiento del código de conducta de la hackatón, nos hemos visto obligados a rechazar su solicitud.
    </p>
    <p>
    Un saludo.
    </p>
    <img src="https://drive.google.com/uc?export=view&id=1SqRZqcu-EHqKSzUF9-4t7ZY2JeHnN_tA"/>
    `;
  }

  return transporter.sendMail(mailOptions);
}

exports.updateAdmission = functions.firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    const newUser = change.after.data();
    const oldUser = change.before.data();

    if (oldUser.accepted !== newUser.accepted &&
        newUser.accepted !== 'PENDENT') {
      return sendAdmissionMail(newUser, newUser.accepted === 'YES');
    }
    return new Promise(resolve => resolve());
  });
