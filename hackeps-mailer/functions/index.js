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
    subject: 'Admisión HackEPS 2021',
  };

  if (isAccepted) {
    mailOptions['html'] = `
    ¡Saludos, <b>${user.nickname}</b>!
    <p>
    Hemos recibido tu solicitud para participar en esta nueva edición de la HackEPS.
    </p>
    <p>
    Nos emociona informarte de que has sido admitido oficialmente para participar en la HackEPS2020 y por tanto te esperamos con los brazos digitalmente abiertos el próximo 28 de Noviembre en Twitch y Discord entre las 8:30 y las 10:00 para realizar el Check-In, se dará más información mediante nuestras redes sociales en fechas próximas al evento. ¡Así que estate atento!
    </p>
    <p>
    <b>Recuerda, si aún no lo has hecho, registrar tu equipo en la página para agilizar el proceso de llegada. Si no tienes equipo no te preocupes: podemos ayudarte a encontrar uno.</b>
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
    Hemos recibido tu inscripción para participar en la <b>HACKEPS2020</b>.
    </p>
    <p>
    Lamentablemente nos hemos visto obligados a rechazar su solicitud, si tiene alguna pregunta en question puede contactar con nosotros por correo lleidahack@gmail.com, Twitter @hackeps o Instagram @hackeps_.
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
  .document('hackeps-2021/prod/users/{userId}')
  .onUpdate((change, context) => {
    const newUser = change.after.data();
    const oldUser = change.before.data();

    if (oldUser.accepted !== newUser.accepted &&
        newUser.accepted !== 'PENDENT') {
      return sendAdmissionMail(newUser, newUser.accepted === 'YES');
    }
    return new Promise(resolve => resolve());
  });
