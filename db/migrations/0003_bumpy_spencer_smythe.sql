ALTER TABLE "user_question_data" ADD CONSTRAINT "user_question_data_user_id_question_id_unique" UNIQUE("user_id","question_id");