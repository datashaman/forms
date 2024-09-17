import { useValidatedBody, z } from "h3-zod";

export default eventHandler(async (event) => {
  const { title } = await useValidatedBody(event, {
    title: z.string().min(1).max(100),
  });
  const { user } = await requireUserSession(event);

  // Insert form for the current user
  const form = await useDB()
    .insert(tables.forms)
    .values({
      userId: user.id,
      title,
      createdAt: new Date(),
    })
    .returning()
    .get();

  return form;
});
