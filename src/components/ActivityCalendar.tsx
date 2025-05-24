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
  "2024-01-21": { count: 0, questions: [] },
  "2024-01-22": { count: 1, questions: ["Two Sum"] },
  "2024-01-23": { count: 2, questions: ["Merge Intervals", "Add Two Numbers"] },
  "2024-01-24": { count: 3, questions: ["Valid Parentheses", "Maximum Subarray", "Jump Game"] },
  "2024-01-25": { count: 0, questions: [] },
  "2024-01-26": { count: 4, questions: ["Two Sum", "Add Two Numbers", "Maximum Subarray", "Jump Game"] },
  "2023-12-15": { count: 2, questions: ["Two Sum", "Valid Parentheses"] },
  "2023-12-20": { count: 3, questions: ["Add Two Numbers", "Merge Intervals", "3Sum"] },
  "2023-12-25": { count: 1, questions: ["Product of Array Except Self"] },
  "2023-11-10": { count: 2, questions: ["Two Sum", "Valid Parentheses"] },
  "2023-11-20": { count: 4, questions: ["Add Two Numbers", "Merge Intervals", "3Sum", "Maximum Subarray"] },
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
  
  // Generate horizontal timeline data (52 weeks)
  const getHorizontalCalendarData = () => {
    const weeks = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // Start from 52 weeks ago
    
    // Find the Sunday of the week containing startDate
    const startSunday = new Date(startDate);
    startSunday.setDate(startDate.getDate() - startDate.getDay());
    
    for (let weekIndex = 0; weekIndex < 52; weekIndex++) {
      const weekStart = new Date(startSunday);
      weekStart.setDate(startSunday.getDate() + (weekIndex * 7));
      
      const days = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const currentDate = new Date(weekStart);
        currentDate.setDate(weekStart.getDate() + dayIndex);
        
        const dateString = formatDate(currentDate);
        const activity = mockActivityData[dateString] || { count: 0, questions: [] };
        
        days.push({
          date: dateString,
          count: activity.count,
          dayOfWeek: dayIndex
        });
      }
      
      weeks.push({
        weekStart: formatDate(weekStart),
        days
      });
    }
    
    return weeks;
  };
  
  // Get month labels for horizontal display
  const getMonthLabels = (weeks: any[]) => {
    const labels = [];
    let currentMonth = '';
    
    weeks.forEach((week, weekIndex) => {
      const weekStartDate = new Date(week.weekStart);
      const monthName = weekStartDate.toLocaleString('default', { month: 'short' });
      
      if (monthName !== currentMonth) {
        labels.push({
          weekIndex,
          month: monthName
        });
        currentMonth = monthName;
      }
    });
    
    return labels;
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
  
  // Get square color based on activity level
  const getSquareColor = (level: number): string => {
    switch (level) {
      case 0: return "bg-gray-100";
      case 1: return "bg-green-200";
      case 2: return "bg-green-400";
      case 3: return "bg-green-600";
      case 4: return "bg-green-800";
      default: return "bg-gray-100";
    }
  };
  
  const weeks = getHorizontalCalendarData();
  const monthLabels = getMonthLabels(weeks);
  
  return (
    <Card className="bg-white border border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Contribution Activity</CardTitle>
          <Calendar className="h-5 w-5 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Month labels */}
            <div className="flex mb-2 relative h-4">
              {monthLabels.map((label, index) => (
                <div 
                  key={index}
                  className="text-xs text-gray-500 absolute"
                  style={{ left: `${label.weekIndex * 15}px` }}
                >
                  {label.month}
                </div>
              ))}
            </div>
            
            {/* Calendar grid - 7 rows (days of week) x 52 columns (weeks) */}
            <div className="grid grid-rows-7 gap-1" style={{ gridTemplateColumns: `repeat(52, 12px)` }}>
              {Array.from({ length: 7 }, (_, dayIndex) => (
                weeks.map((week, weekIndex) => {
                  const day = week.days[dayIndex];
                  const level = getActivityLevel(day.count);
                  const squareColor = getSquareColor(level);
                  
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 ${squareColor} cursor-pointer transition-all hover:scale-110 rounded-sm`}
                      onClick={() => setSelectedDate(day.date)}
                      title={`${day.date}: ${day.count} questions solved`}
                    />
                  );
                })
              )).flat()}
            </div>
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
