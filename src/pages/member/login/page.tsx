import { useState } from "react";
import SystemInput from "@/common/ui/SystemInput";
import { useLogin } from "@/hooks/useLogin";

const LoginPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const loginMutation = useLogin();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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
        <div className="rounded-xl bg-white p-8 shadow-sm border border-slate-200">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-slate-900">
                    로그인
                </h1>
                <p className="text-sm text-slate-500">
                    Airplane Maintenance System
                </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
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
                    className="h-10 w-full rounded-lg bg-slate-900 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
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
        </div>
    );
};

export default LoginPage;