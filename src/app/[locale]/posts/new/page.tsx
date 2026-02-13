import Link from "next/link";
import { createPostAction } from "../actions";

export default async function NewPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h3 mb-0">New Post</h1>
          <Link className="btn btn-outline-secondary" href={`/${locale}/posts`}>
            Back
          </Link>
        </div>

        <form action={createPostAction} className="vstack gap-3">
          <input type="hidden" name="locale" value={locale} />

          <div>
            <label className="form-label">Title</label>
            <input name="title" className="form-control" required maxLength={200} />
          </div>

          <div>
            <label className="form-label">Content</label>
            <textarea
              name="content"
              className="form-control"
              rows={10}
              required
              maxLength={20000}
            />
          </div>

          <div>
            <label className="form-label">Password (for edit/delete)</label>
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
            <button className="btn btn-primary" type="submit">
              Create
            </button>
            <Link className="btn btn-outline-secondary" href={`/${locale}/posts`}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
