import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSiteInfo } from '@/lib/content';
import { checkRateLimit } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

// GET method for testing route availability
export async function GET() {
  return Response.json({ ok: true, route: "contact" });
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  company?: string; // Honeypot field
}

function validateInput(data: ContactFormData): { isValid: boolean; error?: string } {
  // Honeypot check - if company field is filled, it's spam
  if (data.company && data.company.trim() !== '') {
    return { isValid: false, error: 'Spam detected' };
  }

  // Required fields validation
  if (!data.name || !data.email || !data.service || !data.message) {
    return { isValid: false, error: 'Missing required fields' };
  }

  // Trim and length validation
  const trimmedName = data.name.trim();
  const trimmedEmail = data.email.trim();
  const trimmedService = data.service.trim();
  const trimmedMessage = data.message.trim();

  if (trimmedName.length < 1 || trimmedName.length > 500) {
    return { isValid: false, error: 'Name must be between 1 and 500 characters' };
  }

  if (trimmedEmail.length < 1 || trimmedEmail.length > 500) {
    return { isValid: false, error: 'Email must be between 1 and 500 characters' };
  }

  if (trimmedMessage.length < 1 || trimmedMessage.length > 500) {
    return { isValid: false, error: 'Message must be between 1 and 500 characters' };
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // Basic HTML tag detection (security)
  const htmlRegex = /<[^>]*>/;
  if (htmlRegex.test(trimmedName) || htmlRegex.test(trimmedMessage)) {
    return { isValid: false, error: 'HTML tags are not allowed' };
  }

  // Phone validation (optional but if provided, should be reasonable)
  if (data.phone && data.phone.trim().length > 20) {
    return { isValid: false, error: 'Phone number is too long' };
  }

  return { isValid: true };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return request.ip || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, 3, 10 * 60 * 1000); // 3 requests per 10 minutes
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: ContactFormData = await request.json();
    
    // Validate input
    const validation = validateInput(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { ok: false, error: validation.error },
        { status: 400 }
      );
    }

    // Get site configuration
    const siteInfo = getSiteInfo();
    
    // Prepare email content
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // TODO: Update to verified domain once deployed
      to: [siteInfo.email_to],
      subject: `New Consultation Request — ${body.service.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Consultation Request</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
            <p><strong>Name:</strong> ${body.name.trim()}</p>
            <p><strong>Email:</strong> ${body.email.trim()}</p>
            ${body.phone ? `<p><strong>Phone:</strong> ${body.phone.trim()}</p>` : ''}
            <p><strong>Service:</strong> ${body.service.trim()}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #374151;">Project Details</h3>
            <p style="white-space: pre-wrap;">${body.message.trim()}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p><strong>Submitted:</strong> ${timestamp}</p>
            <p><strong>IP Address:</strong> ${clientIP}</p>
            <p><strong>User Agent:</strong> ${userAgent}</p>
            <p><strong>Service Areas:</strong> ${siteInfo.serviceArea.join(', ')}</p>
          </div>
        </div>
      `,
      text: `
New Consultation Request — ${body.service.trim()}

Contact Information:
Name: ${body.name.trim()}
Email: ${body.email.trim()}
${body.phone ? `Phone: ${body.phone.trim()}` : ''}
Service: ${body.service.trim()}

Project Details:
${body.message.trim()}

Submitted: ${timestamp}
IP Address: ${clientIP}
User Agent: ${userAgent}
Service Areas: ${siteInfo.serviceArea.join(', ')}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { ok: false, error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('Contact form submitted successfully:', {
      name: body.name.trim(),
      email: body.email.trim(),
      service: body.service.trim(),
      timestamp,
      ip: clientIP
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

