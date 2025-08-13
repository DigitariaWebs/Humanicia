import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type FormType = 'consultation' | 'service' | 'job' | 'partnership';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  details?: string;
  formType?: FormType;
  serviceName?: string;
  fileName?: string;
}

function getSubject({ name, formType, service, serviceName }: { name: string; formType?: FormType; service?: string; serviceName?: string; }) {
  const svc = service || serviceName;
  switch (formType) {
    case 'consultation':
      return `Nouvelle demande de consultation de ${name}`;
    case 'service':
      return `Nouvelle demande de service: ${svc || 'Service'} de ${name}`;
    case 'job':
      return `Nouvelle candidature de ${name}`;
    case 'partnership':
      return `Nouvelle demande de partenariat de ${name}`;
    default:
      return `Nouveau contact de ${name}`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData;
    const { name, email, phone, service, details, formType, serviceName, fileName } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user || 'no-reply@example.com';
    const to = process.env.CONTACT_EMAIL || user || '';

    if (!user || !pass || !to) {
      return NextResponse.json(
        { error: 'Email transport not configured on server' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = getSubject({ name, formType, service, serviceName });
    const brand = '#15803d';
    const cta = '#f97316';
    const muted = '#6b7280';

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { background:#f6f7f9; margin:0; padding:24px; font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#111827; }
    .container { max-width:640px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.06); }
    .header { padding:28px 24px; background: linear-gradient(135deg, ${brand} 0%, #0f5132 100%); color:#fff; text-align:center; }
    .header h1 { margin:0 0 6px; font-size:22px; font-weight:800; letter-spacing:0.2px; }
    .header p { margin:0; opacity:0.9; font-size:13px; }
    .content { padding:24px; }
    .badge { display:inline-block; background:${cta}; color:#fff; padding:6px 12px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:0.3px; }
    .grid { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px; margin-top:16px; }
    .item { border:1px solid #e5e7eb; border-radius:12px; padding:12px; background:#fff; }
    .label { font-size:11px; color:${muted}; text-transform:uppercase; letter-spacing:0.4px; margin-bottom:4px; }
    .value { font-size:15px; color:#111827; font-weight:600; }
    .section { margin-top:20px; background:#f9fafb; border-radius:12px; padding:16px; }
    .section h3 { margin:0 0 8px; font-size:14px; color:#111827; }
    .bubble { background:#fff; border-left:3px solid ${brand}; padding:12px; border-radius:8px; font-size:14px; color:#111827; }
    .actions { text-align:center; margin:24px 0 4px; }
    .btn { display:inline-block; text-decoration:none; font-weight:700; padding:10px 16px; border-radius:10px; color:#fff; margin:0 8px; }
    .btn-primary { background:${brand}; }
    .btn-cta { background:${cta}; }
    .footer { background:#111827; color:#fff; text-align:center; padding:16px; font-size:12px; }
    @media (max-width: 540px) { .grid { grid-template-columns: 1fr; } }
  </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${subject}</h1>
        <p>Humanicia — Formulaire de contact</p>
      </div>
      <div class="content">
        <div style="text-align:center; margin-bottom:12px;"> 
          <span class="badge">${(formType || 'contact').toUpperCase()}</span>
        </div>
        <div class="grid">
          <div class="item">
            <div class="label">Nom complet</div>
            <div class="value">${name}</div>
          </div>
          <div class="item">
            <div class="label">Adresse email</div>
            <div class="value"><a href="mailto:${email}" style="color:${brand}; text-decoration:none;">${email}</a></div>
          </div>
          <div class="item">
            <div class="label">Téléphone</div>
            <div class="value"><a href="tel:${phone}" style="color:${brand}; text-decoration:none;">${phone}</a></div>
          </div>
          ${(service || serviceName) ? `
          <div class="item">
            <div class="label">Service</div>
            <div class="value">${service || serviceName}</div>
          </div>` : ''}
          ${fileName ? `
          <div class="item">
            <div class="label">Fichier</div>
            <div class="value">${fileName}</div>
          </div>` : ''}
        </div>

        ${details ? `
        <div class="section">
          <h3>Détails</h3>
          <div class="bubble">${details.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        </div>` : ''}

        <div class="actions">
          <a class="btn btn-cta" href="mailto:${email}">Répondre par email</a>
          <a class="btn btn-primary" href="tel:${phone}">Appeler maintenant</a>
        </div>
      </div>
      <div class="footer">
        <div><strong>Humanicia</strong></div>
        <div style="opacity:0.8; margin-top:4px;">Cet email a été généré automatiquement depuis le site web.</div>
      </div>
    </div>
  </body>
</html>`;

    const text = `${subject}
==============================

INFORMATIONS CLIENT:
• Nom: ${name}
• Email: ${email}
• Téléphone: ${phone}
• Type de demande: ${formType || 'contact'}
${(service || serviceName) ? `• Service: ${service || serviceName}` : ''}
${fileName ? `• Fichier: ${fileName}` : ''}

${details ? `DÉTAILS:\n${details}\n\n` : ''}PROCHAINES ÉTAPES:
• Répondre dans les 24 heures
• Email: ${email}
• Téléphone: ${phone}
`;

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      replyTo: email,
    });

    return NextResponse.json({ message: 'Email envoyé avec succès!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: "Échec de l'envoi de l'email. Veuillez réessayer plus tard." }, { status: 500 });
  }
}


