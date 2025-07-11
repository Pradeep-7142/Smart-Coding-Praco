
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Calendar, TrendingUp, CheckCircle2, Clock, XCircle, Check } from "lucide-react";
import { ActivityCalendar } from "./ActivityCalendar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const mockUserData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  company: "Amazon",
  topicsToPrep: ["Dynamic Programming", "System Design", "Trees", "Graphs"],
  stats: {
    totalSolved: 127,
    totalQuestions: 400,
    easysolved: 45,
    mediumSolved: 62,
    hardSolved: 20,
    streak: 12,
    dailyTarget: 5,
    dailySolved: 5
  },
  recentActivity: [
    { question: "Longest Palindromic Substring", difficulty: "Medium", status: "solved", date: "2024-01-15" },
    { question: "Binary Tree Maximum Path Sum", difficulty: "Hard", status: "attempted", date: "2024-01-14" },
    { question: "Valid Parentheses", difficulty: "Easy", status: "solved", date: "2024-01-14" },
    { question: "Merge Intervals", difficulty: "Medium", status: "solved", date: "2024-01-13" }
  ],
  topicProgress: [
    { topic: "Arrays", solved: 25, total: 30, percentage: 83 },
    { topic: "Dynamic Programming", solved: 18, total: 35, percentage: 51 },
    { topic: "Trees", solved: 22, total: 28, percentage: 79 },
    { topic: "Graphs", solved: 12, total: 25, percentage: 48 },
    { topic: "System Design", solved: 5, total: 15, percentage: 33 }
  ],
  companyFrequency: [
    { company: "Google", questions: 45 },
    { company: "Amazon", questions: 38 },
    { company: "Meta", questions: 32 },
    { company: "Microsoft", questions: 28 },
    { company: "Apple", questions: 22 }
  ],
  acceptanceRateDistribution: [
    { range: "80-100%", count: 15 },
    { range: "60-79%", count: 32 },
    { range: "40-59%", count: 48 },
    { range: "20-39%", count: 25 },
    { range: "0-19%", count: 7 }
  ]
};

const difficultyData = [
  { name: "Easy", value: mockUserData.stats.easysolved, fill: "#22c55e" },
  { name: "Medium", value: mockUserData.stats.mediumSolved, fill: "#eab308" },
  { name: "Hard", value: mockUserData.stats.hardSolved, fill: "#ef4444" }
];

const topicColors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

const chartConfig = {
  solved: {
    label: "Questions Solved",
  },
  easy: {
    label: "Easy",
    color: "#22c55e",
  },
  medium: {
    label: "Medium", 
    color: "#eab308",
  },
  hard: {
    label: "Hard",
    color: "#ef4444",
  },
};

export const UserDashboard = () => {
  const { stats } = mockUserData;
  const overallProgress = (stats.totalSolved / stats.totalQuestions) * 100;
  const isDailyTargetMet = stats.dailySolved >= stats.dailyTarget;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "Hard": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "solved": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "attempted": return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{mockUserData.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">{mockUserData.name}</CardTitle>
              <p className="text-blue-100">{mockUserData.email}</p>
              <p className="text-blue-100">Preparing for: {mockUserData.company}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Solved</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalSolved}</div>
            <p className="text-xs text-gray-500">of {stats.totalQuestions} questions</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Current Streak</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.streak}</div>
            <p className="text-xs text-gray-500">days</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Daily Target</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">{stats.dailySolved}/{stats.dailyTarget}</div>
              {isDailyTargetMet && <Check className="ml-2 h-5 w-5 text-green-500" />}
            </div>
            <div className="mt-2">
              {isDailyTargetMet ? (
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-green-600 font-medium">Completed!</div>
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-green-100">
                    <img 
                      src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80" 
                      alt="Achievement" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-500">problems today</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Progress</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{Math.round(overallProgress)}%</div>
            <Progress value={overallProgress} className="mt-1" />
          </CardContent>
        </Card>
      </div>

      {/* Activity Calendar */}
      <ActivityCalendar />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty Distribution Pie Chart */}
        <Card className="bg-white border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Difficulty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                />
              </PieChart>
            </ChartContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {difficultyData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Topic Progress Bar Chart */}
        <Card className="bg-white border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Topic Mastery</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={mockUserData.topicProgress} layout="horizontal">
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="topic" type="category" width={80} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`${value}%`, 'Progress']}
                />
                <Bar 
                  dataKey="percentage" 
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Company Frequency Chart */}
        <Card className="bg-white border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Company Question Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={mockUserData.companyFrequency}>
                <XAxis dataKey="company" />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`${value}`, 'Questions']}
                />
                <Bar 
                  dataKey="questions" 
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Acceptance Rate Distribution */}
        <Card className="bg-white border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Acceptance Rate Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={mockUserData.acceptanceRateDistribution}>
                <XAxis dataKey="range" />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`${value}`, 'Questions']}
                />
                <Bar 
                  dataKey="count" 
                  fill="#06b6d4"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Difficulty Breakdown */}
      <Card className="bg-white border border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Difficulty Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{stats.easysolved}</div>
              <div className="text-sm text-green-700">Easy</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{stats.mediumSolved}</div>
              <div className="text-sm text-yellow-700">Medium</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{stats.hardSolved}</div>
              <div className="text-sm text-red-700">Hard</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic Progress */}
      <Card className="bg-white border border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Topic Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUserData.topicProgress.map((topic) => (
              <div key={topic.topic} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{topic.topic}</span>
                  <span className="text-sm text-gray-500">{topic.solved}/{topic.total}</span>
                </div>
                <Progress value={topic.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white border border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockUserData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(activity.status)}
                  <div>
                    <div className="font-medium text-gray-900">{activity.question}</div>
                    <div className="text-sm text-gray-500">{activity.date}</div>
                  </div>
                </div>
                <Badge className={`${getDifficultyColor(activity.difficulty)} bg-transparent border-0`}>
                  {activity.difficulty}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preparation Topics */}
      <Card className="bg-white border border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Focus Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockUserData.topicsToPrep.map((topic) => (
              <Badge key={topic} className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
