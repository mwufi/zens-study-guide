'use client'

import React, { useRef, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const languages = ['javascript', 'python', 'java', 'cpp', 'ruby'];

export default function Editor() {
    const editorRef = useRef(null);
    const [language, setLanguage] = useState('javascript');

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        if (editorRef.current) {
            alert(editorRef.current.getValue());
        }
    }

    return (
        <>
            <div className="flex items-center space-x-4 mb-4">
                <button onClick={showValue} className="px-4 py-2 bg-blue-500 text-white rounded">Run</button>
                <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Languages</SelectLabel>
                            {languages.map(lang => (
                                <SelectItem key={lang} value={lang}>
                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <MonacoEditor
                height="90vh"
                language={language}
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
                options={{
                    fontSize: 16,
                    theme: 'solarized-light'
                }}
            />
        </>
    );
}
