import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { FileText, Download, BookOpen, Video, Headphones, PenTool } from 'lucide-react';

export default function LearningMaterialsPage() {
  const materialCategories = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Grammar Guides',
      description: 'Comprehensive PDFs covering all grammar topics from basics to advanced',
      count: '50+ guides',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Vocabulary Lists',
      description: 'Themed word lists with examples and usage notes',
      count: '100+ lists',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: 'Practice Worksheets',
      description: 'Printable exercises with answer keys for self-study',
      count: '200+ worksheets',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: 'Audio Files',
      description: 'MP3 downloads for listening practice and pronunciation',
      count: '300+ audio files',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Video Transcripts',
      description: 'Text versions of all video lessons for reference',
      count: '500+ transcripts',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Templates',
      description: 'Email, letter, and essay templates for writing practice',
      count: '75+ templates',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const featuredResources = [
    {
      title: 'Complete Grammar Handbook',
      description: 'All English grammar rules in one comprehensive 200-page guide',
      type: 'PDF',
      size: '12 MB',
      pages: '200 pages'
    },
    {
      title: 'Business English Toolkit',
      description: 'Essential phrases, templates, and vocabulary for professional settings',
      type: 'ZIP',
      size: '45 MB',
      pages: '150+ files'
    },
    {
      title: 'IELTS Preparation Pack',
      description: 'Complete study materials for all four IELTS sections',
      type: 'PDF Bundle',
      size: '85 MB',
      pages: '500+ pages'
    },
    {
      title: 'Pronunciation Master Kit',
      description: 'Audio files and guides for perfect English pronunciation',
      type: 'Audio Pack',
      size: '120 MB',
      pages: '300+ files'
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-warm-50 via-white to-warm-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-full mb-6">
            <Download className="w-4 h-4 text-primary-700" />
            <span className="text-sm font-medium text-primary-700">Free Resources</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-6">
            Comprehensive Learning Materials
          </h2>
          
          <p className="inline-flex items-center text-warm-600 mb-8 max-w-2xl mx-auto pb-6">
            Download PDFs, worksheets, audio files, and templates to support your English learning journey. All materials available offline.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Access All Materials
            </Link>
            <Link
              href="#materials"
              className="px-8 py-4 bg-white text-primary-700 border-2 border-primary-200 rounded-xl font-semibold text-lg hover:bg-warm-50 transition-all"
            >
              Browse Library
            </Link>
          </div>
        </div>
      </section>

      {/* Material Categories */}
      <section id="materials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Everything You Need to Study
            </h2>
            <p className="text-xl text-warm-600">
              Download and study anytime, anywhere
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materialCategories.map((category, idx) => (
              <div
                key={idx}
                className="bg-white border border-warm-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {category.title}
                </h3>
                
                <p className="text-warm-600 mb-4">
                  {category.description}
                </p>
                
                <div className="text-sm font-medium text-primary-600">
                  {category.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Featured Resource Packs
            </h2>
            <p className="text-xl text-warm-600">
              Curated collections for comprehensive learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredResources.map((resource, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-200 p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-warm-600 mb-4">
                      {resource.description}
                    </p>
                  </div>
                  <Download className="w-6 h-6 text-primary-600 flex-shrink-0 ml-4" />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-warm-700 mb-6">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                    {resource.type}
                  </span>
                  <span>{resource.size}</span>
                  <span>{resource.pages}</span>
                </div>
                
                <Link
                  href="/signup"
                  className="block w-full py-3 bg-primary-600 text-white text-center rounded-xl font-semibold hover:bg-primary-700 transition-all"
                >
                  Download Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">1,500+</div>
              <div className="text-warm-700">Total resources</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">Offline</div>
              <div className="text-warm-700">Study anywhere</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">Free</div>
              <div className="text-warm-700">With any plan</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Get Instant Access to All Materials
          </h2>
          <p className="text-xl text-warm-600 mb-8 pb-6">
            Start downloading and studying today - completely free
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg"
          >
            Sign Up Free
            <Download className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
