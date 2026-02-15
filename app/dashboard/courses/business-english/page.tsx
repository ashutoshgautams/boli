/* eslint-disable react-hooks/purity */
'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import BoliLogo from './../../../components/Bolilogo';
import { ArrowLeft, CheckCircle2, BookOpen, Clock, Award, ChevronDown, Printer, Trophy, Star, Zap, Lock } from 'lucide-react';

// Convert **bold** markdown to <strong> tags, escape HTML
function renderContent(text: string): string {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  completed: boolean;
  locked: boolean;
}

interface Module {
  id: string;
  title: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

interface ExamResult {
  _id: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  createdAt: string;
}

export default function BusinessEnglishCoursePage() {
  const { data: session } = useSession();
  const certRef = useRef<HTMLDivElement>(null);

  const [modules, setModules] = useState<Module[]>([
    {
      id: 'm1',
      title: 'Email Writing',
      icon: '✉️',
      color: 'from-blue-400 to-blue-500',
      lessons: [
        { id: 'l1', title: 'Introduction to Business Emails', duration: '8 min read', completed: false, locked: false, content: `Professional email communication is the backbone of modern business. Every day, billions of emails are sent globally, and the quality of your emails directly impacts how people perceive you.\n\n**Key Principles:**\n\nClarity comes first. Every email should have one clear purpose. Before writing, ask yourself: "What do I want the reader to do after reading this?"\n\nStructure matters. Use the inverted pyramid — most important information first, supporting details next, background last.\n\n**The 5 Elements of Every Professional Email:**\n\n1. Subject Line — Be specific. "Q3 Budget Review — Action Required by Friday" is better than "Budget"\n2. Greeting — Match formality to your relationship. "Dear Mr. Patel" for first contact, "Hi Priya" for colleagues\n3. Body — One topic per email. Use short paragraphs (2-3 sentences max)\n4. Call to Action — Be explicit: "Please review and share your feedback by Thursday EOD"\n5. Sign-off — "Best regards" is safe for most situations\n\n**Common Mistakes:**\n- Writing "Please do the needful" (outdated and unclear)\n- Using "ASAP" without a specific deadline\n- Replying all unnecessarily\n- Missing the subject line\n\n**Practice:** Write an email to your manager requesting 2 days of leave next week. Include the reason, your plan for pending work, and suggest who can cover for you.` },
        { id: 'l2', title: 'Formal vs Informal Communication', duration: '6 min read', completed: false, locked: false, content: `Understanding when to use formal or informal language is crucial in business settings.\n\n**Formal Language — Use When:**\n- First contact with someone\n- Writing to senior management\n- External client communication\n- Official requests or complaints\n\n**Examples of Formal Phrasing:**\n- ❌ "Hey, can you do this?" → ✅ "Could you please review this document?"\n- ❌ "Thanks!" → ✅ "Thank you for your time and consideration."\n- ❌ "Got it" → ✅ "I acknowledge receipt of your message."\n- ❌ "FYI" → ✅ "For your information/reference"\n\n**Informal (but professional) — Use When:**\n- Communicating with close colleagues\n- Internal team messages\n- Follow-up emails after relationship is established\n\n**The Spectrum:**\nVery Formal → Formal → Neutral → Informal → Very Informal\n"I would be grateful..." → "Could you please..." → "Can you..." → "Hey, could you..." → "Yo, do this"\n\nIn Indian business culture, it's generally better to err on the side of formality, especially with:\n- New contacts\n- People senior to you\n- Cross-cultural communication\n\n**Practice:** Rewrite this informal message formally: "Hey Raj, can you send me that file? Need it ASAP. Thanks!"` },
        { id: 'l3', title: 'Email Structure & Templates', duration: '10 min read', completed: false, locked: false, content: `Master these 5 email templates and you'll handle 80% of business situations.\n\n**Template 1: Meeting Request**\nSubject: Meeting Request — [Topic] — [Proposed Date]\n\nDear [Name],\n\nI hope this email finds you well. I would like to schedule a meeting to discuss [topic].\n\nWould [date] at [time] work for you? The meeting should take approximately [duration].\n\nPlease let me know if this works, or suggest an alternative time.\n\nBest regards,\n[Your name]\n\n**Template 2: Follow-Up After Meeting**\nSubject: Follow-Up — [Meeting Topic] — Action Items\n\nHi [Name],\n\nThank you for your time today. Here's a summary of what we discussed:\n\n• [Key point 1]\n• [Key point 2]\n\nAction items:\n• [Person] will [task] by [deadline]\n• [Person] will [task] by [deadline]\n\nPlease let me know if I've missed anything.\n\nBest regards\n\n**Template 3: Polite Reminder**\nSubject: Gentle Reminder — [Original Topic]\n\nHi [Name],\n\nI hope you're doing well. I wanted to follow up on my previous email regarding [topic] sent on [date].\n\nI understand you may be busy, but I would appreciate your response by [new deadline] so we can [reason].\n\nThank you for your attention to this matter.\n\n**Template 4: Apologizing for a Mistake**\nSubject: Correction — [What was wrong]\n\nDear [Name],\n\nI apologize for the error in [what]. The correct [information] is [correction].\n\nI've taken steps to ensure this doesn't happen again. Please disregard the previous [email/document].\n\nSorry for any inconvenience.\n\n**Template 5: Requesting Information**\nSubject: Request for [Specific Information]\n\nDear [Name],\n\nI am writing to request [specific information] for [purpose].\n\nSpecifically, I need:\n1. [Item 1]\n2. [Item 2]\n\nCould you please share this by [deadline]? If you need any additional context, I'm happy to provide it.\n\nThank you in advance.\n\n**Practice:** Using Template 1, write a meeting request to your team lead about discussing the Q3 project timeline.` },
        { id: 'l4', title: 'Common Email Mistakes', duration: '5 min read', completed: false, locked: false, content: `Avoid these common email mistakes that make you look unprofessional.\n\n**1. The Wall of Text**\nNobody reads a 10-paragraph email. Keep it short. If it needs to be long, use bullet points and headers.\n\nRule of thumb: If your email is longer than your phone screen, it should probably be a meeting.\n\n**2. Unclear Subject Lines**\n❌ "Hi" / "Question" / "Important" / "(no subject)"\n✅ "Budget Approval Needed — Project Alpha — Due Friday"\n\n**3. Reply All Abuse**\nOnly use Reply All when everyone genuinely needs to see your response. "Thanks!" to 50 people is not helpful.\n\n**4. Missing Attachments**\nAlways mention attachments in the body first, then attach before hitting send. Use the phrase "Please find attached" as a trigger to actually attach the file.\n\n**5. Emotional Emails**\nNever send an email when angry. Write it, save as draft, review after 1 hour. The "overnight rule" works even better.\n\n**6. Indian English Pitfalls**\n- "Please do the needful" → "Please complete this" or "Please take the necessary action"\n- "Kindly revert" → "Please respond" or "Please let me know"\n- "Prepone" → "Move up" or "Reschedule earlier"\n- "I have a doubt" → "I have a question"\n\n**7. Tone Deafness**\nRead your email aloud before sending. If it sounds rude, add softeners like "I'd appreciate", "When you get a chance", "I understand you're busy".\n\n**Quick Checklist Before Sending:**\n□ Clear subject line?\n□ Right recipients?\n□ One clear purpose?\n□ Attachments included?\n□ Proofread for typos?\n□ Appropriate tone?\n□ Clear call to action?` },
      ]
    },
    {
      id: 'm2',
      title: 'Meeting Skills',
      icon: '🎯',
      color: 'from-purple-400 to-purple-500',
      lessons: [
        { id: 'l5', title: 'Preparing for Meetings', duration: '7 min read', completed: false, locked: false, content: `Preparation is what separates productive meetings from time-wasters.\n\n**Before the Meeting:**\n\n1. Know the agenda — If there isn't one, ask for it or suggest one\n2. Do your homework — Read relevant documents, prepare data\n3. Prepare your talking points — Write 2-3 key things you want to say\n4. Test your tech — For virtual meetings, check camera, mic, and internet 10 minutes early\n\n**Key Phrases for Meetings:**\n\nOpening: "Thank you for joining. Today we'll be discussing..."\nSharing opinion: "In my view..." / "Based on the data, I believe..."\nAgreeing: "I completely agree with [name]'s point about..."\nDisagreeing politely: "I see your point, however..." / "That's an interesting perspective. Another way to look at it is..."\nAsking for clarification: "Could you elaborate on that?" / "What do you mean by...?"\nSummarizing: "So if I understand correctly..." / "To summarize what we've discussed..."\nClosing: "Let me recap the action items..."\n\n**Virtual Meeting Etiquette:**\n- Camera on (builds trust and engagement)\n- Mute when not speaking\n- Use the raise hand feature\n- Don't multitask — people can tell\n- Speak clearly and slightly slower than normal\n\n**Practice:** Write down 3 talking points for a meeting about launching a new product feature.` },
        { id: 'l6', title: 'Leading Effective Discussions', duration: '8 min read', completed: false, locked: false, content: `Whether you're leading or participating, these skills make meetings productive.\n\n**The 3-Part Meeting Framework:**\n\n1. Opening (2 min): State purpose, expected outcome, time limit\n2. Discussion (bulk of time): Go through agenda items\n3. Closing (5 min): Summarize decisions, assign action items, set next meeting\n\n**Facilitating Discussion:**\n- "Let's hear from everyone on this. [Name], what are your thoughts?"\n- "We're running short on time. Let's table this for the next meeting."\n- "Great point. Can we get a concrete action item from this?"\n- "I notice we're going off-topic. Let's come back to [agenda item]."\n\n**Handling Difficult Situations:**\n\nSomeone dominates: "Thank you, [name]. I'd like to hear other perspectives too."\nAwkward silence: "Let me rephrase the question..." or "Shall I share my thoughts to get us started?"\nConflict: "Both perspectives are valid. How can we find a middle ground?"\nOff-topic: "That's important — let's add it to the parking lot and discuss after."\n\n**Taking and Sharing Notes:**\n\nUse this format for meeting minutes:\n- Date & attendees\n- Key discussion points (2-3 sentences each)\n- Decisions made\n- Action items: WHO will do WHAT by WHEN\n\n**Practice:** You're leading a 30-minute team standup. Write a brief agenda and 3 discussion prompts.` },
      ]
    },
    {
      id: 'm3',
      title: 'Presentation Skills',
      icon: '🎤',
      color: 'from-orange-400 to-orange-500',
      lessons: [
        { id: 'l7', title: 'Structuring Your Presentation', duration: '8 min read', completed: false, locked: false, content: `A great presentation follows the "Tell them" structure: Tell them what you'll tell them, tell them, then tell them what you told them.\n\n**The 10-20-30 Rule (Guy Kawasaki):**\n- 10 slides maximum\n- 20 minutes maximum\n- 30pt font minimum\n\n**Presentation Structure:**\n\n1. Hook (30 seconds) — Start with a surprising fact, question, or story. Never start with "Today I will talk about..."\n2. Problem (2 min) — What problem are you solving? Why should the audience care?\n3. Solution (5 min) — Your main content, divided into 3 key points\n4. Evidence (3 min) — Data, examples, case studies\n5. Call to Action (1 min) — What should the audience do next?\n6. Q&A (5 min) — Prepare for likely questions\n\n**Powerful Opening Lines:**\n- "What if I told you that [surprising fact]?"\n- "Imagine a world where [vision]..."\n- "[Relevant statistic] — and it's only getting worse."\n- "Last week, I made a mistake that taught me [lesson]."\n\n**Slide Design Tips:**\n- One idea per slide\n- Use images over text\n- Maximum 6 words per bullet\n- Dark text on light background for readability\n- Consistent fonts and colors\n\n**Practice:** Create a 5-slide outline for a presentation about "Why our team should adopt a new project management tool."` },
        { id: 'l8', title: 'Delivery & Confidence', duration: '6 min read', completed: false, locked: false, content: `Content is 40% of a great presentation. Delivery is 60%.\n\n**Voice:**\n- Speak 20% slower than normal conversation\n- Vary your pace — slow down for important points\n- Use strategic pauses (2-3 seconds) after key statements\n- Project your voice to the back of the room\n\n**Body Language:**\n- Stand tall, shoulders back\n- Make eye contact — look at different sections of the audience\n- Use hand gestures naturally (don't grip the podium)\n- Move purposefully — don't pace nervously\n- Smile genuinely, especially at the start\n\n**Handling Nervousness:**\n- Prepare 3x more than you think you need\n- Practice out loud at least 3 times\n- Arrive early and familiarize yourself with the space\n- Power pose for 2 minutes before (hands on hips, feet apart)\n- Focus on helping the audience, not on being perfect\n- Remember: the audience wants you to succeed\n\n**Handling Q&A:**\n- Repeat the question so everyone hears it\n- "That's a great question. Here's what I think..."\n- If you don't know: "I don't have that data handy. Let me get back to you by [date]."\n- Bridge technique: "That's related to an important point..." (redirect to your key message)\n\n**Common Indian English Pronunciation Tips:**\n- "Schedule" — SHED-yool (not SKED-yool in British English context)\n- "Development" — stress on second syllable: de-VEL-op-ment\n- V vs W sounds — practice "very well" with distinct sounds\n\n**Practice:** Record yourself giving a 2-minute presentation about your favorite hobby. Watch it back and note 3 things to improve.` },
      ]
    },
  ]);

  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>(['m1']);
  const [showExam, setShowExam] = useState(false);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [bestScore, setBestScore] = useState(0);

  // Load saved progress and exam results from DB
  useEffect(() => {
    // Fetch course progress
    fetch('/api/course-progress?courseId=business-english')
      .then((r) => r.json())
      .then((data) => {
        if (data.completedLessons?.length) {
          setModules((prev) =>
            prev.map((m) => ({
              ...m,
              lessons: m.lessons.map((l) => ({
                ...l,
                completed: data.completedLessons.includes(l.id) ? true : l.completed,
              })),
            }))
          );
        }
      })
      .catch(() => {});

    // Fetch exam results
    fetch('/api/exam-results?courseId=business-english')
      .then((r) => r.json())
      .then((data) => {
        setExamResults(data.results || []);
        if (data.results && data.results.length > 0) {
          const best = Math.max(...data.results.map((r: ExamResult) => r.score));
          setBestScore(best);
        }
      })
      .catch(() => {});
  }, []);

  const allLessons = modules.flatMap((m) => m.lessons);
  const completedCount = allLessons.filter((l) => l.completed).length;
  const totalCount = allLessons.length;
  const progress = Math.round((completedCount / totalCount) * 100);
  const allCompleted = completedCount === totalCount;

  const markComplete = (lessonId: string) => {
    setModules((prev) =>
      prev.map((m) => ({
        ...m,
        lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, completed: true } : l)),
      }))
    );
    // Save to DB
    fetch('/api/course-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: 'business-english', lessonId }),
    }).catch(() => {});
    setActiveLesson(null);
  };

  const examQuestions = [
    { q: 'What should every professional email have?', options: ['Emojis', 'A clear subject line', 'Multiple topics', 'Informal greeting'], correct: 1 },
    { q: 'Which is the correct formal alternative to "Please do the needful"?', options: ['Do it now', 'Please complete this task', 'ASAP please', 'Kindly revert'], correct: 1 },
    { q: 'What is the recommended meeting structure?', options: ['Jump straight to discussion', 'Opening → Discussion → Closing with action items', 'Let everyone talk freely', 'Read slides aloud'], correct: 1 },
    { q: 'How should you handle a question you don\'t know the answer to?', options: ['Make something up', 'Ignore the question', 'Say "I\'ll get back to you by [date]"', 'Change the topic'], correct: 2 },
    { q: 'What is the 10-20-30 rule for presentations?', options: ['10 hours, 20 slides, 30 people', '10 slides, 20 minutes, 30pt font', '10 topics, 20 examples, 30 minutes', '10 people, 20 slides, 30 minutes'], correct: 1 },
  ];

  const examScore = Object.keys(examAnswers).length === examQuestions.length
    ? examQuestions.reduce((score, q, i) => score + (examAnswers[i] === q.correct ? 1 : 0), 0)
    : 0;
  const passed = examScore >= 4;

  const handleExamSubmit = async () => {
    setExamSubmitted(true);

    // Save to database
    try {
      await fetch('/api/exam-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: 'business-english',
          score: examScore,
          totalQuestions: examQuestions.length,
          passed: examScore >= 4,
        }),
      });

      // Refresh exam results
      const res = await fetch('/api/exam-results?courseId=business-english');
      const data = await res.json();
      setExamResults(data.results || []);
      if (data.results && data.results.length > 0) {
        const best = Math.max(...data.results.map((r: ExamResult) => r.score));
        setBestScore(best);
      }
    } catch {
      // Silent fail
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Render active lesson content
  if (activeLesson) {
    const lesson = allLessons.find((l) => l.id === activeLesson)!;
    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setActiveLesson(null)} className="flex items-center gap-2 text-sm text-warm-600 hover:text-primary-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to course
        </button>
        <div className="bg-white rounded-2xl border border-warm-200 shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-2 text-xs text-warm-500 mb-2">
            <Clock className="w-3.5 h-3.5" /> {lesson.duration}
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-primary-900 mb-6">{lesson.title}</h1>
          <div
            className="prose prose-sm max-w-none text-warm-800 leading-relaxed whitespace-pre-line [&_strong]:font-bold [&_strong]:text-primary-900"
            dangerouslySetInnerHTML={{ __html: renderContent(lesson.content) }}
          />
          <div className="mt-8 pt-6 border-t border-warm-200 flex items-center justify-between">
            <div className="text-sm text-warm-600">
              {lesson.completed ? (
                <span className="flex items-center gap-1 text-green-600 font-medium"><CheckCircle2 className="w-4 h-4" /> Completed</span>
              ) : (
                'Mark as completed when you\'re done'
              )}
            </div>
            {!lesson.completed && (
              <button onClick={() => markComplete(lesson.id)} className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center gap-2 text-sm shadow-sm hover:shadow-md">
                <CheckCircle2 className="w-4 h-4" /> Mark Complete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Certificate view
  if (showCertificate) {
    const userName = session?.user?.name || 'Student';
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const displayScore = bestScore > examScore ? bestScore : examScore;
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setShowCertificate(false)} className="flex items-center gap-2 text-sm text-warm-600 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to course
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all shadow-sm">
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>
        <div ref={certRef} className="bg-white border-4 border-primary-600 rounded-2xl p-8 lg:p-12 text-center print:border-4 print:shadow-none shadow-lg">
          <div className="mb-6">
            <BoliLogo size={64} className="mx-auto mb-3" />
            <div className="text-sm text-warm-500 uppercase tracking-widest font-medium">Boli English Academy</div>
          </div>
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-2">Certificate of Completion</h1>
            <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full" />
          </div>
          <p className="text-warm-600 mb-2">This certifies that</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-4">{userName}</h2>
          <p className="text-warm-600 mb-2">has successfully completed the course</p>
          <h3 className="text-xl font-bold text-primary-800 mb-1" >Business English Mastery</h3>
          <p className="text-sm text-warm-500 mb-6">with a final exam score of {displayScore}/{examQuestions.length}</p>
          <div className="flex items-center justify-center gap-8 text-sm text-warm-600">
            <div>
              <div className="font-semibold text-primary-900">{today}</div>
              <div className="text-xs">Date of Completion</div>
            </div>
            <div className="w-px h-8 bg-warm-200" />
            <div>
              <div className="font-semibold text-primary-900">CERT-{Date.now().toString(36).toUpperCase()}</div>
              <div className="text-xs">Certificate ID</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exam view
  if (showExam) {
    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={() => { setShowExam(false); setExamSubmitted(false); setExamAnswers({}); }} className="flex items-center gap-2 text-sm text-warm-600 hover:text-primary-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to course
        </button>
        <div className="bg-white rounded-2xl border border-warm-200 shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-1">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h1 className="text-xl font-bold text-primary-900">Final Exam</h1>
          </div>
          <p className="text-sm text-warm-600 mb-6">Score 4/5 or higher to earn your certificate</p>

          <div className="space-y-6">
            {examQuestions.map((q, i) => (
              <div key={i} className="p-5 bg-gradient-to-br from-warm-50 to-white rounded-xl border border-warm-200 shadow-sm">
                <p className="font-semibold text-primary-900 text-sm mb-3 flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs">{i + 1}</span>
                  <span className="pt-0.5">{q.q}</span>
                </p>
                <div className="space-y-2 ml-8">
                  {q.options.map((opt, j) => {
                    const selected = examAnswers[i] === j;
                    const isCorrect = examSubmitted && j === q.correct;
                    const isWrong = examSubmitted && selected && j !== q.correct;
                    return (
                      <button
                        key={j}
                        onClick={() => !examSubmitted && setExamAnswers({ ...examAnswers, [i]: j })}
                        disabled={examSubmitted}
                        className={`w-full text-left p-3 rounded-lg text-sm transition-all font-medium ${
                          isCorrect ? 'bg-green-100 border-green-400 border-2 text-green-800 shadow-sm' :
                          isWrong ? 'bg-red-100 border-red-400 border-2 text-red-800 shadow-sm' :
                          selected ? 'bg-primary-100 border-primary-400 border-2 text-primary-800 shadow-sm' :
                          'bg-white border border-warm-200 hover:border-primary-300 hover:shadow-sm'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!examSubmitted ? (
            <button
              onClick={() => Object.keys(examAnswers).length === examQuestions.length && handleExamSubmit()}
              disabled={Object.keys(examAnswers).length !== examQuestions.length}
              className="mt-6 w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
            >
              Submit Exam
            </button>
          ) : (
            <div className="mt-6 p-6 rounded-xl text-center shadow-sm" style={{ backgroundColor: passed ? '#f0fdf4' : '#fef2f2' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: passed ? '#16a34a' : '#dc2626' }}>
                {examScore}/{examQuestions.length}
              </div>
              <p className="text-sm mb-4 font-medium" style={{ color: passed ? '#15803d' : '#b91c1c' }}>
                {passed ? '🎉 Congratulations! You passed!' : 'You need 4/5 to pass. Try again!'}
              </p>
              {passed ? (
                <button onClick={() => setShowCertificate(true)} className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all shadow-sm hover:shadow-md">
                  <Award className="w-4 h-4 inline mr-2" /> View Certificate
                </button>
              ) : (
                <button onClick={() => { setExamSubmitted(false); setExamAnswers({}); }} className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all shadow-sm hover:shadow-md">
                  Retake Exam
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main course view
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/dashboard/courses" className="flex items-center gap-2 text-sm text-warm-600 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to courses
      </Link>

      {/* Course header with gradient */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-400 to-primary-500 rounded-2xl p-6 lg:p-8 mb-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">Intermediate</span>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2" >Business English Mastery</h1>
          <p className="text-white/90 text-sm mb-4">Complete guide to professional English communication</p>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4 text-sm text-white/90">
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {totalCount} lessons</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {completedCount} completed</span>
            </div>
            <span className="text-xl font-bold">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-white rounded-full transition-all duration-500 shadow-sm" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Exam History */}
      {examResults.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-primary-900">Exam History</h3>
          </div>
          <div className="space-y-2">
            {examResults.slice(0, 3).map((result, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2.5 px-3 bg-white rounded-lg border border-blue-100">
                <span className="text-warm-600 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(result.createdAt).toLocaleDateString()}
                </span>
                <span className={`font-bold flex items-center gap-1 ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {result.score}/{result.totalQuestions} {result.passed ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
          {bestScore > 0 && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-warm-600 font-medium">Best Score:</span>
                <span className="font-bold text-green-600 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" /> {bestScore}/{examQuestions.length}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modules with improved styling */}
      <div className="space-y-5 mb-8">
        {modules.map((module, moduleIndex) => {
          const moduleCompleted = module.lessons.filter((l) => l.completed).length;
          const moduleTotal = module.lessons.length;
          const moduleProgress = Math.round((moduleCompleted / moduleTotal) * 100);
          
          return (
            <div key={module.id} className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setExpandedModules((prev) => prev.includes(module.id) ? prev.filter((m) => m !== module.id) : [...prev, module.id])}
                className="w-full flex items-center justify-between p-5 hover:bg-warm-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-3xl shadow-sm`}>
                    {module.icon}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-primary-900">{module.title}</span>
                      {moduleProgress === 100 && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-warm-500">
                      <span>{moduleCompleted}/{moduleTotal} completed</span>
                      <span>•</span>
                      <span>{moduleProgress}% progress</span>
                    </div>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-warm-400 transition-transform ${expandedModules.includes(module.id) ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedModules.includes(module.id) && (
                <div className="border-t border-warm-200 bg-warm-25">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson.id)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white transition-all text-left border-b border-warm-100 last:border-b-0 group"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        lesson.completed 
                          ? 'bg-green-100 group-hover:bg-green-200' 
                          : 'bg-blue-100 group-hover:bg-blue-200'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <span className="text-sm font-bold text-blue-600">{lessonIndex + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-primary-900 text-sm mb-0.5 group-hover:text-primary-700 transition-colors">{lesson.title}</div>
                        <div className="text-xs text-warm-500 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </div>
                      </div>
                      {lesson.completed && (
                        <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">Done</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Exam / Certificate CTA */}
      {allCompleted && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-primary-900 mb-2">🎉 All lessons completed!</h3>
          <p className="text-sm text-warm-700 mb-5">Take the final exam to earn your certificate of completion</p>
          <button onClick={() => setShowExam(true)} className="px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto">
            <Zap className="w-5 h-5" />
            Take Final Exam
          </button>
        </div>
      )}
    </div>
  );
}
