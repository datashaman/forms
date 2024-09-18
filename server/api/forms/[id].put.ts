import { eq, and } from "drizzle-orm";
import { useValidatedParams, useValidatedBody, z, zh } from "h3-zod";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });

  const { completed } = await useValidatedBody(event, {
    completed: z.number().int().min(0).max(1),
  });

  const { user } = await requireUserSession(event);

  // List forms for the current user
  const form = await useDB()
    .update(tables.forms)
    .set({
      completed,
    })
    .where(and(eq(tables.forms.id, id), eq(tables.forms.userId, user.id)))
    .returning()
    .get();

  return form;
});
