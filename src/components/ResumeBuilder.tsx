
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Edit, User, LogOut } from "lucide-react";
import ResumeEditor from "./ResumeEditor";

interface ResumeBuilderProps {
  username: string;
  onLogout: () => void;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  category: 'student' | 'professional' | 'creative';
  description: string;
  preview: string;
  templatePhoto: string;
}

const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-student',
    name: 'Modern Student',
    category: 'student',
    description: 'Clean and modern design perfect for students and recent graduates',
    preview: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    templatePhoto: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop'
  },
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    category: 'professional',
    description: 'Traditional format ideal for experienced professionals',
    preview: 'bg-gradient-to-br from-gray-50 to-slate-100',
    templatePhoto: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop'
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'creative',
    description: 'Bold and creative layout for designers and artists',
    preview: 'bg-gradient-to-br from-purple-50 to-pink-100',
    templatePhoto: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
  },
  {
    id: 'tech-resume',
    name: 'Tech Professional',
    category: 'professional',
    description: 'Tech-focused design with modern elements',
    preview: 'bg-gradient-to-br from-green-50 to-emerald-100',
    templatePhoto: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'
  },
  {
    id: 'minimal-student',
    name: 'Minimal Student',
    category: 'student',
    description: 'Simple and clean design for internships',
    preview: 'bg-gradient-to-br from-orange-50 to-amber-100',
    templatePhoto: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
  },
  {
    id: 'executive-professional',
    name: 'Executive',
    category: 'professional',
    description: 'Premium design for senior-level positions',
    preview: 'bg-gradient-to-br from-red-50 to-rose-100',
    templatePhoto: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop'
  },
  {
    id: 'portfolio-creative',
    name: 'Portfolio Style',
    category: 'creative',
    description: 'Showcase your work with this portfolio-style resume',
    preview: 'bg-gradient-to-br from-cyan-50 to-blue-100',
    templatePhoto: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop'
  },
  {
    id: 'academic-student',
    name: 'Academic Focus',
    category: 'student',
    description: 'Perfect for academic positions and research roles',
    preview: 'bg-gradient-to-br from-violet-50 to-purple-100',
    templatePhoto: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop'
  }
];

const ResumeBuilder = ({ username, onLogout }: ResumeBuilderProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const [filter, setFilter] = useState<'all' | 'student' | 'professional' | 'creative'>('all');

  const filteredTemplates = filter === 'all' 
    ? resumeTemplates 
    : resumeTemplates.filter(template => template.category === filter);

  if (selectedTemplate) {
    return (
      <ResumeEditor 
        template={selectedTemplate} 
        username={username}
        onBack={() => setSelectedTemplate(null)}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white">ResumeForge</h1>
                <p className="text-gray-400 text-sm">Professional Resume Builder</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-300">
                <User className="h-4 w-4 mr-2" />
                <span>Welcome, {username}</span>
              </div>
              <Button 
                onClick={onLogout}
                variant="outline" 
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Perfect Resume Template
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Select from our professionally designed templates and create your resume in minutes
          </p>
          
          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            {[
              { key: 'all', label: 'All Templates' },
              { key: 'student', label: 'Student' },
              { key: 'professional', label: 'Professional' },
              { key: 'creative', label: 'Creative' }
            ].map(({ key, label }) => (
              <Button
                key={key}
                onClick={() => setFilter(key as any)}
                variant={filter === key ? "default" : "outline"}
                className={filter === key 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="bg-white/10 backdrop-blur-md border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setSelectedTemplate(template)}
            >
              <CardHeader className="pb-3">
                <div className="h-32 rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform">
                  <img 
                    src={template.templatePhoto} 
                    alt={`${template.name} template preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={
                      template.category === 'student' 
                        ? 'bg-blue-600 text-white' 
                        : template.category === 'professional'
                        ? 'bg-green-600 text-white'
                        : 'bg-purple-600 text-white'
                    }
                  >
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 mb-4">
                  {template.description}
                </CardDescription>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-500">
                  <Edit className="h-4 w-4 mr-2" />
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Why Choose ResumeForge?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Professional Templates</h4>
              <p className="text-gray-300">Choose from 8+ professionally designed templates</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Easy to Edit</h4>
              <p className="text-gray-300">Intuitive editor with real-time preview</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Free Download</h4>
              <p className="text-gray-300">Download your resume as PDF completely free</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
