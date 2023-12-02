import connectToDB from "@/app/database";
import NewChat from "@/app/models/newchat";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("id");

    const allNewChat = await NewChat.find({
      userID,
    }).sort({ createdAt: 1 });

    if (allNewChat) {
      return NextResponse.json({
        success: true,
        data: allNewChat,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No NewChat found",
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
