import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  // List forms for the current user
  const forms = await useDB()
    .select()
    .from(tables.forms)
    .where(eq(tables.forms.userId, user.id))
    .all();

  return forms;
});
