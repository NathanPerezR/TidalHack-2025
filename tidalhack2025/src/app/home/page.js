"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";

export default function Page() {
  const [text, setText] = useState("");

  //useEffect(() => ({
  //
  //}), []);

  const events = [
    {
      id: "event-1",
      name: "Community Meetup",
      time: "March 25, 2025 | 6:00 PM - 8:00 PM",
      description: "A networking event for local entrepreneurs and developers.",
      keywords: ["Networking", "Business", "Tech"],
    },
    {
      id: "event-2",
      name: "Outdoor Yoga Session",
      time: "March 26, 2025 | 7:00 AM - 8:30 AM",
      description: "Start your day with a refreshing outdoor yoga experience.",
      keywords: ["Wellness", "Health", "Yoga"],
    },
    {
      id: "event-3",
      name: "AI & Machine Learning Workshop",
      time: "March 27, 2025 | 1:00 PM - 4:00 PM",
      description: "Learn about AI and ML trends from industry experts.",
      keywords: ["AI", "Machine Learning", "Tech"],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">What kind of events would you like to attend?</h1>

      <div className="grid w-full gap-2 mb-20">
        <Textarea className="mb-6" onChange={(e) => setText(e.target.value)} placeholder="Type your message here." />
        <Button className="w-full">Let's Go!</Button>
      </div>

      <h1 className="text-2xl font-semibold mb-4 mt-4text-center">Upcoming Events For You</h1>
      <Accordion type="single" collapsible className="w-full">
        {events.map((event) => (
          <AccordionItem key={event.id} value={event.id}>
            <AccordionTrigger>{event.name}</AccordionTrigger>
            <AccordionContent className="m-1">
              <p className="text-gray-700 font-medium">{event.time}</p>
              <p className="text-gray-600 mt-2">{event.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                <strong>Keywords:</strong> {event.keywords.join(", ")}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

