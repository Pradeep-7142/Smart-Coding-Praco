
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

type Question = {
  name: string;
  difficulty: string;
  status: string;
};

type DayDetailsProps = {
  date: string;
  questions: Question[];
};

export const DayDetails = ({ date, questions }: DayDetailsProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "solved": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "attempted": return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  if (questions.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No questions solved on this day.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div 
          key={index}
          className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            {getStatusIcon(question.status)}
            <span className="font-medium">{question.name}</span>
          </div>
          <Badge className={`${getDifficultyColor(question.difficulty)} border`}>
            {question.difficulty}
          </Badge>
        </div>
      ))}
    </div>
  );
};
