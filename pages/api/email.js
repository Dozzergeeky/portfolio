import { Resend } from 'resend'
const resend = new Resend('re_amsjZDXH_JuAVSRxpZ1YmfFoe14e9aRZb')
import EmailTemplate from '../../components/EmailTemplate'

export default async function sendEmail(req, res) {
  try {
    const data = req.body

    await resend.sendEmail({
      from: 'Portfolio Contact <website@resend.dev>',
      to: 'd2b4mb@gmail.com',
      replyTo: data.email,
      subject: `${data.name} - via portfolio contact form`,
      react: <EmailTemplate {...data} />,
    })

    res.status(200).json({ message: 'Email sent' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
