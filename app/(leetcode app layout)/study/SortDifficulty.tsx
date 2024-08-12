'use client'
import { useRouter } from 'next/navigation';

import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const difficulties = ['all', 'easy', 'medium', 'hard'];

const SortDifficulty = () => {
    const router = useRouter();

    const onDifficultyChange = (selectedDifficulty: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (selectedDifficulty !== 'all') {
            searchParams.set('difficulty', selectedDifficulty);
        } else {
            searchParams.delete('difficulty');
        }
        const newUrl = `/study${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        router.push(newUrl);
    };

    return (
        <Select onValueChange={onDifficultyChange} defaultValue="all">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SortDifficulty;
