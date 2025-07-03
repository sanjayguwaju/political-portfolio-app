import axios from 'axios'
import { EmailAdapter, SendEmailOptions } from 'payload'

const brevoAdapter = (): EmailAdapter => {
  console.log(process.env.BREVO_API_KEY)
  const adapter = () => ({
    name: 'brevo',
    fromName: process.env.BREVO_SENDER_NAME || 'Chanda Chaudhary',
    fromAddress: process.env.BREVO_SENDER_EMAIL || 'noreply@chanda.com.np',
    sendEmail: async (message: SendEmailOptions): Promise<unknown> => {
      if (!process.env.BREVO_EMAILS_ACTIVE) {
        console.log('Emails disabled, logging to console')
        console.log(message)
        return { success: true, message: 'Email logged to console (disabled)' }
      }

      // Check for required environment variables
      if (!process.env.BREVO_API_KEY) {
        console.error('BREVO_API_KEY environment variable is not set')
        throw new Error('Brevo API key not configured')
      }

      if (!process.env.BREVO_SENDER_EMAIL) {
        console.error('BREVO_SENDER_EMAIL environment variable is not set')
        throw new Error('Brevo sender email not configured')
      }

      try {
        const emailData = {
          method: 'post',
          url: 'https://api.brevo.com/v3/smtp/email',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          data: {
            sender: {
              name: process.env.BREVO_SENDER_NAME || 'Chanda Chaudhary',
              email: process.env.BREVO_SENDER_EMAIL,
            },
            to: [
              {
                email: message.to,
              },
            ],
            subject: message.subject,
            htmlContent: message.html,
          },
        }

        console.log('Sending email with Brevo to:', message.to)
        const response = await axios(emailData)

        console.log('Email sent successfully:', response.data)
        return { success: true, data: response.data }
      } catch (error) {
        console.error('Error sending email with Brevo:', error)

        // Handle specific error cases
        if (axios.isAxiosError(error)) {
          const status = error.response?.status
          const responseData = error.response?.data
          if (status === 401) {
            throw new Error('Brevo API authentication failed. Please check your API key.')
          } else if (status === 400) {
            throw new Error(`Brevo API request failed: ${responseData?.message || 'Bad request'}`)
          } else if (status && status >= 500) {
            throw new Error('Brevo API server error. Please try again later.')
          }
        }

        throw new Error(
          `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
        )
      }
    },
  })
  // @ts-ignore
  return adapter
}

export default brevoAdapter
