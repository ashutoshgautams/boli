'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardVocabularyPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/vocabulary-challenge');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-warm-500">Redirecting to Vocabulary Challenge...</div>
    </div>
  );
}
