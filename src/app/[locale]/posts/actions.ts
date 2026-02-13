"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createSchema = z.object({
  locale: z.enum(["ko", "en"]).default("ko"),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(20000),
  password: z.string().min(4).max(200),
});

const updateSchema = z.object({
  locale: z.enum(["ko", "en"]).default("ko"),
  id: z.string().min(1),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(20000),
  password: z.string().min(4).max(200),
});

const deleteSchema = z.object({
  locale: z.enum(["ko", "en"]).default("ko"),
  id: z.string().min(1),
  password: z.string().min(4).max(200),
});

export async function createPostAction(formData: FormData) {
  const parsed = createSchema.safeParse({
    locale: formData.get("locale"),
    title: formData.get("title"),
    content: formData.get("content"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    // For quick MVP: throw; the UI will show generic error.
    throw new Error("Invalid input");
  }

  const { locale, title, content, password } = parsed.data;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      passwordHash: await hashPassword(password),
    },
    select: { id: true },
  });

  revalidatePath(`/${locale}/posts`);
  redirect(`/${locale}/posts/${post.id}`);
}

export async function updatePostAction(formData: FormData) {
  const parsed = updateSchema.safeParse({
    locale: formData.get("locale"),
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
    password: formData.get("password"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  const { locale, id, title, content, password } = parsed.data;

  const post = await prisma.post.findUnique({
    where: { id },
    select: { passwordHash: true },
  });

  if (!post) throw new Error("Not found");

  const ok = await verifyPassword(password, post.passwordHash);
  if (!ok) throw new Error("Invalid password");

  await prisma.post.update({
    where: { id },
    data: { title, content },
  });

  revalidatePath(`/${locale}/posts`);
  revalidatePath(`/${locale}/posts/${id}`);
  redirect(`/${locale}/posts/${id}`);
}

export async function deletePostAction(formData: FormData) {
  const parsed = deleteSchema.safeParse({
    locale: formData.get("locale"),
    id: formData.get("id"),
    password: formData.get("password"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  const { locale, id, password } = parsed.data;

  const post = await prisma.post.findUnique({
    where: { id },
    select: { passwordHash: true },
  });

  if (!post) throw new Error("Not found");

  const ok = await verifyPassword(password, post.passwordHash);
  if (!ok) throw new Error("Invalid password");

  await prisma.post.delete({ where: { id } });

  revalidatePath(`/${locale}/posts`);
  redirect(`/${locale}/posts`);
}
