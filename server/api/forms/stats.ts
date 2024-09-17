import { sql } from "drizzle-orm";

export default eventHandler(async () => {
  // Count the total number of forms
  return await useDB()
    .select({
      forms: sql<number>`count(*)`,
      users: sql<number>`count(distinct(${tables.forms.userId}))`,
    })
    .from(tables.forms)
    .get();
});
