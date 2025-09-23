import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import siteData from '../../../content/site.json'

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key')

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'dummy-key') {
      return NextResponse.json({ ok: false, error: 'Email service not configured' }, { status: 500 })
    }

    const { name, email, phone, message } = await request.json()

    // Validate inputs
    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: 'Name must be at least 2 characters' }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email format' }, { status: 400 })
    }

    if (!message || message.length < 6) {
      return NextResponse.json({ ok: false, error: 'Message must be at least 6 characters' }, { status: 400 })
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Handyman Zach <onboarding@resend.dev>',
      to: [siteData.contact.toEmail],
      subject: 'New Consultation Request — Handyman Zach',
      reply_to: email,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message: ${message}
      `.trim()
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ ok: false, error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}