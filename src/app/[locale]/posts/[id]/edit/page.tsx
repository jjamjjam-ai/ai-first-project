import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePostAction } from "../../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    select: { id: true, title: true, content: true },
  });

  if (!post) return notFound();

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h3 mb-0">Edit Post</h1>
          <Link className="btn btn-outline-secondary" href={`/${locale}/posts/${id}`}>
            Back
          </Link>
        </div>

        <form action={updatePostAction} className="vstack gap-3">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="id" value={id} />

          <div>
            <label className="form-label">Title</label>
            <input
              name="title"
              className="form-control"
              required
              maxLength={200}
              defaultValue={post.title}
            />
          </div>

          <div>
            <label className="form-label">Content</label>
            <textarea
              name="content"
              className="form-control"
              rows={10}
              required
              maxLength={20000}
              defaultValue={post.content}
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
              minLength={4}
              maxLength={200}
            />
            <div className="form-text">
              Enter the password you set when creating this post.
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <Link className="btn btn-outline-secondary" href={`/${locale}/posts/${id}`}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
