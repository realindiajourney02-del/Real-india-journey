const Setting = require('../models/Setting');
const memoryStore = require('../data/inMemoryStore');

/**
 * Get active site settings (Mongo or MemoryStore fallback)
 */
async function getSettings() {
  try {
    if (global.isMongoConnected) {
      const settings = await Setting.findOne();
      if (settings) return settings;
    }
  } catch (err) {
    console.error('Error fetching settings for WhatsApp:', err.message);
  }
  return memoryStore.settings || {};
}

/**
 * Format and send WhatsApp notification for a new Booking / Enquiry
 */
async function sendWhatsAppBookingNotification(enquiryData) {
  try {
    const settings = await getSettings();
    
    // Check if notification is enabled
    const isEnabled = settings.whatsappEnableNotify !== false;
    if (!isEnabled) {
      console.log('ℹ️ [WhatsApp Service] WhatsApp notification disabled in settings.');
      return false;
    }

    const rawPhone = settings.whatsappNotifyPhone || settings.whatsapp || '+919649605100';
    const recipientPhone = rawPhone.replace(/[^0-9]/g, ''); // strip non-digits

    const name = enquiryData.fullName || enquiryData.name || 'Guest';
    const phone = enquiryData.phone || 'Not provided';
    const email = enquiryData.email || 'Not provided';
    const country = enquiryData.country || 'Not specified';
    const packageName = enquiryData.destinationPreference || enquiryData.packageName || enquiryData.destination || enquiryData.serviceType || 'General Expedition';
    const travelDate = enquiryData.travelDate || 'Flexible';
    const duration = enquiryData.duration || 'Not specified';
    const members = enquiryData.members || enquiryData.adults || '2 Members';
    const festivalInterest = enquiryData.festivalInterest || 'Not Particularly';
    const travelPreference = enquiryData.travelPreference || enquiryData.travelStyle || 'Luxury';
    const specialRequests = enquiryData.specialRequests || 'None';

    const messageText = 
`🚨 *NEW BOOKING ENQUIRY RECEIVED!*
-----------------------------------
👤 *Guest Name:* ${name}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}
🌍 *Country:* ${country}
🗺️ *Destination/Tour:* ${packageName}
📅 *Date of Visit:* ${travelDate} (${duration})
👥 *Members:* ${members}
👑 *Travel Preference:* ${travelPreference}
🎉 *Festival Interest:* ${festivalInterest}
💬 *Special Note:* ${specialRequests}
-----------------------------------
🌐 *Real India Journey Admin Desk*`;

    console.log('\n========================================');
    console.log('📲 [WHATSAPP ALERT TRIGGERED FOR ADMIN]');
    console.log(`To Phone: +${recipientPhone}`);
    console.log(messageText);
    console.log('========================================\n');

    // Deliver via configured provider
    const apiKey = settings.whatsappApiKey || process.env.CALLMEBOT_APIKEY || '';
    const provider = settings.whatsappProvider || 'callmebot';

    if (provider === 'callmebot' && apiKey) {
      const encodedMsg = encodeURIComponent(messageText);
      const url = `https://api.callmebot.com/whatsapp.php?phone=${recipientPhone}&text=${encodedMsg}&apikey=${apiKey}`;
      const res = await fetch(url);
      console.log(`✅ [WhatsApp Service CallMeBot Response]: Status ${res.status}`);
      return true;
    } else if (provider === 'ultramsg' && apiKey) {
      const instanceId = (settings.whatsappInstanceId || process.env.ULTRAMSG_INSTANCE_ID || '').trim();
      const cleanToken = apiKey.trim();
      if (!instanceId) {
        console.log('⚠️ [WhatsApp Service UltraMsg]: Instance ID missing in settings.');
        return false;
      }
      const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;
      const params = new URLSearchParams({
        token: cleanToken,
        to: recipientPhone,
        body: messageText,
        priority: '10'
      });
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      const responseText = await res.text();
      console.log(`✅ [WhatsApp Service UltraMsg Response]: Status ${res.status} | Output: ${responseText}`);
      return true;
    } else if (provider === 'custom_webhook' && process.env.WHATSAPP_WEBHOOK_URL) {
      const res = await fetch(process.env.WHATSAPP_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: recipientPhone,
          message: messageText,
          enquiry: enquiryData
        })
      });
      console.log(`✅ [WhatsApp Service Custom Webhook Response]: Status ${res.status}`);
      return true;
    } else {
      console.log(`ℹ️ [WhatsApp Service] Notification logged to console. To receive actual WhatsApp messages on your mobile, enter your CallMeBot API Key in Admin Settings.`);
      return true;
    }
  } catch (err) {
    console.error('❌ [WhatsApp Service Error]:', err.message);
    return false;
  }
}

/**
 * Format and send WhatsApp notification for Contact Form
 */
async function sendWhatsAppContactNotification(contactData) {
  try {
    const settings = await getSettings();
    if (settings.whatsappEnableNotify === false) return false;

    const rawPhone = settings.whatsappNotifyPhone || settings.whatsapp || '+919649605100';
    const recipientPhone = rawPhone.replace(/[^0-9]/g, '');
    const name = contactData.name || contactData.fullName || 'Visitor';
    const phone = contactData.phone || 'N/A';
    const email = contactData.email || 'N/A';
    const subject = contactData.subject || 'General Inquiry';
    const message = contactData.message || contactData.comments || '';

    const messageText = 
`📩 *NEW CONTACT MESSAGE RECEIVED!*
-----------------------------------
👤 *Sender:* ${name}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}
🏷️ *Subject:* ${subject}
💬 *Message:* ${message}
-----------------------------------
🌐 *Real India Journey Admin Desk*`;

    console.log('\n========================================');
    console.log('📲 [WHATSAPP CONTACT ALERT FOR ADMIN]');
    console.log(`To Phone: +${recipientPhone}`);
    console.log(messageText);
    console.log('========================================\n');

    const apiKey = settings.whatsappApiKey || process.env.CALLMEBOT_APIKEY || '';
    const provider = settings.whatsappProvider || 'callmebot';

    if (provider === 'callmebot' && apiKey) {
      const encodedMsg = encodeURIComponent(messageText);
      const url = `https://api.callmebot.com/whatsapp.php?phone=${recipientPhone}&text=${encodedMsg}&apikey=${apiKey}`;
      await fetch(url);
    } else if (provider === 'ultramsg' && apiKey) {
      const instanceId = (settings.whatsappInstanceId || process.env.ULTRAMSG_INSTANCE_ID || '').trim();
      const cleanToken = apiKey.trim();
      if (instanceId) {
        const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;
        const params = new URLSearchParams({
          token: cleanToken,
          to: recipientPhone,
          body: messageText,
          priority: '10'
        });
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        });
      }
    }
    return true;
  } catch (err) {
    console.error('❌ [WhatsApp Contact Alert Error]:', err.message);
    return false;
  }
}

module.exports = {
  sendWhatsAppBookingNotification,
  sendWhatsAppContactNotification
};
