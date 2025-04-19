import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define email transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use another service like SES, etc.
    auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASSWORD, // Your app password from Gmail
    },
});

// API handler to send order confirmation email
export async function POST(req: Request) {
    try {
        const { to, userEmail, product, quantity } = await req.json();

        // Ensure we use the correct email address for the recipient
        const recipientEmail = userEmail?.emailAddress || to;

        if (!recipientEmail) {
            throw new Error("No valid email address provided.");
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER, // From your email
            to: recipientEmail, // Correct recipient email
            subject: 'Order Confirmation',
            text: `
        Hi, your order has been confirmed! 
        Product: ${product.name}
        Quantity: ${quantity}
        Total: ₹${(quantity * product.price).toLocaleString('en-IN')}
        
        Thank you for shopping with us!
      `,
        };

        console.log("Sending email to:", recipientEmail);

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}
