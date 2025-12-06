import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, token, baseUrl) {
    const verificationUrl = `${baseUrl}/verify-email/${token}`;

    try {
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: email,
            subject: 'Vérifiez votre adresse email - ProOccaz',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">ProOccaz</h1>
              <p style="color: rgba(255,255,255,0.9); margin-top: 8px;">Marketplace B2B d'Équipements d'Occasion</p>
            </div>
            <div style="padding: 40px;">
              <h2 style="color: #1f2937; margin-top: 0;">Bienvenue sur ProOccaz ! 👋</h2>
              <p style="color: #4b5563; line-height: 1.6;">
                Merci de vous être inscrit. Pour activer votre compte et commencer à acheter ou vendre du matériel professionnel, cliquez sur le bouton ci-dessous.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  ✅ Vérifier mon email
                </a>
              </div>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
                <a href="${verificationUrl}" style="color: #3b82f6; word-break: break-all;">${verificationUrl}</a>
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
              <p style="color: #9ca3af; font-size: 12px; text-align: center;">
                Ce lien expire dans 24 heures. Si vous n'avez pas créé de compte, ignorez cet email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
        });

        if (error) {
            console.error('Email error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Send email error:', error);
        return { success: false, error: error.message };
    }
}

export async function sendPasswordResetEmail(email, token, baseUrl) {
    const resetUrl = `${baseUrl}/reset-password/${token}`;

    try {
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: email,
            subject: 'Réinitialisez votre mot de passe - ProOccaz',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">ProOccaz</h1>
              <p style="color: rgba(255,255,255,0.9); margin-top: 8px;">Réinitialisation du mot de passe</p>
            </div>
            <div style="padding: 40px;">
              <h2 style="color: #1f2937; margin-top: 0;">Mot de passe oublié ? 🔐</h2>
              <p style="color: #4b5563; line-height: 1.6;">
                Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour en créer un nouveau.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  🔄 Réinitialiser mon mot de passe
                </a>
              </div>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                Si le bouton ne fonctionne pas, copiez ce lien :<br>
                <a href="${resetUrl}" style="color: #dc2626; word-break: break-all;">${resetUrl}</a>
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
              <p style="color: #9ca3af; font-size: 12px; text-align: center;">
                Ce lien expire dans 1 heure. Si vous n'avez pas fait cette demande, ignorez cet email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
        });

        if (error) {
            console.error('Email error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Send email error:', error);
        return { success: false, error: error.message };
    }
}
