CREATE TABLE `submissions` (
	`id` integer PRIMARY KEY NOT NULL,
	`form_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`data` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `forms` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`html` text NOT NULL,
	`created_at` integer NOT NULL
);
