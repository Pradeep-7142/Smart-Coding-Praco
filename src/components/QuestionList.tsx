
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Search, CheckCircle2, Clock, XCircle } from "lucide-react";

const mockQuestions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Microsoft"],
    status: "solved",
    acceptance: 49.2
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Microsoft", "Facebook"],
    status: "attempted",
    acceptance: 33.8
  },
  {
    id: 3,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Google", "Amazon"],
    status: "unsolved",
    acceptance: 35.3
  },
  {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",
    topics: ["String", "Stack"],
    companies: ["Amazon", "Microsoft", "Facebook"],
    status: "solved",
    acceptance: 40.7
  },
  {
    id: 5,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topics: ["Tree", "Breadth-First Search"],
    companies: ["Amazon", "Microsoft", "Apple"],
    status: "unsolved",
    acceptance: 61.8
  }
];

export const QuestionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || question.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === "all" || question.topics.includes(topicFilter);
    const matchesCompany = companyFilter === "all" || question.companies.includes(companyFilter);
    const matchesStatus = statusFilter === "all" || question.status === statusFilter;
    
    return matchesSearch && matchesDifficulty && matchesTopic && matchesCompany && matchesStatus;
  });

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
      case "unsolved": return <XCircle className="h-4 w-4 text-gray-400" />;
      default: return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Filter className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Filter Questions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              <SelectItem value="Array">Array</SelectItem>
              <SelectItem value="String">String</SelectItem>
              <SelectItem value="Tree">Tree</SelectItem>
              <SelectItem value="Hash Table">Hash Table</SelectItem>
              <SelectItem value="Stack">Stack</SelectItem>
            </SelectContent>
          </Select>

          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="Amazon">Amazon</SelectItem>
              <SelectItem value="Google">Google</SelectItem>
              <SelectItem value="Microsoft">Microsoft</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Apple">Apple</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="solved">Solved</SelectItem>
              <SelectItem value="attempted">Attempted</SelectItem>
              <SelectItem value="unsolved">Unsolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(question.status)}
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {question.title}
                  </CardTitle>
                </div>
                <Badge className={`${getDifficultyColor(question.difficulty)} border`}>
                  {question.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {question.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {question.companies.map((company) => (
                      <Badge key={company} variant="outline" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {question.acceptance}% accepted
                    </span>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Solve
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
