
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, Save, Plus, X, FileText, LogOut } from "lucide-react";
import type { ResumeTemplate } from "./ResumeBuilder";

interface ResumeEditorProps {
  template: ResumeTemplate;
  username: string;
  onBack: () => void;
  onLogout: () => void;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
  gpa?: string;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedIn: string;
    website: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
}

const ResumeEditor = ({ template, username, onBack, onLogout }: ResumeEditorProps) => {
  const { toast } = useToast();
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      year: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setResumeData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const resumeJson = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([resumeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName || 'resume'}_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Resume Saved!",
      description: "Your resume data has been saved to your device.",
    });
  };

  const handleDownload = () => {
    // Create a simple HTML version of the resume
    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .header h1 { margin: 0; font-size: 2.5em; color: #2563eb; }
        .contact-info { margin: 10px 0; }
        .section { margin: 30px 0; }
        .section h2 { color: #2563eb; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .experience-item, .education-item { margin: 20px 0; }
        .experience-item h3, .education-item h3 { margin: 0; color: #333; }
        .company, .school { font-style: italic; color: #666; }
        .duration, .year { color: #888; }
        .skills, .languages { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-tag, .language-tag { background: #e5e7eb; padding: 5px 10px; border-radius: 15px; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${resumeData.personalInfo.fullName || 'Your Name'}</h1>
        <div class="contact-info">
            ${resumeData.personalInfo.email && `<div>Email: ${resumeData.personalInfo.email}</div>`}
            ${resumeData.personalInfo.phone && `<div>Phone: ${resumeData.personalInfo.phone}</div>`}
            ${resumeData.personalInfo.address && `<div>Address: ${resumeData.personalInfo.address}</div>`}
            ${resumeData.personalInfo.linkedIn && `<div>LinkedIn: ${resumeData.personalInfo.linkedIn}</div>`}
            ${resumeData.personalInfo.website && `<div>Website: ${resumeData.personalInfo.website}</div>`}
        </div>
    </div>

    ${resumeData.summary && `
    <div class="section">
        <h2>Professional Summary</h2>
        <p>${resumeData.summary}</p>
    </div>`}

    ${resumeData.experience.length > 0 ? `
    <div class="section">
        <h2>Work Experience</h2>
        ${resumeData.experience.map(exp => `
        <div class="experience-item">
            <h3>${exp.title}</h3>
            <div class="company">${exp.company}</div>
            <div class="duration">${exp.duration}</div>
            <p>${exp.description}</p>
        </div>`).join('')}
    </div>` : ''}

    ${resumeData.education.length > 0 ? `
    <div class="section">
        <h2>Education</h2>
        ${resumeData.education.map(edu => `
        <div class="education-item">
            <h3>${edu.degree}</h3>
            <div class="school">${edu.school}</div>
            <div class="year">${edu.year}</div>
            ${edu.gpa && `<div>GPA: ${edu.gpa}</div>`}
        </div>`).join('')}
    </div>` : ''}

    ${resumeData.skills.length > 0 ? `
    <div class="section">
        <h2>Skills</h2>
        <div class="skills">
            ${resumeData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
    </div>` : ''}

    ${resumeData.languages.length > 0 ? `
    <div class="section">
        <h2>Languages</h2>
        <div class="languages">
            ${resumeData.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
        </div>
    </div>` : ''}
</body>
</html>`;

    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName || 'resume'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Resume Downloaded!",
      description: "Your resume has been downloaded as HTML file. You can open it in any browser and print as PDF.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                onClick={onBack}
                variant="outline" 
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-blue-400 mr-3" />
                <div>
                  <h1 className="text-xl font-bold text-white">{template.name}</h1>
                  <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                    {template.category}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleSave}
                variant="outline" 
                className="border-green-600 text-green-400 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button 
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="bg-white/10 backdrop-blur-md border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-white">Full Name</Label>
                    <Input
                      id="fullName"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                      }))}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-white">Address</Label>
                    <Input
                      id="address"
                      value={resumeData.personalInfo.address}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, address: e.target.value }
                      }))}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedIn" className="text-white">LinkedIn</Label>
                    <Input
                      id="linkedIn"
                      value={resumeData.personalInfo.linkedIn}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, linkedIn: e.target.value }
                      }))}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website" className="text-white">Website</Label>
                    <Input
                      id="website"
                      value={resumeData.personalInfo.website}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, website: e.target.value }
                      }))}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card className="bg-white/10 backdrop-blur-md border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={resumeData.summary}
                  onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Write a brief summary about yourself..."
                  className="bg-gray-800 border-gray-600 text-white h-24"
                />
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="bg-white/10 backdrop-blur-md border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Work Experience</CardTitle>
                  <Button onClick={addExperience} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <Button
                        onClick={() => removeExperience(exp.id)}
                        variant="destructive"
                        size="sm"
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mb-4">
                      <Input
                        placeholder="Duration (e.g., Jan 2020 - Present)"
                        value={exp.duration}
                        onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Textarea
                      placeholder="Job description and achievements..."
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white h-20"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="bg-white/10 backdrop-blur-md border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Education</CardTitle>
                  <Button onClick={addEducation} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Degree/Certification"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Input
                          placeholder="School/Institution"
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <Button
                        onClick={() => removeEducation(edu.id)}
                        variant="destructive"
                        size="sm"
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Year (e.g., 2020)"
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="GPA (optional)"
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-white/10 backdrop-blur-md border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Button onClick={addSkill} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-600 text-white">
                      {skill}
                      <Button
                        onClick={() => removeSkill(index)}
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0 text-white hover:bg-blue-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="bg-white/10 backdrop-blur-md border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Add a language..."
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Button onClick={addLanguage} size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.languages.map((language, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-600 text-white">
                      {language}
                      <Button
                        onClick={() => removeLanguage(index)}
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0 text-white hover:bg-purple-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24">
            <Card className="bg-white border-gray-300 shadow-2xl h-[800px] overflow-auto">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-gray-800 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Resume Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {/* Preview Content */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center border-b-2 border-gray-300 pb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {resumeData.personalInfo.fullName || 'Your Name'}
                    </h1>
                    <div className="text-gray-600 space-y-1">
                      {resumeData.personalInfo.email && <div>{resumeData.personalInfo.email}</div>}
                      {resumeData.personalInfo.phone && <div>{resumeData.personalInfo.phone}</div>}
                      {resumeData.personalInfo.address && <div>{resumeData.personalInfo.address}</div>}
                      {resumeData.personalInfo.linkedIn && <div>{resumeData.personalInfo.linkedIn}</div>}
                      {resumeData.personalInfo.website && <div>{resumeData.personalInfo.website}</div>}
                    </div>
                  </div>

                  {/* Summary */}
                  {resumeData.summary && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                        Professional Summary
                      </h2>
                      <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {resumeData.experience.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                        Work Experience
                      </h2>
                      <div className="space-y-4">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id}>
                            <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                            <div className="text-gray-600 italic">{exp.company}</div>
                            <div className="text-sm text-gray-500 mb-2">{exp.duration}</div>
                            <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {resumeData.education.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                        Education
                      </h2>
                      <div className="space-y-3">
                        {resumeData.education.map((edu) => (
                          <div key={edu.id}>
                            <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                            <div className="text-gray-600 italic">{edu.school}</div>
                            <div className="text-sm text-gray-500">
                              {edu.year}{edu.gpa && ` • GPA: ${edu.gpa}`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {resumeData.skills.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {resumeData.languages.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                        Languages
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.languages.map((language, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
