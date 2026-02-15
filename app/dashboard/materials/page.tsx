'use client';

import { useState } from 'react';
import { FileText, Download, ExternalLink, BookOpen, PenTool } from 'lucide-react';

interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string; // Real external URL
}

export default function DashboardMaterialsPage() {
  const [filter, setFilter] = useState<string>('all');

  const materials: Material[] = [
    {
      id: '1',
      title: 'English Grammar in Use (Sample)',
      description: 'Essential grammar reference with exercises - Cambridge University Press sample',
      category: 'Grammar',
      level: 'Beginner',
      url: 'https://assets.cambridge.org/97811084/86163/excerpt/9781108486163_excerpt.pdf',
    },
    {
      id: '2',
      title: 'Academic Word List',
      description: 'The most frequent academic English words compiled by Victoria University',
      category: 'Vocabulary',
      level: 'Intermediate',
      url: 'https://www.wgtn.ac.nz/lals/resources/academicwordlist/awl-headwords/Headwords-of-the-Academic-Word-List.pdf',
    },
    {
      id: '3',
      title: 'IELTS Practice Test Sample',
      description: 'Official IELTS practice materials from British Council',
      category: 'IELTS Prep',
      level: 'Advanced',
      url: 'https://takeielts.britishcouncil.org/sites/default/files/ielts_practice_test.pdf',
    },
    {
      id: '4',
      title: 'Business Email Writing Guide',
      description: 'Professional email templates and phrases for workplace communication',
      category: 'Writing',
      level: 'Intermediate',
      url: 'https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/basic_business_letters/index.html',
    },
    {
      id: '5',
      title: 'Common English Idioms',
      description: 'Collection of 200+ commonly used English idioms with examples',
      category: 'Vocabulary',
      level: 'Advanced',
      url: 'https://www.ef.com/wwen/english-resources/english-idioms/',
    },
    {
      id: '6',
      title: 'Pronunciation Guide - IPA Chart',
      description: 'International Phonetic Alphabet chart for English sounds',
      category: 'Pronunciation',
      level: 'Beginner',
      url: 'https://www.internationalphoneticalphabet.org/ipa-charts/ipa-symbols-with-soundsamerican-english/',
    },
    {
      id: '7',
      title: 'TOEFL iBT Free Practice Test',
      description: 'Official free practice test from ETS',
      category: 'TOEFL Prep',
      level: 'Advanced',
      url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/practice-tests.html',
    },
    {
      id: '8',
      title: 'Oxford 3000 Word List',
      description: 'The 3000 most important words to learn in English by Oxford',
      category: 'Vocabulary',
      level: 'Beginner',
      url: 'https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000',
    },
    {
      id: '9',
      title: 'Phrasal Verbs List',
      description: 'Comprehensive list of phrasal verbs with meanings and examples',
      category: 'Grammar',
      level: 'Intermediate',
      url: 'https://www.englishclub.com/vocabulary/phrasal-verbs-list.htm',
    },
    {
      id: '10',
      title: 'Interview Question Bank',
      description: '50 most common interview questions with sample answers',
      category: 'Interview Prep',
      level: 'Intermediate',
      url: 'https://www.themuse.com/advice/interview-questions-and-answers',
    },
  ];

  const categories = ['all', ...new Set(materials.map((m) => m.category))];
  const filtered = filter === 'all' ? materials : materials.filter((m) => m.category === filter);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-2">Learning Materials</h1>
        <p className="text-warm-600">Free resources to support your English learning journey</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === cat
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-warm-200 text-warm-700 hover:bg-warm-50'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Materials grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((m) => (
          <a
            key={m.id}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl border border-warm-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group block"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <ExternalLink className="w-4 h-4 text-warm-400 group-hover:text-primary-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-primary-900 text-sm mb-1 group-hover:text-primary-600 transition-colors">
              {m.title}
            </h3>
            <p className="text-xs text-warm-600 mb-3 line-clamp-2">{m.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium">{m.level}</span>
              <span className="text-xs text-warm-500">{m.category}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
