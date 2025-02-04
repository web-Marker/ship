CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_email` text NOT NULL,
	`paid_at` integer NOT NULL,
	`seal_image` text(1048576) NOT NULL,
	`created_at` integer NOT NULL
);
