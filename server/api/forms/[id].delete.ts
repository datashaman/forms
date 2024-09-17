import { eq, and } from "drizzle-orm";
import { useValidatedParams, zh } from "h3-zod";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const { user } = await requireUserSession(event);

  // List forms for the current user
  const deletedForm = await useDB()
    .delete(tables.forms)
    .where(and(eq(tables.forms.id, id), eq(tables.forms.userId, user.id)))
    .returning()
    .get();

  if (!deletedForm) {
    throw createError({
      statusCode: 404,
      message: "Form not found",
    });
  }
  return deletedForm;
});
