import transporter from "../services/mail.service.js";

export const testMail = async (req, res) => {
  const { email } = req.body

  await transporter.sendMail({
    from: `"VerifyX" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'SMTP Test',
    text: 'If you got this, Gmail SMTP is working fine!',
  })

  res.json({ success: true, message: 'Email sent' })
}
