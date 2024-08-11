'use client'

import TopicsSidebar from '@/components/blocks/TopicsSidebar';

export default function InterviewTopicsViewer() {

  return (
    <div className="flex h-screen">
      <TopicsSidebar />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        Select a topic to view
      </div>
    </div>
  );
}