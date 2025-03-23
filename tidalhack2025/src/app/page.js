"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="text-center m-10 space-y-10">
      <h1 className="text-2xl font-semibold"> Welcome To HowdyHotspot</h1>

      <button
        onClick={() => router.push("/onboarding")}
        className="animate-bounce bg-black text-white  px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </div>
  );
}

