"use client";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="flexCenter flex-col h-screen px-2">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>
      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8" />
            {/* Sun Icons */}
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">&quot;Explain Something to me&quot;</p>
            <p className="infoText">
              &quot;What is the difference between a dog and a cat&quot;
            </p>
            <p className="infoText">
              &quot;What is the color of the sun?&quot;
            </p>
          </div>
        </div>
        <div>
          <div className="flexCenter flex-col mb-5">
            <BoltIcon className="h-8 w-8" />
            {/* Sun Icons */}
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">&quot;Explain Something to me&quot;</p>
            <p className="infoText">
              &quot;What is the difference between a dog and a cat&quot;
            </p>
            <p className="infoText">
              &quot;What is the color of the sun?&quot;
            </p>
          </div>
        </div>
        <div>
          <div className="flexCenter flex-col mb-5">
            <ExclamationTriangleIcon className="h-8 w-8" />
            {/* Sun Icons */}
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">&quot;Explain Something to me&quot;</p>
            <p className="infoText">
              &quot;What is the difference between a dog and a cat&quot;
            </p>
            <p className="infoText">
              &quot;What is the color of the sun?&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
