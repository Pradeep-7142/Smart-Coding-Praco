
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
  // Add more data for previous months to show a longer history
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
  
  // Get a list of dates organized by months (last 12 months)
  const getCalendarData = () => {
    const calendarData = [];
    const today = new Date();
    
    // Generate last 12 months of data
    for (let monthOffset = 11; monthOffset >= 0; monthOffset--) {
      const month = new Date(today);
      month.setMonth(today.getMonth() - monthOffset);
      
      const monthName = month.toLocaleString('default', { month: 'short' });
      const days = [];
      
      // Generate days for this month (we'll simplify and use 7 days per week fixed)
      const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(month.getFullYear(), month.getMonth(), day);
        const dateString = formatDate(date);
        const activity = mockActivityData[dateString] || { count: 0, questions: [] };
        
        days.push({
          date: dateString,
          count: activity.count,
          dayOfWeek: date.getDay()
        });
      }
      
      calendarData.push({
        month: monthName,
        days
      });
    }
    
    return calendarData;
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
  
  const calendarData = getCalendarData();
  
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
            {/* Days of week header (Sunday - Saturday) */}
            <div className="flex text-xs text-gray-500 mb-1 ml-8">
              <div className="w-3 mx-1">S</div>
              <div className="w-3 mx-1">M</div>
              <div className="w-3 mx-1">T</div>
              <div className="w-3 mx-1">W</div>
              <div className="w-3 mx-1">T</div>
              <div className="w-3 mx-1">F</div>
              <div className="w-3 mx-1">S</div>
            </div>
            
            <div className="flex">
              {/* Month labels */}
              <div className="flex flex-col mr-2">
                {calendarData.map((month, idx) => (
                  <div 
                    key={idx} 
                    className="text-xs text-gray-500 h-[29px] flex items-start"
                    style={{ marginTop: idx === 0 ? '0' : '-9px' }}
                  >
                    {month.month}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="flex flex-col">
                {calendarData.map((month, monthIdx) => {
                  // Create a 7x5 grid (rows = days of week, columns = weeks)
                  const weeks: Array<Array<{date: string, count: number} | null>> = Array(7).fill(null).map(() => Array(5).fill(null));
                  
                  // Fill the grid with actual days
                  month.days.forEach(day => {
                    const weekOfMonth = Math.floor((day.date.split('-')[2] as unknown as number - 1) / 7);
                    if (weekOfMonth < 5) { // Only show up to 5 weeks
                      weeks[day.dayOfWeek][weekOfMonth] = { 
                        date: day.date, 
                        count: day.count 
                      };
                    }
                  });
                  
                  return (
                    <div key={monthIdx} className="flex mb-1">
                      {weeks.map((daysInWeek, dayOfWeekIdx) => (
                        <div key={dayOfWeekIdx} className="flex flex-col mr-1">
                          {daysInWeek.map((day, weekIdx) => {
                            if (!day) return <div key={weekIdx} className="w-3 h-3 bg-transparent my-[2px]"></div>;
                            
                            const level = getActivityLevel(day.count);
                            const squareColor = getSquareColor(level);
                            
                            return (
                              <div 
                                key={weekIdx}
                                className={`w-3 h-3 ${squareColor} my-[2px] cursor-pointer transition-all hover:scale-110`}
                                onClick={() => setSelectedDate(day.date)}
                                title={`${day.date}: ${day.count} questions solved`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>Less</span>
            <div className="w-3 h-3 bg-gray-100"></div>
            <div className="w-3 h-3 bg-green-200"></div>
            <div className="w-3 h-3 bg-green-400"></div>
            <div className="w-3 h-3 bg-green-600"></div>
            <div className="w-3 h-3 bg-green-800"></div>
            <span>More</span>
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
