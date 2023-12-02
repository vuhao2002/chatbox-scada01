import connectToDB from "@/app/database";
import NewChat from "@/app/models/newchat";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  userID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { userID } = await req.json();
  const { error } = schema.validate({ userID });

  if (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    await connectToDB();
    const saveNewChat = await NewChat.create({ userID });
    return NextResponse.json(saveNewChat);
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
