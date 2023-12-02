import connectToDB from "@/app/database";
import Message from "@/app/models/message";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  chatID: Joi.string().required(),
  text: Joi.string().required(),
  name: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { chatID, text, name } = await req.json();
  const { error } = schema.validate({ chatID, text, name });

  if (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    await connectToDB();
    const saveNewChat = await Message.create({ chatID, text, name });
    return NextResponse.json({
      success: true,
      saveNewChat,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const chatID = searchParams.get("id");

    const allChat = await Message.find({
      chatID,
    }).sort({ createdAt: 1 });

    if (allChat) {
      return NextResponse.json({
        success: true,
        data: allChat,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Chat found",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
