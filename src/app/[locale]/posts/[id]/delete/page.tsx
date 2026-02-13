import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deletePostAction } from "../../actions";

export default async function DeletePostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    select: { id: true, title: true },
  });

  if (!post) return notFound();

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h3 mb-0">Delete Post</h1>
          <Link className="btn btn-outline-secondary" href={`/${locale}/posts/${id}`}>
            Back
          </Link>
        </div>

        <div className="alert alert-warning">
          Deleting <span className="fw-semibold">{post.title}</span> is irreversible.
        </div>

        <form action={deletePostAction} className="vstack gap-3">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="id" value={id} />

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
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-danger" type="submit">
              Delete
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
