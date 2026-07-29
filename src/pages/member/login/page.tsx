import { useState } from "react";
import SystemInput from "@/common/ui/SystemInput";
import { useLogin } from "@/hooks/member/useLogin";
import logo from "@/assets/logo.png";

const LoginPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const loginMutation = useLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email.trim()) {
            alert("아이디를 입력해주세요.");
            return;
        }

        if (!form.password.trim()) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        loginMutation.mutate({
            email: form.email,
            password: form.password,
        });
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-page p-6">
            <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl">
                <div className="mb-8 flex flex-col items-center text-center">
                    <img
                        src={logo}
                        alt="AirONE"
                        className="mb-4 w-16"
                    />
                    <h1 className="text-3xl font-bold text-primary">
                        AirONE
                    </h1>
                    <p className="-mt-1 text-xs font-semibold text-muted">
                        REPAIR MANAGE
                    </p>
                </div>
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-primary">
                        로그인
                    </h2>
                    <p className="mt-2 text-sm text-secondary">
                        계정 정보를 입력해주세요.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <SystemInput
                        label="아이디"
                        name="email"
                        value={form.email}
                        placeholder="아이디를 입력하세요"
                        onChange={handleChange}
                    />
                    <SystemInput
                        type="password"
                        label="비밀번호"
                        name="password"
                        value={form.password}
                        placeholder="비밀번호를 입력하세요"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="mt-3 h-11 w-full rounded-lg bg-primaryBtn text-sm font-semibold text-white transition hover:bg-primaryBtn-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loginMutation.isPending
                            ? "로그인 중..."
                            : "로그인"}
                    </button>
                    {loginMutation.isError && (
                        <p className="text-center text-sm text-red-500">
                            아이디 또는 비밀번호가 올바르지 않습니다.
                        </p>
                    )}
                </form>
                <div className="mt-8 border-t border-border pt-4 text-center">
                    <p className="text-xs text-muted">
                        Aircraft Maintenance System
                    </p>
                    <p className="mt-1 text-xs text-muted">
                        Copyright © 2026 AirOne All Rights Reserved
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;