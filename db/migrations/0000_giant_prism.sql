DO $$ BEGIN
 CREATE TYPE "public"."difficulty" AS ENUM('easy', 'medium', 'hard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."language" AS ENUM('python', 'javascript', 'java', 'cpp', 'ruby');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leetcode_question_solution_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"language" "language" NOT NULL,
	"code" text NOT NULL,
	"success" boolean NOT NULL,
	"time_started" timestamp NOT NULL,
	"time_completed" timestamp,
	"test_cases_passed" integer DEFAULT 0 NOT NULL,
	"test_cases_failed" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leetcode_question_solutions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_id" integer NOT NULL,
	"language" "language" NOT NULL,
	"code" text NOT NULL,
	"explanation" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leetcode_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"is_premium" boolean DEFAULT false NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"solution_link" text,
	"acceptance_rate" integer,
	"frequency" integer,
	"url" text NOT NULL,
	"discuss_count" integer DEFAULT 0 NOT NULL,
	"accepted" integer DEFAULT 0 NOT NULL,
	"submissions" integer DEFAULT 0 NOT NULL,
	"companies" json,
	"related_topics" json,
	"likes" integer DEFAULT 0 NOT NULL,
	"dislikes" integer DEFAULT 0 NOT NULL,
	"rating" integer,
	"asked_by_faang" boolean DEFAULT false NOT NULL,
	"similar_questions" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leetcode_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"language" "language" NOT NULL,
	"code" text NOT NULL,
	"success" boolean NOT NULL,
	"test_cases_passed" integer DEFAULT 0 NOT NULL,
	"test_cases_failed" integer DEFAULT 0 NOT NULL,
	"run_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_question_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"user_tags" json,
	"notes" text,
	"notes_created_at" timestamp,
	"notes_tags" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leetcode_question_solution_attempts" ADD CONSTRAINT "leetcode_question_solution_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leetcode_question_solution_attempts" ADD CONSTRAINT "leetcode_question_solution_attempts_question_id_leetcode_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."leetcode_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leetcode_question_solutions" ADD CONSTRAINT "leetcode_question_solutions_question_id_leetcode_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."leetcode_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leetcode_runs" ADD CONSTRAINT "leetcode_runs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leetcode_runs" ADD CONSTRAINT "leetcode_runs_question_id_leetcode_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."leetcode_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_question_data" ADD CONSTRAINT "user_question_data_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_question_data" ADD CONSTRAINT "user_question_data_question_id_leetcode_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."leetcode_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
