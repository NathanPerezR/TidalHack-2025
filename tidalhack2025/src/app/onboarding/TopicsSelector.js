import { useState, useRef } from "react";

const TopicsSelector = ({ onTopicsChange }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const scrollContainerRef = useRef(null);
  
  // Example topics - replace with your actual topics
  const topics = [
    "Music", "Sports", "Arts", "Food", "Movies", "Travel", "Games", 
    "Technology", "Science", "History", "Fashion", "Books", "Nature",
    "Photography", "Dance", "Theater", "Cooking", "Fitness", "Pets",
    "DIY", "Comedy", "Education", "Wellness"
  ];
  
  const toggleTopic = (topic) => {
    setSelectedTopics(prev => {
      const newSelection = prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic];
        
      // If you need to pass the selected topics up to the parent component
      if (onTopicsChange) {
        onTopicsChange(newSelection);
      }
      
      return newSelection;
    });
  };
  
  // Handle horizontal scrolling with mouse wheel
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };
  
  return (
    <div className="w-full mb-8">
      <p className="text-lg font-medium mb-3">Select some topics that you are interested in</p>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 scrollbar-hide" 
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onWheel={handleWheel}
      >
        <div className="flex flex-wrap gap-2 pb-1">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedTopics.includes(topic)
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      
      {selectedTopics.length > 0 && (
        <p className="text-sm text-gray-500 mt-2">
          Selected: {selectedTopics.join(", ")}
        </p>
      )}
    </div>
  );
};

export default TopicsSelector;
