import { config } from 'dotenv';
import { db } from '../db';
import { leetcodeQuestions } from '../db/schema';
import { readFileSync } from 'fs';

config({ path: '.env.local' });

async function insertLeetcodeQuestions(filename: string) {
  try {
    const fileContent = readFileSync(filename, 'utf-8');
    const questions = JSON.parse(fileContent);

    for (const question of questions) {
      await db.insert(leetcodeQuestions).values({
        title: question.title,
        description: question.description,
        isPremium: question.isPremium,
        difficulty: question.difficulty.toLowerCase(),
        solutionLink: question.solutionLink,
        acceptanceRate: question.acceptanceRate,
        frequency: question.frequency,
        url: question.url,
        discussCount: question.discussCount,
        accepted: question.accepted,
        submissions: question.submissions,
        companies: question.companies,
        relatedTopics: question.relatedTopics,
        likes: question.likes,
        dislikes: question.dislikes,
        rating: question.rating,
        askedByFaang: question.askedByFaang,
        similarQuestions: question.similarQuestions,
      }).onConflictDoNothing();
    }

    console.log(`Inserted ${questions.length} questions into the database.`);
  } catch (error) {
    console.error('Error inserting questions:', error);
  }
}

const inputFilename = process.argv[2] || './bigdata/leetcode_questions_processed.json';
insertLeetcodeQuestions(inputFilename);
