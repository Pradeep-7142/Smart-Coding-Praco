
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
    acceptance: 49.2,
    frequency: 95
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Microsoft", "Facebook"],
    status: "attempted",
    acceptance: 33.8,
    frequency: 88
  },
  {
    id: 3,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Google", "Amazon"],
    status: "unsolved",
    acceptance: 35.3,
    frequency: 45
  },
  {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",
    topics: ["String", "Stack"],
    companies: ["Amazon", "Microsoft", "Facebook"],
    status: "solved",
    acceptance: 40.7,
    frequency: 92
  },
  {
    id: 5,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topics: ["Tree", "Breadth-First Search"],
    companies: ["Amazon", "Microsoft", "Apple"],
    status: "unsolved",
    acceptance: 61.8,
    frequency: 67
  }
];

export const QuestionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [difficultyOperator, setDifficultyOperator] = useState("is");
  const [topicFilter, setTopicFilter] = useState("all");
  const [topicOperator, setTopicOperator] = useState("is");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [companyOperator, setCompanyOperator] = useState("is");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusOperator, setStatusOperator] = useState("is");
  const [frequencyFilter, setFrequencyFilter] = useState("all");
  const [frequencyOperator, setFrequencyOperator] = useState("is");
  const [acceptanceFilter, setAcceptanceFilter] = useState("all");
  const [acceptanceOperator, setAcceptanceOperator] = useState("is");

  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === "all" || 
      (difficultyOperator === "is" ? question.difficulty === difficultyFilter : question.difficulty !== difficultyFilter);
    
    const matchesTopic = topicFilter === "all" || 
      (topicOperator === "is" ? question.topics.includes(topicFilter) : !question.topics.includes(topicFilter));
    
    const matchesCompany = companyFilter === "all" || 
      (companyOperator === "is" ? question.companies.includes(companyFilter) : !question.companies.includes(companyFilter));
    
    const matchesStatus = statusFilter === "all" || 
      (statusOperator === "is" ? question.status === statusFilter : question.status !== statusFilter);
    
    const matchesFrequency = frequencyFilter === "all" || 
      (frequencyOperator === "is" ? 
        (frequencyFilter === "more-than-90" ? question.frequency > 90 :
         frequencyFilter === "more-than-80" ? question.frequency > 80 :
         frequencyFilter === "more-than-70" ? question.frequency > 70 :
         frequencyFilter === "less-than-50" ? question.frequency < 50 : true) :
        (frequencyFilter === "more-than-90" ? question.frequency <= 90 :
         frequencyFilter === "more-than-80" ? question.frequency <= 80 :
         frequencyFilter === "more-than-70" ? question.frequency <= 70 :
         frequencyFilter === "less-than-50" ? question.frequency >= 50 : true));
    
    const matchesAcceptance = acceptanceFilter === "all" || 
      (acceptanceOperator === "is" ? 
        (acceptanceFilter === "high" ? question.acceptance > 60 :
         acceptanceFilter === "medium" ? question.acceptance >= 40 && question.acceptance <= 60 :
         acceptanceFilter === "low" ? question.acceptance < 40 : true) :
        (acceptanceFilter === "high" ? question.acceptance <= 60 :
         acceptanceFilter === "medium" ? question.acceptance < 40 || question.acceptance > 60 :
         acceptanceFilter === "low" ? question.acceptance >= 40 : true));
    
    return matchesSearch && matchesDifficulty && matchesTopic && matchesCompany && matchesStatus && matchesFrequency && matchesAcceptance;
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
        {/* Initial view - Search bar and filter button */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Difficulty Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Difficulty</label>
                <div className="flex space-x-2">
                  <Select value={difficultyOperator} onValueChange={setDifficultyOperator}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">Is</SelectItem>
                      <SelectItem value="is-not">Is not</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Topic Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Topic</label>
                <div className="flex space-x-2">
                  <Select value={topicOperator} onValueChange={setTopicOperator}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">Is</SelectItem>
                      <SelectItem value="is-not">Is not</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={topicFilter} onValueChange={setTopicFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Array">Array</SelectItem>
                      <SelectItem value="String">String</SelectItem>
                      <SelectItem value="Tree">Tree</SelectItem>
                      <SelectItem value="Hash Table">Hash Table</SelectItem>
                      <SelectItem value="Stack">Stack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Company Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company</label>
                <div className="flex space-x-2">
                  <Select value={companyOperator} onValueChange={setCompanyOperator}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">Is</SelectItem>
                      <SelectItem value="is-not">Is not</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={companyFilter} onValueChange={setCompanyFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Amazon">Amazon</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="Microsoft">Microsoft</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Apple">Apple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="flex space-x-2">
                  <Select value={statusOperator} onValueChange={setStatusOperator}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">Is</SelectItem>
                      <SelectItem value="is-not">Is not</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="solved">Solved</SelectItem>
                      <SelectItem value="attempted">Attempted</SelectItem>
                      <SelectItem value="unsolved">Unsolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Frequency Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Question Frequency</label>
                <div className="flex space-x-2">
                  <Select value={frequencyOperator} onValueChange={setFrequencyOperator}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">Is</SelectItem>
                      <SelectItem value="is-not">Is not</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="more-than-90">More than 90</SelectItem>
                      <SelectItem value="more-than-80">More than 80</SelectItem>
                      <SelectItem value="more-than-70">More than 70</SelectItem>
                      <SelectItem value="less-than-50">Less than 50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Acceptance Rate Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Acceptance Rate</label>
                <div className="flex space-x-2">
                  <Select value={acceptanceOperator} onValueChange={setAcceptanceOperator}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">Is</SelectItem>
                      <SelectItem value="is-not">Is not</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={acceptanceFilter} onValueChange={setAcceptanceFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select acceptance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="high">High (60%+)</SelectItem>
                      <SelectItem value="medium">Medium (40-60%)</SelectItem>
                      <SelectItem value="low">Low (under 40%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
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
                    <span className="text-sm text-gray-500">
                      Freq: {question.frequency}
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
