
import TopicsSidebar from '@/components/blocks/TopicsSidebar';

export default function TopicsLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex h-screen">
            <TopicsSidebar />

            <div className="flex-1 p-6 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}