'use client';

import { useState } from 'react';
import { Play, CheckCircle2, Lock, Clock, Download, Award, ChevronDown, ChevronUp } from 'lucide-react';

type LessonContent = {
  summary: string;
  keyPoints: string[];
  transcript: string;
  downloadableResources: { name: string; size: string }[];
};

type Lesson = {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked?: boolean;
  videoUrl: string;
  content: LessonContent;
};

type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  modules: Module[];
};

export default function BusinessEnglishCoursePage() {
  const [expandedModule, setExpandedModule] = useState<string>('m1');
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);

  const course: Course = {
    id: '1',
    title: 'Business English Mastery',
    description: 'Master professional English communication in workplace settings',
    instructor: 'Sarah Johnson',
    level: 'Intermediate',
    totalLessons: 24,
    completedLessons: 13,
    progress: 54,
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Email Writing',
        description: 'Master professional email communication',
        lessons: [
          {
            id: 'l1',
            title: 'Introduction to Business Emails',
            duration: '12 min',
            completed: true,
            videoUrl: 'https://example.com/video1.mp4',
            content: {
              summary: 'Learn the fundamentals of writing professional business emails',
              keyPoints: [
                'Understanding email structure and format',
                'Professional vs casual tone',
                'Subject line best practices',
                'Opening and closing phrases'
              ],
              transcript: `
Welcome to Business Email Writing!

In today's digital workplace, email is the primary mode of communication. A well-written email can:
- Build professional relationships
- Communicate ideas clearly
- Get faster responses
- Reflect your professionalism

Key Elements of Professional Emails:
1. Clear subject line
2. Professional greeting
3. Concise body
4. Clear call-to-action
5. Professional signature

Common Mistakes to Avoid:
- Too casual language
- Unclear subject lines
- Wall of text
- No clear purpose
- Typos and errors

Practice Exercise:
Write a professional email requesting a meeting with your manager to discuss a project update.
              `,
              downloadableResources: [
                { name: 'Email Template Guide.pdf', size: '245 KB' },
                { name: 'Common Email Phrases.pdf', size: '180 KB' }
              ]
            }
          },
          {
            id: 'l2',
            title: 'Formal vs Informal Communication',
            duration: '15 min',
            completed: true,
            videoUrl: 'https://example.com/video2.mp4',
            content: {
              summary: 'Understand when to use formal or informal language in business emails',
              keyPoints: [
                'Identifying your audience',
                'Formal language patterns',
                'Informal vs casual tone',
                'Cultural considerations'
              ],
              transcript: `
Formal vs Informal Communication

Understanding Context:
The level of formality depends on:
- Your relationship with the recipient
- Company culture
- Purpose of communication
- Industry standards

Formal Language Examples:
❌ "Hey, can you do this?"
✅ "Could you please review this document?"

❌ "Thanks!"
✅ "Thank you for your time and consideration."

❌ "Got it"
✅ "I acknowledge receipt of your message."

Informal (but professional):
- With close colleagues
- Internal team communication
- Follow-up emails
- After established relationship

Always Formal:
- First contact
- Senior management
- External clients
- Official requests
- Complaints or concerns

Practice Scenarios:
1. Email to CEO requesting budget approval (FORMAL)
2. Follow-up with teammate on project status (INFORMAL)
3. Client proposal submission (FORMAL)
4. Thank you note to colleague (INFORMAL/NEUTRAL)
              `,
              downloadableResources: [
                { name: 'Formal Language Guide.pdf', size: '320 KB' }
              ]
            }
          },
          {
            id: 'l3',
            title: 'Email Structure & Templates',
            duration: '18 min',
            completed: true,
            videoUrl: 'https://example.com/video3.mp4',
            content: {
              summary: 'Learn proven email structures and ready-to-use templates',
              keyPoints: [
                'The 3-part email structure',
                'Opening strategies',
                'Body paragraph organization',
                'Strong closing statements'
              ],
              transcript: `
Professional Email Structure

The 3-Part Formula:
1. Opening (Greeting + Context)
2. Body (Main Message)
3. Closing (Action + Sign-off)

Part 1 - Opening:
"Dear [Name],

I hope this email finds you well. I am writing to discuss [topic]."

Part 2 - Body:
Present your points clearly:
- Use bullet points for clarity
- Keep paragraphs short (3-4 lines max)
- One idea per paragraph
- Use active voice

Part 3 - Closing:
"Please let me know if you need any additional information. I look forward to hearing from you.

Best regards,
[Your Name]"

Templates You'll Get:

1. Meeting Request:
Subject: Meeting Request - [Project Name]
Dear [Name],
I hope you're doing well. I would like to schedule a meeting to discuss [topic].
Could you please let me know your availability for [timeframe]?
Best regards,

2. Follow-up:
Subject: Following up on [Topic]
Dear [Name],
I wanted to follow up on my previous email regarding [topic].
Have you had a chance to review [document/proposal]?
Looking forward to your response.

3. Introduction:
Subject: Introduction - [Your Name] from [Company]
Dear [Name],
My name is [Your Name] and I am [position] at [company].
I am reaching out to discuss potential collaboration opportunities.
              `,
              downloadableResources: [
                { name: '20 Email Templates.pdf', size: '450 KB' },
                { name: 'Email Checklist.pdf', size: '125 KB' }
              ]
            }
          },
          {
            id: 'l4',
            title: 'Common Email Mistakes to Avoid',
            duration: '10 min',
            completed: true,
            videoUrl: 'https://example.com/video4.mp4',
            content: {
              summary: 'Identify and avoid the most common email writing mistakes',
              keyPoints: [
                'Grammar and spelling errors',
                'Unclear subject lines',
                'Too long or too short',
                'Missing context or attachments'
              ],
              transcript: `
Top 10 Email Mistakes

1. Vague Subject Lines
❌ "Quick question"
✅ "Budget Approval Request for Q2 Marketing Campaign"

2. No Clear Purpose
❌ Rambling about multiple topics
✅ One clear purpose per email

3. Reply All Abuse
Only use Reply All when everyone needs to see your response

4. Forgetting Attachments
Tip: Attach first, write email second

5. Too Long
Keep under 5 paragraphs
Use bullet points
Get to the point

6. No Greeting
❌ Starting directly with "I need..."
✅ "Dear John," or "Hi Sarah,"

7. Unclear Call-to-Action
❌ "Let me know what you think"
✅ "Please approve the budget by Friday, March 15"

8. Poor Formatting
- Use paragraphs
- Add white space
- Use bold for key points
- Number action items

9. Sending When Emotional
Wait 10 minutes before sending sensitive emails

10. Not Proofreading
Always read before sending
Use spell check
Check recipient names

Practice: Review these bad examples and rewrite them professionally
              `,
              downloadableResources: [
                { name: 'Email Mistakes Checklist.pdf', size: '190 KB' }
              ]
            }
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Meeting Communication',
        description: 'Effective communication in business meetings',
        lessons: [
          {
            id: 'l5',
            title: 'Preparing for Meetings',
            duration: '14 min',
            completed: true,
            videoUrl: 'https://example.com/video5.mp4',
            content: {
              summary: 'Learn how to prepare effectively for any business meeting',
              keyPoints: [
                'Setting meeting objectives',
                'Creating agendas',
                'Pre-meeting research',
                'Gathering necessary materials'
              ],
              transcript: `Coming soon - Full lesson content`,
              downloadableResources: [
                { name: 'Meeting Prep Template.pdf', size: '280 KB' }
              ]
            }
          },
          {
            id: 'l6',
            title: 'Active Participation Techniques',
            duration: '16 min',
            completed: true,
            videoUrl: 'https://example.com/video6.mp4',
            content: {
              summary: 'Techniques for contributing effectively in meetings',
              keyPoints: [
                'When to speak up',
                'How to interject politely',
                'Building on others\' ideas',
                'Disagreeing professionally'
              ],
              transcript: `Coming soon - Full lesson content`,
              downloadableResources: []
            }
          },
          {
            id: 'l7',
            title: 'Taking Meeting Notes',
            duration: '12 min',
            completed: false,
            videoUrl: 'https://example.com/video7.mp4',
            content: {
              summary: 'Effective note-taking strategies for business meetings',
              keyPoints: [],
              transcript: '',
              downloadableResources: []
            }
          },
          {
            id: 'l8',
            title: 'Following Up After Meetings',
            duration: '10 min',
            completed: false,
            videoUrl: 'https://example.com/video8.mp4',
            content: {
              summary: 'How to write effective meeting follow-up emails',
              keyPoints: [],
              transcript: '',
              downloadableResources: []
            }
          }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Presentations',
        description: 'Deliver compelling business presentations',
        lessons: [
          {
            id: 'l9',
            title: 'Structuring Your Presentation',
            duration: '20 min',
            completed: false,
            videoUrl: 'https://example.com/video9.mp4',
            content: { summary: '', keyPoints: [], transcript: '', downloadableResources: [] }
          },
          {
            id: 'l10',
            title: 'PowerPoint Best Practices',
            duration: '15 min',
            completed: false,
            videoUrl: 'https://example.com/video10.mp4',
            content: { summary: '', keyPoints: [], transcript: '', downloadableResources: [] }
          },
          {
            id: 'l11',
            title: 'Handling Q&A Sessions',
            duration: '12 min',
            completed: false,
            videoUrl: 'https://example.com/video11.mp4',
            content: { summary: '', keyPoints: [], transcript: '', downloadableResources: [] }
          },
          {
            id: 'l12',
            title: 'Body Language & Confidence',
            duration: '18 min',
            completed: false,
            videoUrl: 'https://example.com/video12.mp4',
            content: { summary: '', keyPoints: [], transcript: '', downloadableResources: [] }
          }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Negotiations',
        description: 'Master negotiation and persuasion',
        lessons: [
          {
            id: 'l13',
            title: 'Negotiation Fundamentals',
            duration: '22 min',
            completed: false,
            locked: true,
            videoUrl: '',
            content: { summary: '', keyPoints: [], transcript: '', downloadableResources: [] }
          },
          {
            id: 'l14',
            title: 'Win-Win Strategies',
            duration: '18 min',
            completed: false,
            locked: true,
            videoUrl: '',
            content: { summary: '', keyPoints: [], transcript: '', downloadableResources: [] }
          },
          {
            id: 'l15',
            title: 'Handling Difficult Conversations',
            duration: '20 min',
            completed: false,
            locked: true,
            videoUrl: '',
            content: { summary: '', keyPoints: [], transcript: '', downloadableResources: [] }
          },
          {
            id: 'l16',
            title: 'Closing the Deal',
            duration: '15 min',
            completed: false,
            locked: true,
            videoUrl: '',
            content: { summary: '', keyPoints: [], transcript: '', downloadableResources: [] }
          }
        ]
      }
    ]
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? '' : moduleId);
  };

  const openLesson = (lessonId: string) => {
    const lesson = course.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);
    if (lesson && !lesson.locked) {
      setCurrentLesson(lessonId);
    }
  };

  const currentLessonData = currentLesson 
    ? course.modules.flatMap(m => m.lessons).find(l => l.id === currentLesson)
    : null;

  if (currentLesson && currentLessonData) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Video Player */}
        <div className="bg-black rounded-2xl overflow-hidden mb-6">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <Play className="w-20 h-20 text-white opacity-50" />
          </div>
        </div>

        {/* Lesson Header */}
        <div className="bg-white rounded-2xl border border-warm-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-primary-900 mb-2">
                {currentLessonData.title}
              </h1>
              <p className="text-warm-600">{currentLessonData.content.summary}</p>
            </div>
            <button
              onClick={() => setCurrentLesson(null)}
              className="px-4 py-2 bg-warm-100 text-warm-700 rounded-lg hover:bg-warm-200 transition-all"
            >
              Back to Course
            </button>
          </div>

          {/* Key Points */}
          {currentLessonData.content.keyPoints.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary-900 mb-3">Key Learning Points:</h3>
              <ul className="space-y-2">
                {currentLessonData.content.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-warm-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Transcript */}
          {currentLessonData.content.transcript && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary-900 mb-3">Lesson Transcript:</h3>
              <div className="bg-warm-50 rounded-xl p-6 text-sm text-warm-700 whitespace-pre-line leading-relaxed">
                {currentLessonData.content.transcript}
              </div>
            </div>
          )}

          {/* Downloadable Resources */}
          {currentLessonData.content.downloadableResources.length > 0 && (
            <div>
              <h3 className="font-semibold text-primary-900 mb-3">Downloadable Resources:</h3>
              <div className="space-y-2">
                {currentLessonData.content.downloadableResources.map((resource, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-warm-50 rounded-lg hover:bg-warm-100 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-primary-900">{resource.name}</p>
                        <p className="text-xs text-warm-600">{resource.size}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mark Complete */}
        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-primary-900 mb-1">Finished this lesson?</h3>
              <p className="text-sm text-warm-600">Mark as complete to track your progress</p>
            </div>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Mark Complete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
              {course.level}
            </span>
            <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
            <p className="text-white/90 text-lg mb-4">{course.description}</p>
            <p className="text-white/80">Instructor: {course.instructor}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Your Progress</span>
            <span className="text-2xl font-bold">{course.progress}%</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <p className="text-white/80 text-sm mt-2">
            {course.completedLessons} of {course.totalLessons} lessons completed
          </p>
        </div>
      </div>

      {/* Course Content */}
      <div className="space-y-4">
        {course.modules.map((module) => (
          <div key={module.id} className="bg-white rounded-2xl border border-warm-200 overflow-hidden">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-warm-50 transition-all"
            >
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-primary-900 mb-1">
                  {module.title}
                </h3>
                <p className="text-sm text-warm-600">{module.description}</p>
                <p className="text-xs text-warm-500 mt-2">
                  {module.lessons.filter(l => l.completed).length} / {module.lessons.length} lessons
                </p>
              </div>
              {expandedModule === module.id ? (
                <ChevronUp className="w-6 h-6 text-warm-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-warm-600" />
              )}
            </button>

            {/* Lessons */}
            {expandedModule === module.id && (
              <div className="border-t border-warm-200">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => openLesson(lesson.id)}
                    disabled={lesson.locked}
                    className={`w-full p-4 flex items-center gap-4 border-b border-warm-100 last:border-0 transition-all ${
                      lesson.locked
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-warm-50 cursor-pointer'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      lesson.completed
                        ? 'bg-green-100'
                        : lesson.locked
                        ? 'bg-warm-100'
                        : 'bg-blue-100'
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : lesson.locked ? (
                        <Lock className="w-6 h-6 text-warm-400" />
                      ) : (
                        <Play className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-primary-900">{lesson.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-warm-600 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration}</span>
                        {lesson.completed && (
                          <span className="ml-2 text-green-600 font-medium">✓ Completed</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Certificate Section */}
      {course.progress === 100 && (
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
          <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-primary-900 mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-warm-700 mb-6">
            You&apos;ve completed all lessons. Claim your certificate now!
          </p>
          <button className="px-8 py-4 bg-yellow-600 text-white rounded-xl font-bold hover:bg-yellow-700 transition-all">
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
}
