
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DayDetails } from "./DayDetails";

// Mock data - In a real app, this would come from the API
const mockActivityData = {
  "2024-01-10": { count: 1, questions: ["Two Sum"] },
  "2024-01-11": { count: 0, questions: [] },
  "2024-01-12": { count: 3, questions: ["Valid Parentheses", "Add Two Numbers", "LRU Cache"] },
  "2024-01-13": { count: 2, questions: ["Merge Intervals", "Product of Array Except Self"] },
  "2024-01-14": { count: 5, questions: ["Valid Parentheses", "Binary Tree Maximum Path Sum", "Longest Palindromic Substring", "Merge K Sorted Lists", "Trapping Rain Water"] },
  "2024-01-15": { count: 1, questions: ["Longest Palindromic Substring"] },
  "2024-01-16": { count: 2, questions: ["3Sum", "Letter Combinations of a Phone Number"] },
  "2024-01-17": { count: 0, questions: [] },
  "2024-01-18": { count: 4, questions: ["Container With Most Water", "Generate Parentheses", "Merge k Sorted Lists", "Search in Rotated Sorted Array"] },
  "2024-01-19": { count: 2, questions: ["Combination Sum", "Rotate Image"] },
  "2024-01-20": { count: 3, questions: ["Group Anagrams", "Maximum Subarray", "Jump Game"] },
};

const questionDetails = {
  "Two Sum": { difficulty: "Easy", status: "solved" },
  "Valid Parentheses": { difficulty: "Easy", status: "solved" },
  "Add Two Numbers": { difficulty: "Medium", status: "solved" },
  "LRU Cache": { difficulty: "Medium", status: "solved" },
  "Merge Intervals": { difficulty: "Medium", status: "solved" },
  "Product of Array Except Self": { difficulty: "Medium", status: "solved" },
  "Binary Tree Maximum Path Sum": { difficulty: "Hard", status: "attempted" },
  "Longest Palindromic Substring": { difficulty: "Medium", status: "solved" },
  "Merge K Sorted Lists": { difficulty: "Hard", status: "solved" },
  "Trapping Rain Water": { difficulty: "Hard", status: "solved" },
  "3Sum": { difficulty: "Medium", status: "solved" },
  "Letter Combinations of a Phone Number": { difficulty: "Medium", status: "solved" },
  "Container With Most Water": { difficulty: "Medium", status: "solved" },
  "Generate Parentheses": { difficulty: "Medium", status: "solved" },
  "Search in Rotated Sorted Array": { difficulty: "Medium", status: "solved" },
  "Combination Sum": { difficulty: "Medium", status: "solved" },
  "Rotate Image": { difficulty: "Medium", status: "solved" },
  "Group Anagrams": { difficulty: "Medium", status: "solved" },
  "Maximum Subarray": { difficulty: "Easy", status: "solved" },
  "Jump Game": { difficulty: "Medium", status: "solved" },
};

export const ActivityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Get a list of dates for the last 30 days
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(formatDate(date));
    }
    
    return dates;
  };
  
  // Format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  // Get activity level (0-4) based on question count
  const getActivityLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  };
  
  // Get bubble color based on activity level
  const getBubbleColor = (level: number): string => {
    switch (level) {
      case 0: return "bg-gray-100";
      case 1: return "bg-green-200";
      case 2: return "bg-green-400";
      case 3: return "bg-green-600";
      case 4: return "bg-green-800";
      default: return "bg-gray-100";
    }
  };
  
  const dates = getDates();
  
  return (
    <Card className="bg-white border border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Activity Calendar</CardTitle>
          <Calendar className="h-5 w-5 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 justify-center">
          {dates.map(date => {
            const activity = mockActivityData[date] || { count: 0, questions: [] };
            const level = getActivityLevel(activity.count);
            const bubbleColor = getBubbleColor(level);
            
            return (
              <div 
                key={date}
                className={`w-8 h-8 ${bubbleColor} rounded-md cursor-pointer flex items-center justify-center transition-all hover:scale-110`}
                onClick={() => setSelectedDate(date)}
                title={`${date}: ${activity.count} questions solved`}
              >
                {activity.count > 0 && (
                  <span className="text-xs text-white font-bold">{activity.count}</span>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <span>0</span>
            
            <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
            <span>1</span>
            
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
            <span>2-3</span>
            
            <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
            <span>4-5</span>
            
            <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
            <span>6+</span>
          </div>
        </div>
      </CardContent>
      
      {selectedDate && (
        <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Activity for {selectedDate}</DialogTitle>
            </DialogHeader>
            <DayDetails 
              date={selectedDate}
              questions={(mockActivityData[selectedDate]?.questions || []).map(q => ({
                name: q,
                difficulty: questionDetails[q]?.difficulty || "Medium",
                status: questionDetails[q]?.status || "solved"
              }))}
            />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};
