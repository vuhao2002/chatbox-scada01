import connectToDB from "@/app/database";
import User from "@/app/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  let { name, email, password, repeatPassword, image } = await req.json();
  if (!image)
    image =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png";

  const role = "user";
  if (password !== repeatPassword) {
    return NextResponse.json({
      success: false,
      message: "password does not match repeated password!",
    });
  }
  //validate the schema

  const { error } = schema.validate({ name, email, password, image, role });

  if (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    //check if the user is exists or not

    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User is already exists. Please try with different email.",
      });
    } else {
      const hashPassword = await hash(password, 12);

      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        image,
        role,
      });
      console.log(newlyCreatedUser);

      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully.",
        });
      }
    }
  } catch (error) {
    console.log("Error while new user registration. Please try again");

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
