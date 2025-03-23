"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TopicsSelector from "./TopicsSelector.js";

export default function Page() {
  const [peopleCount, setPeopleCount] = useState([5]);
  const [outdoorPreference, setOutdoorPreference] = useState([5]);
  const [indoorPreference, setIndoorPreference] = useState([5]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayTimes, setDayTimes] = useState({});
  const [timeRange, setTimeRange] = useState([12]);
  const [isSubmitting, setIsSubmitting] = useState(false); const [selectedTopics, setSelectedTopics] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);   
  const router = useRouter();
  const sliderMax = 10;
  const sliderStep = 1;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlots = ["morning", "afternoon", "evening"];

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent reload
    setIsSubmitting(true);

    const quizData = {
      peopleCount: peopleCount[0],
      outdoorPreference: outdoorPreference[0],
      indoorPreference: indoorPreference[0],
      selectedDays,
      dayTimes,
      timeRange: timeRange[0],
      selectedTopics,
    };

    console.log("Submitted JSON:", JSON.stringify(quizData, null, 2));

    try {
      console.log(quizData);
      const res = await fetch('https://submit-quiz-hg4qxyjksq-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
  
      if (res.ok) {
        console.log('Submitted!');
        setIsSubmitted(true);
      } else {
        console.error('Submit failed');
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error('Error:', err);
    }

    router.push("/home")
  };

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  
  const toggleTimeForDay = (day, time) => {

    setDayTimes((prev) => {
      const currentTimes = prev[day] || [];
      if (currentTimes.includes(time)) {
        return { ...prev, [day]: currentTimes.filter((t) => t !== time) };
      } else {
        return { ...prev, [day]: [...currentTimes, time] };
      }
    });
  };

  // Handle topics selection changes
  const handleTopicsChange = (topics) => {
    setSelectedTopics(topics);
  };
  
  return (
      <div className="text-center m-10 space-y-10">
        <p className="text-2xl font-semibold">First, a quick quiz</p>
        <div className="space-y-2">
          <p className="text-lg">How many people do you like to be around during events?</p>
          <Slider value={peopleCount} onValueChange={setPeopleCount} max={sliderMax} step={sliderStep} />
          <p className="text-sm text-gray-500">Selected: {peopleCount}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-lg">How do you feel about outdoor events?</p>
          <Slider value={outdoorPreference} onValueChange={setOutdoorPreference} max={sliderMax} step={sliderStep} />
          <p className="text-sm text-gray-500">Selected: {outdoorPreference}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-lg">How do you feel about indoor events?</p>
          <Slider value={indoorPreference} onValueChange={setIndoorPreference} max={sliderMax} step={sliderStep} />
          <p className="text-sm text-gray-500">Selected: {indoorPreference}</p>
        </div>
        
        <p className="text-2xl font-semibold">What does your availability look like?</p>
        <div className="flex flex-wrap justify-center space-y-2 space-x-2 max-w-md mx-auto">
          {days.map((day) => (
            <Button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-lg ${selectedDays.includes(day) 
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800"} hover:bg-blue-400`}
            >
              {day}
            </Button>
          ))}
        </div>
        <p className="text-sm text-gray-500">Selected Days: {selectedDays.join(", ") || "None"}</p>
        
        {selectedDays.map((day) => (
          <div key={day} className="space-y-2">
            <label htmlFor={`time-${day}`} className="text-lg">{`What times are you available on ${day}?`}</label>
            <div className="flex justify-center space-x-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  onClick={() => toggleTimeForDay(day, time)}
                  className={`px-4 py-2 rounded-lg ${dayTimes[day]?.includes(time) 
                   ? "bg-black text-white"
                   : "bg-gray-200 text-gray-800"} hover:bg-blue-400`}
                  >
                  {time}
                </Button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Selected times: {dayTimes[day]?.join(", ") || "None"}
            </p>
          </div>
        ))}

        <TopicsSelector onTopicsChange={handleTopicsChange} />

        <Button
          onClick={handleSubmit}
          disabled={selectedDays.length === 0 && selectedTopics.length === 0}
          className={`px-6 py-3 rounded-lg ${
            selectedDays.length === 0 || selectedTopics.length === 0
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-black text-white hover:bg-blue-700"
          }`}
        >
          Next
        </Button>

      </div>
  );
}
