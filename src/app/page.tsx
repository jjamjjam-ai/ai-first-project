export default function Home() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="p-4 p-md-5 mb-4 rounded-3 bg-body-tertiary border">
          <h1 className="display-6 fw-semibold mb-2">ai-first-project</h1>
          <p className="lead mb-0">
            로그인 없이 글을 쓰되, 작성 시 비밀번호를 설정하고 수정/삭제 때 비밀번호로
            인증하는 게시판.
          </p>
        </div>

        <div className="alert alert-info">
          다음 단계: i18n(ko/en) + 게시글 CRUD(비번 해시) + Vercel 배포
        </div>
      </div>
    </div>
  );
}
