import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true },
    take: 50,
  });

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h3 mb-0">Posts</h1>
          <Link className="btn btn-primary" href={`/${locale}/posts/new`}>
            New
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="alert alert-secondary">No posts yet.</div>
        ) : (
          <div className="list-group">
            {posts.map((p: { id: string; title: string; createdAt: Date }) => (
              <Link
                key={p.id}
                href={`/${locale}/posts/${p.id}`}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                <span className="fw-semibold">{p.title}</span>
                <small className="text-body-secondary">
                  {p.createdAt.toISOString().slice(0, 10)}
                </small>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
