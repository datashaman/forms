import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("forms", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").notNull(), // GitHub Id
  title: text("title").notNull(),
  html: text("html").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const submissions = sqliteTable("submissions", {
  id: integer("id").primaryKey(),
  formId: integer("form_id").notNull(),
  userId: integer("user_id").notNull(),
  data: text("data", { mode: "json" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
