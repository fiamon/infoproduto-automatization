import nodemailer from 'nodemailer';
import { env } from '../../env';

const transporterConfig = nodemailer.createTransport({
    host: 'mail.classipredio.com.br',
    port: 465,
    secure: true,
    auth: {
        user: env.MAILER_EMAIL,
        pass: env.MAILER_PASS,
    },
});

export async function sendMailToCustomer(receiverEmail: string) {
    transporterConfig.verify(function (error) {
        if (error) {
            return error;
        }
    });

    const email = await transporterConfig.sendMail({
        from: env.MAILER_EMAIL,
        to: receiverEmail,
        subject: 'Compra confirmada! Pegue seu produto aqui.',
        text: 'Sua compra na loja foi confirmada! O produto está em anexo.',
    });

    console.log(`📨 Message sent: ${email.messageId}`);
}
