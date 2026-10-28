const nodemailer = require('nodemailer');
const Setting = require('../models/Setting');
const memoryStore = require('../data/inMemoryStore');

/**
 * Get active site settings (MongoDB or memoryStore fallback)
 */
async function getSettings() {
  try {
    if (global.isMongoConnected) {
      const settings = await Setting.findOne();
      if (settings) return settings;
    }
  } catch (err) {
    console.error('Error fetching settings for Email Service:', err.message);
  }
  return memoryStore.settings || {};
}

/**
 * Create Nodemailer Transporter from process.env or settings
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || "realindiajourney02@gmail.com";
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "pdbsxfitacoeoqii";

  if (!host || !user || !pass) {
    return null; // Return null if SMTP not configured yet
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });
}

/**
 * Send Email notification for New Booking Enquiry
 */
async function sendEmailBookingNotification(enquiryData) {
  try {
    const settings = await getSettings();
    const recipientEmail = (process.env.NOTIFICATION_EMAIL || settings.notificationEmail || settings.email || 'realindiajourney02@gmail.com').trim();

    const name = enquiryData.fullName || enquiryData.name || 'Valued Guest';
    const phone = enquiryData.phone || 'Not provided';
    const email = enquiryData.email || 'Not provided';
    const country = enquiryData.country || 'Not specified';
    const packageName = enquiryData.destinationPreference || enquiryData.packageName || enquiryData.destination || enquiryData.serviceType || enquiryData.vehicleModel || 'General Expedition';
    const travelDate = enquiryData.travelDate || 'Flexible';
    const duration = enquiryData.duration || 'Not specified';
    const members = enquiryData.members || enquiryData.adults || '2 Members';
    const festivalInterest = enquiryData.festivalInterest || 'Not Particularly';
    const travelPreference = enquiryData.travelPreference || enquiryData.travelStyle || 'Luxury';
    const specialRequests = enquiryData.specialRequests || 'None';

    const mailSubject = `🚨 New Trip Enquiry: ${name} (${packageName})`;

    const mailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF7F2; padding: 30px 15px; color: #171717;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E8E2D6; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          
          <!-- Header Bar -->
          <div style="background-color: #171717; padding: 24px; text-align: center; border-bottom: 3px solid #B89A5A;">
            <h1 style="color: #FFFFFF; font-size: 20px; margin: 0 0 6px 0; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;">REAL INDIA JOURNEY</h1>
            <span style="color: #B89A5A; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">New Booking Enquiry Notification</span>
          </div>

          <!-- Body Content -->
          <div style="padding: 28px 24px;">
            <p style="font-size: 15px; color: #3A3A3A; margin-top: 0; line-height: 1.5;">
              You have received a new trip booking request from <strong>${name}</strong> via Real India Journey.
            </p>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #FAF7F2; border-radius: 8px; overflow: hidden; border: 1px solid #EADFCE;">
              <tbody>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; width: 35%; color: #8B6A3D;">Guest Name:</td>
                  <td style="padding: 12px 16px; color: #171717; font-weight: 600;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Phone / WhatsApp:</td>
                  <td style="padding: 12px 16px; color: #171717;"><a href="tel:${phone}" style="color: #B89A5A; font-weight: bold; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Email Address:</td>
                  <td style="padding: 12px 16px; color: #171717;"><a href="mailto:${email}" style="color: #B89A5A; font-weight: bold; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Country:</td>
                  <td style="padding: 12px 16px; color: #171717;">${country}</td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Destination / Package:</td>
                  <td style="padding: 12px 16px; color: #171717; font-weight: bold;">${packageName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Date of Visit & Duration:</td>
                  <td style="padding: 12px 16px; color: #171717;">${travelDate} (${duration})</td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Members / Guests:</td>
                  <td style="padding: 12px 16px; color: #171717;">${members}</td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Travel Preference:</td>
                  <td style="padding: 12px 16px; color: #171717; font-weight: 600;">${travelPreference}</td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Indian Festival Interest:</td>
                  <td style="padding: 12px 16px; color: #171717; font-weight: 600;">${festivalInterest}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Special Requests:</td>
                  <td style="padding: 12px 16px; color: #171717; line-height: 1.4;">${specialRequests}</td>
                </tr>
              </tbody>
            </table>

            <!-- Call to Actions -->
            <div style="text-align: center; margin-top: 25px;">
              <a href="mailto:${email}?subject=RE: Real India Journey Enquiry - ${encodeURIComponent(packageName)}" style="background-color: #B89A5A; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 14px; margin-right: 10px;">
                ✉️ Reply to ${name}
              </a>
              <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="background-color: #10B981; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 14px;">
                💬 WhatsApp Guest
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #FAF7F2; padding: 16px; text-align: center; border-top: 1px solid #E8E2D6; font-size: 12px; color: #777777;">
            Sent automatically by <strong>Real India Journey System</strong>.<br/>
            Target Email: <a href="mailto:${recipientEmail}" style="color: #B89A5A;">${recipientEmail}</a>
          </div>

        </div>
      </div>
    `;

    console.log('\n==================================================');
    console.log(`📧 [EMAIL NOTIFICATION TRIGGERED FOR ADMIN]`);
    console.log(`To: ${recipientEmail}`);
    console.log(`Subject: ${mailSubject}`);
    console.log(`Guest: ${name} (${phone}, ${email})`);
    console.log(`Package/Car: ${packageName}`);
    console.log('==================================================\n');

    const transporter = createTransporter();

    if (!transporter) {
      throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.');
    }

    const fromAddress = process.env.EMAIL_FROM || `"Real India Journey Team" <realindiajourney02@gmail.com>`;
    const replyToAddress = (email && email !== 'N/A' && email.includes('@')) ? email : (process.env.REPLY_TO_EMAIL || settings.email || 'realindiajourney02@gmail.com').trim();

    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      replyTo: replyToAddress,
      subject: mailSubject,
      html: mailHtml
    });

    console.log(`✅ [Email Service Success]: Sent admin email to ${recipientEmail} | Message ID: ${info.messageId}`);

    // Also send confirmation email to guest if guest email is provided
    if (email && email !== 'Not provided' && email.includes('@')) {
      await sendGuestBookingConfirmation(enquiryData, transporter, fromAddress);
    }

    return true;
  } catch (err) {
    console.error('❌ [Email Service Error]:', err.message);
    throw err;
  }
}

/**
 * Send Confirmation Email to Guest for Trip Enquiry
 */
async function sendGuestBookingConfirmation(enquiryData, transporter, fromAddress) {
  try {
    const guestEmail = (enquiryData.email || '').trim();
    if (!guestEmail || guestEmail === 'Not provided' || !guestEmail.includes('@')) {
      return false;
    }

    const name = enquiryData.fullName || enquiryData.name || 'Valued Guest';
    const packageName = enquiryData.destinationPreference || enquiryData.packageName || enquiryData.destination || enquiryData.serviceType || enquiryData.vehicleModel || 'India Expeditions';

    const mailSubject = `✨ Trip Request Received: Real India Journey - ${packageName}`;

    const mailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF7F2; padding: 30px 15px; color: #171717;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E8E2D6; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          
          <div style="background-color: #171717; padding: 24px; text-align: center; border-bottom: 3px solid #B89A5A;">
            <h1 style="color: #FFFFFF; font-size: 20px; margin: 0 0 6px 0; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;">REAL INDIA JOURNEY</h1>
            <span style="color: #B89A5A; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">Luxury Travel Specialist</span>
          </div>

          <div style="padding: 28px 24px;">
            <h2 style="color: #171717; font-size: 18px; margin-top: 0;">Namaste ${name},</h2>
            <p style="font-size: 15px; color: #3A3A3A; line-height: 1.6;">
              Thank you for choosing <strong>Real India Journey</strong>. We have successfully received your trip enquiry for <strong>${packageName}</strong>.
            </p>
            <p style="font-size: 14px; color: #5C5C5C; line-height: 1.6;">
              Our dedicated travel team is reviewing your request and will prepare a customized itinerary for you. We will contact you via WhatsApp/Email within <strong>2 hours</strong>.
            </p>

            <div style="background-color: #FAF7F2; border-radius: 8px; padding: 18px; margin: 20px 0; border: 1px solid #EADFCE;">
              <h4 style="margin: 0 0 10px 0; color: #8B6A3D; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Enquiry Summary</h4>
              <p style="margin: 4px 0; font-size: 13px; color: #3A3A3A;"><strong>Package / Service:</strong> ${packageName}</p>
              <p style="margin: 4px 0; font-size: 13px; color: #3A3A3A;"><strong>Travel Date:</strong> ${enquiryData.travelDate || 'Flexible'}</p>
              <p style="margin: 4px 0; font-size: 13px; color: #3A3A3A;"><strong>Members:</strong> ${enquiryData.members || '2 Members'}</p>
            </div>

            <p style="font-size: 14px; color: #3A3A3A; line-height: 1.6;">
              If you need immediate assistance, feel free to contact us via WhatsApp:
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://wa.me/919649605100" style="background-color: #10B981; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 14px;">
                💬 Chat Instant on WhatsApp Desk
              </a>
            </div>
          </div>

          <div style="background-color: #FAF7F2; padding: 16px; text-align: center; border-top: 1px solid #E8E2D6; font-size: 12px; color: #777777;">
            Real India Journey • Luxury Custom Expeditions & Private Chauffeur Travel<br/>
            Call: +91 96496 05100 | Email: info@realindiajourney.com
          </div>
        </div>
      </div>
    `;

    const replyToAddress = (process.env.REPLY_TO_EMAIL || 'realindiajourney02@gmail.com').trim();
    await transporter.sendMail({
      from: fromAddress,
      to: guestEmail,
      replyTo: replyToAddress,
      subject: mailSubject,
      html: mailHtml
    });
    console.log(`✅ [Guest Confirmation Email Success]: Sent confirmation email to guest (${guestEmail})`);
    return true;
  } catch (err) {
    console.error(`⚠️ [Guest Confirmation Email Error]: ${err.message}`);
    return false;
  }
}

/**
 * Send Email notification for Contact Form
 */
async function sendEmailContactNotification(contactData) {
  try {
    const settings = await getSettings();
    const recipientEmail = (process.env.NOTIFICATION_EMAIL || settings.notificationEmail || settings.email || 'realindiajourney02@gmail.com').trim();

    const name = contactData.fullName || contactData.name || 'Visitor';
    const phone = contactData.phone || 'N/A';
    const email = contactData.email || 'N/A';
    const subject = contactData.subject || 'General Inquiry';
    const message = contactData.message || contactData.comments || '';

    const mailSubject = `📩 New Website Message: ${subject} from ${name}`;

    const mailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF7F2; padding: 30px 15px; color: #171717;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E8E2D6; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          
          <div style="background-color: #171717; padding: 24px; text-align: center; border-bottom: 3px solid #B89A5A;">
            <h1 style="color: #FFFFFF; font-size: 20px; margin: 0 0 6px 0; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;">REAL INDIA JOURNEY</h1>
            <span style="color: #B89A5A; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">New Contact Message Notification</span>
          </div>

          <div style="padding: 28px 24px;">
            <p style="font-size: 15px; color: #3A3A3A; margin-top: 0;">
              You have received a new contact message from <strong>${name}</strong>:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #FAF7F2; border-radius: 8px; overflow: hidden; border: 1px solid #EADFCE;">
              <tbody>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; width: 30%; color: #8B6A3D;">Name:</td>
                  <td style="padding: 12px 16px; color: #171717; font-weight: 600;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Email:</td>
                  <td style="padding: 12px 16px; color: #171717;"><a href="mailto:${email}" style="color: #B89A5A; font-weight: bold;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Phone:</td>
                  <td style="padding: 12px 16px; color: #171717;">${phone}</td>
                </tr>
                <tr style="border-bottom: 1px solid #EADFCE;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Subject:</td>
                  <td style="padding: 12px 16px; color: #171717; font-weight: bold;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-weight: bold; color: #8B6A3D;">Message:</td>
                  <td style="padding: 12px 16px; color: #171717; line-height: 1.5;">${message}</td>
                </tr>
              </tbody>
            </table>

            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}?subject=RE: ${encodeURIComponent(subject)}" style="background-color: #B89A5A; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                ✉️ Reply to ${name}
              </a>
            </div>
          </div>

          <div style="background-color: #FAF7F2; padding: 16px; text-align: center; border-top: 1px solid #E8E2D6; font-size: 12px; color: #777777;">
            Target Email: <a href="mailto:${recipientEmail}" style="color: #B89A5A;">${recipientEmail}</a>
          </div>

        </div>
      </div>
    `;

    console.log('\n==================================================');
    console.log(`📧 [EMAIL CONTACT ALERT TRIGGERED FOR ADMIN]`);
    console.log(`To: ${recipientEmail}`);
    console.log(`From: ${name} (${email})`);
    console.log('==================================================\n');

    const transporter = createTransporter();
    if (!transporter) {
      throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.');
    }

    const fromAddress = process.env.EMAIL_FROM || `"Real India Journey Team" <realindiajourney02@gmail.com>`;
    const replyToAddress = (email && email !== 'N/A' && email.includes('@')) ? email : (process.env.REPLY_TO_EMAIL || settings.email || 'realindiajourney02@gmail.com').trim();

    await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      replyTo: replyToAddress,
      subject: mailSubject,
      html: mailHtml
    });

    console.log(`✅ [Email Contact Alert Success]: Sent admin email to ${recipientEmail}`);

    // Also send confirmation email to guest if guest email is provided
    if (email && email !== 'N/A' && email.includes('@')) {
      await sendGuestContactConfirmation(contactData, transporter, fromAddress);
    }

    return true;
  } catch (err) {
    console.error('❌ [Email Contact Alert Error]:', err.message);
    return false;
  }
}

/**
 * Send Confirmation Email to Guest for Contact Message
 */
async function sendGuestContactConfirmation(contactData, transporter, fromAddress) {
  try {
    const guestEmail = (contactData.email || '').trim();
    if (!guestEmail || guestEmail === 'N/A' || !guestEmail.includes('@')) {
      return false;
    }

    const name = contactData.fullName || contactData.name || 'Valued Guest';
    const subject = contactData.subject || 'General Inquiry';

    const mailSubject = `✨ Message Received: Real India Journey`;

    const mailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF7F2; padding: 30px 15px; color: #171717;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E8E2D6; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          
          <div style="background-color: #171717; padding: 24px; text-align: center; border-bottom: 3px solid #B89A5A;">
            <h1 style="color: #FFFFFF; font-size: 20px; margin: 0 0 6px 0; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;">REAL INDIA JOURNEY</h1>
            <span style="color: #B89A5A; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">Luxury Travel Specialist</span>
          </div>

          <div style="padding: 28px 24px;">
            <h2 style="color: #171717; font-size: 18px; margin-top: 0;">Namaste ${name},</h2>
            <p style="font-size: 15px; color: #3A3A3A; line-height: 1.6;">
              Thank you for contacting <strong>Real India Journey</strong>. We have received your message regarding <strong>"${subject}"</strong>.
            </p>
            <p style="font-size: 14px; color: #5C5C5C; line-height: 1.6;">
              Our travel team will respond to your message as soon as possible.
            </p>

            <div style="text-align: center; margin-top: 20px;">
              <a href="https://wa.me/919649605100" style="background-color: #10B981; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 14px;">
                💬 Chat Instant on WhatsApp Desk
              </a>
            </div>
          </div>

          <div style="background-color: #FAF7F2; padding: 16px; text-align: center; border-top: 1px solid #E8E2D6; font-size: 12px; color: #777777;">
            Real India Journey • Luxury Custom Expeditions & Private Chauffeur Travel<br/>
            Call: +91 96496 05100 | Email: info@realindiajourney.com
          </div>
        </div>
      </div>
    `;

    const replyToAddress = (process.env.REPLY_TO_EMAIL || 'realindiajourney02@gmail.com').trim();
    await transporter.sendMail({
      from: fromAddress,
      to: guestEmail,
      replyTo: replyToAddress,
      subject: mailSubject,
      html: mailHtml
    });
    console.log(`✅ [Guest Contact Confirmation Success]: Sent confirmation email to guest (${guestEmail})`);
    return true;
  } catch (err) {
    console.error(`⚠️ [Guest Contact Confirmation Error]: ${err.message}`);
    return false;
  }
}

module.exports = {
  sendEmailBookingNotification,
  sendEmailContactNotification
};




