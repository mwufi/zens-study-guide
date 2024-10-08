import {
    pgTable,
    serial,
    text,
    boolean,
    integer,
    timestamp,
    pgEnum,
    json,
    unique,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard']);
export const languageEnum = pgEnum('language', ['python', 'javascript', 'java', 'cpp', 'ruby']);

// Tables
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    settings: json('settings').$type<{
        theme: 'light' | 'dark';
        displayCompact: boolean;
        fontSize: 'small' | 'medium' | 'large';
    }>(),
});

export const leetcodeQuestions = pgTable('leetcode_questions', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    isPremium: boolean('is_premium').notNull().default(false),
    difficulty: difficultyEnum('difficulty').notNull(),
    solutionLink: text('solution_link'),
    acceptanceRate: integer('acceptance_rate'),
    frequency: integer('frequency'),
    url: text('url').notNull(),
    discussCount: integer('discuss_count').notNull().default(0),
    accepted: integer('accepted').notNull().default(0),
    submissions: integer('submissions').notNull().default(0),
    companies: json('companies').$type<string[]>(),
    relatedTopics: json('related_topics').$type<string[]>(),
    likes: integer('likes').notNull().default(0),
    dislikes: integer('dislikes').notNull().default(0),
    rating: integer('rating'),
    askedByFaang: boolean('asked_by_faang').notNull().default(false),
    similarQuestions: json('similar_questions').$type<{ name: string; slug: string; difficulty: string }[]>(),
});

// encapsulates many things, like favorite, notes, tags, etc.
export const leetcodeNotes = pgTable('user_question_data', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    questionId: integer('question_id').notNull().references(() => leetcodeQuestions.id),
    isFavorite: boolean('is_favorite').notNull().default(false),
    tags: json('tags').$type<string[]>(),
    notes: text('notes'),
    notesCreatedAt: timestamp('notes_created_at').notNull().defaultNow()
}, (table) => {
    return {
        userQuestionUnique: unique().on(table.userId, table.questionId),
    }
});

export const solutions = pgTable('leetcode_question_solutions', {
    id: serial('id').primaryKey(),
    questionId: integer('question_id').notNull().references(() => leetcodeQuestions.id),
    language: languageEnum('language').notNull(),
    code: text('code').notNull(),
    explanation: text('explanation'),
});

export const leetcodeQuestionSolutionAttempts = pgTable('leetcode_question_solution_attempts', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    questionId: integer('question_id').notNull().references(() => leetcodeQuestions.id),
    language: languageEnum('language').notNull(),
    code: text('code').notNull(),
    success: boolean('success').notNull(),
    timeStarted: timestamp('time_started').notNull(),
    timeCompleted: timestamp('time_completed'),
    testCasesPassed: integer('test_cases_passed').notNull().default(0),
    testCasesFailed: integer('test_cases_failed').notNull().default(0),
});

export const leetcodeRuns = pgTable('leetcode_runs', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    questionId: integer('question_id').notNull().references(() => leetcodeQuestions.id),
    language: languageEnum('language').notNull(),
    code: text('code').notNull(),
    success: boolean('success').notNull(),
    testCasesPassed: integer('test_cases_passed').notNull().default(0),
    testCasesFailed: integer('test_cases_failed').notNull().default(0),
    runAt: timestamp('run_at').notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    leetcodeNotes: many(leetcodeNotes),
    solutionAttempts: many(leetcodeQuestionSolutionAttempts),
    runs: many(leetcodeRuns),
}));

export const leetcodeQuestionsRelations = relations(leetcodeQuestions, ({ many }) => ({
    leetcodeNotes: many(leetcodeNotes),
    solutions: many(solutions),
    solutionAttempts: many(leetcodeQuestionSolutionAttempts),
    runs: many(leetcodeRuns),
}));

export const leetcodeNotesRelations = relations(leetcodeNotes, ({ one }) => ({
    user: one(users, {
        fields: [leetcodeNotes.userId],
        references: [users.id],
    }),
    question: one(leetcodeQuestions, {
        fields: [leetcodeNotes.questionId],
        references: [leetcodeQuestions.id],
    }),
}));

export const solutionsRelations = relations(solutions, ({ one }) => ({
    question: one(leetcodeQuestions, {
        fields: [solutions.questionId],
        references: [leetcodeQuestions.id],
    }),
}));

export const leetcodeQuestionSolutionAttemptsRelations = relations(leetcodeQuestionSolutionAttempts, ({ one }) => ({
    user: one(users, {
        fields: [leetcodeQuestionSolutionAttempts.userId],
        references: [users.id],
    }),
    question: one(leetcodeQuestions, {
        fields: [leetcodeQuestionSolutionAttempts.questionId],
        references: [leetcodeQuestions.id],
    }),
}));

export const leetcodeRunsRelations = relations(leetcodeRuns, ({ one }) => ({
    user: one(users, {
        fields: [leetcodeRuns.userId],
        references: [users.id],
    }),
    question: one(leetcodeQuestions, {
        fields: [leetcodeRuns.questionId],
        references: [leetcodeQuestions.id],
    }),
}));

// // regular view
// export const topicTagsView = pgMaterializedView("topicTags", {
//     topic: text("topic"),
//     questionCount: integer("question_count"),
// }).existing();


export const topics = pgTable('topics', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description')
});

export const concepts = pgTable('concepts', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description')
});

export const questions = pgTable('questions', {
    id: serial('id').primaryKey(),
    topicId: integer('topic_id').notNull().references(() => topics.id),
    title: text('title').notNull(),
    description: text('description').notNull(),
    relatedConcepts: json('related_concepts').$type<string[]>(),
    likes: integer('likes').notNull().default(0),
    dislikes: integer('dislikes').notNull().default(0),
    rating: integer('rating')
});

// each topicQuestion can have many notes
export const notes = pgTable('question_notes', {
    id: serial('id').primaryKey(),
    questionId: integer('question_id').notNull().references(() => questions.id),
    note: text('note').notNull(),
    createdBy: integer('created_by').notNull().references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const topicsRelations = relations(topics, ({ many }) => ({
    questions: many(questions)
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
    topic: one(topics, {
        fields: [questions.topicId],
        references: [topics.id],
    }),
    notes: many(notes)
}));
