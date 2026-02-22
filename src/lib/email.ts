import type { LeadCategory, EmailPayload } from '../types/survey';

// Get environment variables
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';
const FROM_EMAIL = import.meta.env.VITE_FROM_EMAIL || 'hello@aibusiness.id';
const FROM_NAME = import.meta.env.VITE_FROM_NAME || 'AI Business Team';

/**
 * Check if email service is configured
 */
export function isEmailConfigured(): boolean {
  return Boolean(RESEND_API_KEY);
}

/**
 * Send email using Resend API
 */
export async function sendEmail(payload: EmailPayload): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  if (!isEmailConfigured()) {
    console.warn('Email not configured - skipping send');
    return {
      success: false,
      error: 'Email service not configured. Please set VITE_RESEND_API_KEY environment variable.',
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: payload.from || `${FROM_NAME} <${FROM_EMAIL}>`,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Resend API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      success: true,
      messageId: data.id,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send welcome/follow-up email based on lead category
 */
export async function sendLeadEmail(
  to: string,
  leadCategory: LeadCategory,
  leadScore: number
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const emailContent = getEmailContent(leadCategory, leadScore);
  
  return sendEmail({
    to,
    subject: emailContent.subject,
    html: emailContent.html,
  });
}

/**
 * Get email content based on lead category
 */
function getEmailContent(
  category: LeadCategory,
  score: number
): { subject: string; html: string }
 {
  const emailTemplates: Record<LeadCategory, { subject: string; html: string }> = {
    hot: {
      subject: '🚀 Your AI Assessment Results + Next Steps',
      html: getHotLeadEmail(score),
    },
    warm: {
      subject: '📊 Your AI Readiness Assessment Results',
      html: getWarmLeadEmail(score),
    },
    qualified: {
      subject: '🎯 Your AI Assessment Results',
      html: getQualifiedLeadEmail(score),
    },
    nurture: {
      subject: '📚 Resources to Help You Get Started with AI',
      html: getNurtureLeadEmail(score),
    },
  };

  return emailTemplates[category];
}

/**
 * Hot Lead Email - Immediate booking link, case studies
 */
function getHotLeadEmail(score: number): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Assessment Results</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🚀 Excellent! You're Ready for AI Transformation</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Lead Score: <strong>${score}/140</strong></p>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
    <p>Hi there,</p>
    
    <p>Congratulations! Based on your assessment, your company is in an <strong>excellent position</strong> to implement AI solutions and see immediate ROI.</p>
    
    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 8px;">
      <p style="margin: 0; font-weight: 600; color: #92400e;">🔥 You're a Hot Lead - Priority Status</p>
      <p style="margin: 8px 0 0 0; color: #92400e; font-size: 14px;">Your profile matches our most successful AI implementations.</p>
    </div>
    
    <h3 style="color: #1f2937; margin-top: 24px;">📅 Schedule Your Free Strategy Call</h3>
    <p>Let's discuss your specific use cases and create a customized AI implementation roadmap.</p>
    
    <a href="https://calendly.com/aibusiness/strategy-call" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 16px 0;">Book Your Call Now →</a>
    
    <h3 style="color: #1f2937; margin-top: 24px;">📊 Case Studies</h3>
    <p>See how similar companies achieved:</p>
    <ul>
      <li>🏢 <strong>E-commerce Company:</strong> 60% reduction in customer service response time</li>
      <li>🎨 <strong>Digital Agency:</strong> 40% faster content production</li>
      <li>🏭 <strong>Manufacturing:</strong> Rp 2B annual savings through automation</li>
    </ul>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    
    <p style="font-size: 14px; color: #6b7280;">Questions? Simply reply to this email or WhatsApp us at +62 8xx-xxxx-xxxx.</p>
    
    <p style="font-size: 14px; color: #6b7280;">Best regards,<br><strong>The AI Business Team</strong></p>
  </div>
</body>
</html>
  `;
}

/**
 * Warm Lead Email - Educational content + soft pitch
 */
function getWarmLeadEmail(score: number): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Assessment Results</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">📊 Your AI Readiness Assessment</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Lead Score: <strong>${score}/140</strong></p>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
    <p>Hi there,</p>
    
    <p>Thank you for completing the AI Business Assessment! Based on your responses, you have <strong>strong potential</strong> for AI implementation.</p>
    
    <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 8px;">
      <p style="margin: 0; font-weight: 600; color: #1e40af;">⭐ Warm Lead - Good Fit</p>
      <p style="margin: 8px 0 0 0; color: #1e40af; font-size: 14px;">You're on the right track. Let's explore how AI can work for you.</p>
    </div>
    
    <h3 style="color: #1f2937; margin-top: 24px;">📚 Free Resources for You</h3>
    <p>We've curated these resources based on your assessment:</p>
    
    <ul>
      <li>📖 <strong>AI Implementation Playbook</strong> - Step-by-step guide for your industry</li>
      <li>🎥 <strong>5 AI Tools Demo Video</strong> - See real use cases in action</li>
      <li>📈 <strong>ROI Calculator</strong> - Estimate your potential savings</li>
    </ul>
    
    <a href="#" style="display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 16px 0;">Access Free Resources →</a>
    
    <h3 style="color: #1f2937; margin-top: 24px;">💡 Quick Win Opportunity</h3>
    <p>Based on your responses, we identified a potential <strong>quick win</strong> for your team. Would you like to discuss it in a brief 15-minute call?</p>
    
    <a href="https://calendly.com/aibusiness/quick-chat" style="display: inline-block; background: #f3f4f6; color: #374151; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 8px 0;">Schedule 15-Min Chat</a>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    
    <p style="font-size: 14px; color: #6b7280;">Questions? Simply reply to this email.</p>
    
    <p style="font-size: 14px; color: #6b7280;">Best regards,<br><strong>The AI Business Team</strong></p>
  </div>
</body>
</html>
  `;
}

/**
 * Qualified Lead Email - Standard nurture
 */
function getQualifiedLeadEmail(score: number): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Assessment Results</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🎯 Your AI Assessment Results</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Lead Score: <strong>${score}/140</strong></p>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
    <p>Hi there,</p>
    
    <p>Thank you for completing our AI Business Assessment! We've analyzed your responses and have some insights to share.</p>
    
    <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin: 20px 0; border-radius: 8px;">
      <p style="margin: 0; font-weight: 600; color: #166534;">✅ Qualified Lead - Moderate Fit</p>
      <p style="margin: 8px 0 0 0; color: #166534; font-size: 14px;">You have potential for AI implementation with proper guidance.</p>
    </div>
    
    <h3 style="color: #1f2937; margin-top: 24px;">📋 What Happens Next?</h3>
    
    <p>Over the next few weeks, we'll send you:</p>
    
    <ol>
      <li>📚 <strong>Educational content</strong> about AI in your industry</li>
      <li>🎯 <strong>Use case examples</strong> relevant to your challenges</li>
      <li>💡 <strong>Implementation tips</strong> to get started</li>
      <li>🎁 <strong>Exclusive offers</strong> for assessment participants</li>
    </ol>
    
    <h3 style="color: #1f2937; margin-top: 24px;">🎁 Your Free AI Readiness Report</h3>
    <p>Click below to download your personalized report with recommendations:</p>
    
    <a href="#" style="display: inline-block; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 16px 0;">Download Report →</a>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    
    <p style="font-size: 14px; color: #6b7280;">Not ready to talk yet? No problem. We'll keep you updated with valuable content.</p>
    
    <p style="font-size: 14px; color: #6b7280;">Best regards,<br><strong>The AI Business Team</strong></p>
  </div>
</body>
</html>
  `;
}

/**
 * Nurture Lead Email - Value-first content only
 */
function getNurtureLeadEmail(score: number): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Resources for Your Journey</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">📚 Welcome! Let's Learn Together</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Lead Score: <strong>${score}/140</strong></p>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
    <p>Hi there,</p>
    
    <p>Thank you for completing our AI Business Assessment! We appreciate you taking the time to explore how AI could help your business.</p>
    
    <div style="background: #f3f4f6; border-left: 4px solid #6b7280; padding: 16px; margin: 20px 0; border-radius: 8px;">
      <p style="margin: 0; font-weight: 600; color: #374151;">🌱 Early Stage - Education First</p>
      <p style="margin: 8px 0 0 0; color: #4b5563; font-size: 14px;">No pressure - we're here to help you learn at your own pace.</p>
    </div>
    
    <h3 style="color: #1f2937; margin-top: 24px;">🎓 AI 101: Getting Started</h3>
    
    <p>New to AI? Here are some beginner-friendly resources:</p>
    
    <ul>
      <li>📖 <strong>What is AI? (Simple Explanation)</strong> - 5 min read</li>
      <li>🎥 <strong>AI for Business: Beginner's Guide</strong> - Video series</li>
      <li>💡 <strong>10 AI Tools Anyone Can Use</strong> - Free tools to try</li>
      <li>📊 <strong>AI Success Stories in Indonesia</strong> - Local examples</li>
    </ul>
    
    <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 16px 0;">Get Free Resources →</a>
    
    <h3 style="color: #1f2937; margin-top: 24px;">📅 Free Workshop Invitation</h3>
    
    <p>We host monthly <strong>"AI for Business" workshops</strong> - completely free and no sales pitch. Just pure education!</p>
    
    <a href="#" style="display: inline-block; background: #f3f4f6; color: #374151; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 8px 0;">Register for Next Workshop</a>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    
    <p style="font-size: 14px; color: #6b7280;">We'll send you educational content occasionally. No spam, unsubscribe anytime.</p>
    
    <p style="font-size: 14px; color: #6b7280;">Happy learning,<br><strong>The AI Business Team</strong></p>
  </div>
</body>
</html>
  `;
}

/**
 * Test email configuration
 */
export async function testEmailConfiguration(testEmail: string): Promise<{
  success: boolean;
  message: string;
}> {
  if (!isEmailConfigured()) {
    return {
      success: false,
      message: 'Email not configured. Please set VITE_RESEND_API_KEY environment variable.',
    };
  }

  const result = await sendEmail({
    to: testEmail,
    subject: 'Test Email - AI Business Survey',
    html: `
      <h1>Test Email</h1>
      <p>This is a test email from your AI Business Survey application.</p>
      <p>If you're receiving this, your email configuration is working correctly! 🎉</p>
    `,
  });

  if (result.success) {
    return {
      success: true,
      message: `Test email sent successfully to ${testEmail}`,
    };
  } else {
    return {
      success: false,
      message: result.error || 'Failed to send test email',
    };
  }
}
