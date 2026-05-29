const Contact = require("../models/Contact");
const transporter = require("../config/mail");

const submitContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // Save to MongoDB
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();

    // Email to You
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Inquiry - ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    // Auto Reply to User
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Manpreet Singh",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;">
          <h2>Thank You for Reaching Out!</h2>

          <p>Hello ${firstName},</p>

          <p>
            Thank you for contacting me through my portfolio website.
            I have successfully received your message.
          </p>

          <p>
            I appreciate your interest and will review your message shortly.
            I'll get back to you as soon as possible.
          </p>

          <br>

          <p>Best Regards,</p>

          <strong>Manpreet Singh</strong><br>
          MCA Student | Web Developer<br>
          Chandigarh, India
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  submitContact,
};