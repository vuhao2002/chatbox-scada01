import Joi from "joi";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const schema = Joi.object({
  email: Joi.string().required(),
  code: Joi.number().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { email, code } = await req.json();

  const { error } = schema.validate({ email, code });

  if (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ID, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });

    const mailOption = {
      from: "chatboxScada@gmail.com",
      to: email,
      subject: "Mã thay đổi tài khoản Chatbot Scada",
      html: `<h3>Mã thay đổi tài khoản Chatbot Scada là ${code}</h3>`,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
