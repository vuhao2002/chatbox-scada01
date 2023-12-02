import connectToDB from "@/app/database";
import NewChat from "@/app/models/newchat";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({
        success: false,
        message: "Chat ID is required",
      });

    const deletedProduct = await NewChat.findByIdAndDelete(id);

    if (deletedProduct) {
      return NextResponse.json({
        success: true,
        message: "Chat deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to delete the chat ! Please try again",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
