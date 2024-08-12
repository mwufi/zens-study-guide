ALTER TABLE "user_question_data" RENAME COLUMN "user_tags" TO "tags";--> statement-breakpoint
ALTER TABLE "user_question_data" ALTER COLUMN "notes_created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_question_data" ALTER COLUMN "notes_created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_question_data" DROP COLUMN IF EXISTS "notes_tags";