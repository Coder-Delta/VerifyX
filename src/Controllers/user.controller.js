import transporter from "../services/mail.service.js";

export const testMail = async (req, res) => {
  const { email } = req.body

  await transporter.sendMail({
    from: `"VerifyX" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'OTP Verification Mail',
    text: "Don't share this OTP with anyone and don't reply to this mail... This is system generated mail.",
  })

  res.json({ success: true, message: 'Email sent' })
}
