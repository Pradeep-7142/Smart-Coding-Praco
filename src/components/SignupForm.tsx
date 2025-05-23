
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Building2, Target, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignupFormProps {
  onSignup: () => void;
}

const companies = [
  "Amazon", "Google", "Microsoft", "Meta", "Apple", "Netflix", "Tesla", 
  "Uber", "Airbnb", "Spotify", "Adobe", "Salesforce", "Other"
];

const topics = [
  "Arrays", "Strings", "Hash Tables", "Linked Lists", "Stacks & Queues",
  "Trees", "Graphs", "Dynamic Programming", "Greedy Algorithms", "Backtracking",
  "Binary Search", "Sorting", "Two Pointers", "Sliding Window", "System Design"
];

export const SignupForm = ({ onSignup }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    selectedTopics: [] as string[]
  });
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const handleTopicToggle = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTopics: prev.selectedTopics.includes(topic)
        ? prev.selectedTopics.filter(t => t !== topic)
        : [...prev.selectedTopics, topic]
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.company) {
        toast({
          title: "Company Required",
          description: "Please select your target company.",
          variant: "destructive"
        });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = () => {
    if (formData.selectedTopics.length === 0) {
      toast({
        title: "Select Topics",
        description: "Please select at least one topic to prepare.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Account Created!",
      description: "Welcome to CodePrep. Let's start your preparation journey!",
    });
    
    onSignup();
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <User className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your full name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter your email"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Create a strong password"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Building2 className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Target Company</h2>
      </div>
      
      <div className="space-y-2">
        <Label>Which company are you preparing for?</Label>
        <Select value={formData.company} onValueChange={(value) => setFormData(prev => ({ ...prev, company: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select your target company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company} value={company}>{company}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.company && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Great choice! We'll customize your preparation plan for {formData.company} interviews.
          </p>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Preparation Topics</h2>
      </div>
      
      <div className="space-y-2 mb-4">
        <Label>Select topics you want to focus on:</Label>
        <p className="text-sm text-gray-600">Choose the areas you want to improve or master</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
        {topics.map((topic) => (
          <div key={topic} className="flex items-center space-x-2">
            <Checkbox
              id={topic}
              checked={formData.selectedTopics.includes(topic)}
              onCheckedChange={() => handleTopicToggle(topic)}
            />
            <Label htmlFor={topic} className="text-sm font-normal cursor-pointer">
              {topic}
            </Label>
          </div>
        ))}
      </div>

      {formData.selectedTopics.length > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium mb-2">
            Selected Topics ({formData.selectedTopics.length}):
          </p>
          <div className="flex flex-wrap gap-1">
            {formData.selectedTopics.map((topic) => (
              <span key={topic} className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Join CodePrep
          </CardTitle>
          <p className="text-gray-600">Start your coding interview preparation journey</p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-300'
                }`}>
                  {currentStep > step ? <CheckCircle2 className="h-5 w-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </Button>
            )}
            
            <div className="ml-auto">
              {currentStep < 3 ? (
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Create Account
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
