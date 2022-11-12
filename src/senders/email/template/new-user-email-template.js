import config from '../../../config/config.js'

export const newUserEmailTemplate = (user_data) => {
    const mailOptions = {
    from: `${config.CONTACT_EMAIL.SAC.ALIAS} <${config.CONTACT_EMAIL.SAC.EMAIL}>`,
    to: `${config.CONTACT_EMAIL.ADMIN.ALIAS} <${config.CONTACT_EMAIL.ADMIN.EMAIL}>`,
    subject: 'Nuevo usuario registrado: ' + user_data.username,
    html: `
        <h1>Nuevo usuario registrado: ${user_data.name}</h1>
        <p><b>Nombre:</b> ${user_data.name}</p>
        <p><b>Email:</b> ${user_data.username}</p>
        <p><b>Edad:</b> ${user_data.age}</p>
        <p><b>Dirección:</b> ${user_data.address}</p>
        <p><b>Teléfono:</b> ${user_data.phone}</p>
        <p><img src="${user_data.photo}" width="100px"/></p>
        `,
    }
    return mailOptions
}
