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

    // Save in MongoDB
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();

    // Email section (optional)
    try {
      // Email to you
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
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      // Auto reply
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for contacting Manpreet Singh",
        html: `
          <h2>Thank You!</h2>

          <p>Hello ${firstName},</p>

          <p>
            Thank you for contacting me through my portfolio website.
            I have received your message successfully.
          </p>

          <p>
            I will get back to you as soon as possible.
          </p>

          <br>

          <p>Best Regards,</p>

          <strong>Manpreet Singh</strong><br>
          MCA Student | Web Developer
        `,
      });

    } catch (mailError) {
      console.log("Email Error:", mailError.message);
    }

    // Always return success if MongoDB save worked
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  submitContact,
};