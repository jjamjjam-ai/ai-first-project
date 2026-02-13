import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home({
  params,
}: {
  params: { locale: string };
}) {
  const t = useTranslations();
  const locale = params.locale;

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="p-4 p-md-5 mb-4 rounded-3 bg-body-tertiary border">
          <h1 className="display-6 fw-semibold mb-2">{t("home.title")}</h1>
          <p className="lead mb-0">{t("home.subtitle")}</p>
        </div>

        <div className="d-flex gap-2">
          <Link className="btn btn-primary" href={`/${locale}/posts`}>
            Posts
          </Link>
          <Link className="btn btn-outline-secondary" href={`/${locale}/posts/new`}>
            New
          </Link>
        </div>

        <div className="alert alert-info mt-3">{t("home.next")}</div>
      </div>
    </div>
  );
}
