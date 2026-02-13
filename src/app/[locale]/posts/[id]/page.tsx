import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
  });

  if (!post) return notFound();

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h1 className="h3 mb-1">{post.title}</h1>
            <div className="text-body-secondary small">
              Created: {post.createdAt.toISOString().slice(0, 10)} · Updated:{" "}
              {post.updatedAt.toISOString().slice(0, 10)}
            </div>
          </div>
          <Link className="btn btn-outline-secondary" href={`/${locale}/posts`}>
            Back
          </Link>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <pre className="mb-0" style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
              {post.content}
            </pre>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Link className="btn btn-outline-primary" href={`/${locale}/posts/${id}/edit`}>
            Edit
          </Link>
          <Link className="btn btn-outline-danger" href={`/${locale}/posts/${id}/delete`}>
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
}
