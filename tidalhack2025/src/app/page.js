"use client";

import { useRouter } from "next/navigation";

function generateRandomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export default function Page() {
  const router = useRouter();

  const userId = generateRandomString();

  return (
    <div className="text-center m-10 space-y-10">
      <h1 className="text-2xl font-semibold"> Welcome To HowdyHotspot</h1>

      <p>Discover events that match your interests at Texas A&M with our easy-to-use app! From club gatherings and guest lectures to sports and recreation, find what’s happening on campus and navigate your way there effortlessly.</p>

      <button
        onClick={() => router.push("/onboarding?userId=" + userId)}
        className="animate-bounce bg-black text-white  px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </div>
  );
}

