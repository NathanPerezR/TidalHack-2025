"use client"
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";

export default function Page() {
  // State for each slider
  const [peopleCount, setPeopleCount] = useState([5]);
  const [outdoorPreference, setOutdoorPreference] = useState([5]);
  const [indoorPreference, setIndoorPreference] = useState([5]);
  const router = useRouter();
  const sliderMax = 10;
  const sliderStep = 1;

  return (
    <div className="text-center m-10 space-y-10">
      <p className="text-2xl font-semibold">First, a quick quiz</p>

      <div className="space-y-2">
        <p className="text-lg">How many people do you like to be around during events?</p>
        <Slider 
          value={peopleCount} 
          onValueChange={setPeopleCount} 
          max={sliderMax} 
          step={sliderStep} 
        />
        <p className="text-sm text-gray-500">Selected: {peopleCount}</p>
      </div>

      <div className="space-y-2">
        <p className="text-lg">How do you feel about outdoor events?</p>
        <Slider 
          value={outdoorPreference} 
          onValueChange={setOutdoorPreference} 
          max={sliderMax} 
          step={sliderStep} 
        />
        <p className="text-sm text-gray-500">Selected: {outdoorPreference}</p>
      </div>

      <div className="space-y-2">
        <p className="text-lg">How do you feel about indoor events?</p>
        <Slider 
          value={indoorPreference} 
          onValueChange={setIndoorPreference} 
          max={sliderMax} 
          step={sliderStep} 
        />
        <p className="text-sm text-gray-500">Selected: {indoorPreference}</p>
      </div>

      <footer className="fixed bottom-0 w-full p-4 bg-white shadow-md flex justify-end">
        <Button onClick={() => router.push("/onboarding/page2")} className="bg-blue-500 text-white px-6 py-3 rounded-lg">
          Next
        </Button>
      </footer>
    </div>
  );
}

