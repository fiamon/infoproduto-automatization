import nodemailer from 'nodemailer';
import { env } from '../../env';

const transporterConfig = nodemailer.createTransport({
    host: 'smtp.forwardemail.net',
    port: 465,
    secure: true,
    auth: {
        user: env.MAILER_EMAIL,
        pass: env.MAILER_PASS,
    },
});

export async function sendMailToClient(receiverEmail: string) {
    const email = await transporterConfig.sendMail({
        from: env.MAILER_EMAIL,
        to: receiverEmail,
        subject: 'Compra confirmada! Pegue seu produto aqui.',
        text: 'Sua compra na loja foi confirmada! O produto segue em anexo.',
    });

    console.log(`📨 Message sent: ${email.messageId}`);
}
