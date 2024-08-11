import { parse } from 'csv-parse';
import { readFileSync, writeFileSync } from 'fs';
import { argv, exit } from 'process';

const filePath = argv[2] || './bigdata/leetcode_questions.csv';
const outputPath = argv[3] || './bigdata/leetcode_questions_processed.json';

const difficultyEnum = ['Easy', 'Medium', 'Hard'];

function parseStringToArray(input: string): string[] {
    // Split the string by commas, then trim each element
    return input.split(',').map(item => item.trim());
}

function parseSimilarQuestions(input: string): Array<{ name: string; slug: string; difficulty: string }> {
    if (!input) return [];

    const questionRegex = /\[([^,]+),\s*([^,]+),\s*([^\]]+)\]/g;
    const matches = input.matchAll(questionRegex);

    return Array.from(matches).map(match => ({
        name: match[1].trim(),
        slug: match[2].trim(),
        difficulty: match[3].trim()
    }));
}


function processRecord(record) {
    try {
        return {
            id: parseInt(record.id) || null,
            title: record.title || '',
            description: record.description || '',
            isPremium: record.is_premium === 'true',
            difficulty: difficultyEnum.includes(record.difficulty) ? record.difficulty : 'Easy',
            solutionLink: record.solution_link || null,
            acceptanceRate: parseInt(record.acceptance_rate) || null,
            frequency: parseInt(record.frequency) || null,
            url: record.url || '',
            discussCount: parseInt(record.discuss_count) || 0,
            accepted: parseInt(record.accepted) || 0,
            submissions: parseInt(record.submissions) || 0,
            companies: record.companies ? parseStringToArray(record.companies) : [],
            relatedTopics: record.related_topics ? parseStringToArray(record.related_topics) : [],
            likes: parseInt(record.likes) || 0,
            dislikes: parseInt(record.dislikes) || 0,
            rating: parseInt(record.rating) || null,
            askedByFaang: record.asked_by_faang === 'true',
            similarQuestions: record.similar_questions ? parseSimilarQuestions(record.similar_questions) : []
        };
    } catch (error) {
        console.error('Error processing record:', error, record);
        exit(1);
        return null;
    }
}

try {
    const fileContent = readFileSync(filePath, 'utf-8');

    parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    }, (err, records) => {
        if (err) {
            console.error('Error parsing CSV:', err);
            return;
        }

        const processedRecords = records.map(processRecord);

        console.log(`Processed ${processedRecords.length} records.`);

        // Write processed records to a JSON file
        writeFileSync(outputPath, JSON.stringify(processedRecords, null, 2));
        console.log(`Processed data written to ${outputPath}`);
    });
} catch (error) {
    console.error('Error reading file:', error);
}