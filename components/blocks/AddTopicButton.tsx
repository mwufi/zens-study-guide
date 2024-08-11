'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AddTopicButton: React.FC = () => {
    const handleAddTopic = () => {
        // TODO: Implement the logic to add a new topic
        console.log('Add topic button clicked');
    };

    return (
        <Button
            onClick={handleAddTopic}
            className="mt-4 w-full flex items-center justify-center"
        >
            <Plus className="h-5 w-5 mr-2" />
            Add Topic
        </Button>
    );
};

export default AddTopicButton;
