import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="p-4 p-md-5 mb-4 rounded-3 bg-body-tertiary border">
          <h1 className="display-6 fw-semibold mb-2">{t('home.title')}</h1>
          <p className="lead mb-0">{t('home.subtitle')}</p>
        </div>

        <div className="alert alert-info">{t('home.next')}</div>
      </div>
    </div>
  );
}
