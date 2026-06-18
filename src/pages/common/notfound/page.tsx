import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="text-7xl font-black text-slate-300">
                404
            </div>

            <div className="text-lg font-semibold text-slate-700">
                페이지를 찾을 수 없습니다.
            </div>

            <button
                onClick={() => navigate("/")}
                className="rounded-lg bg-blue-500 px-5 py-2 text-white"
            >
                홈으로 이동
            </button>
        </div>
    );
};

export default NotFoundPage;