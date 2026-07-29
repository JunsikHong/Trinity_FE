import { ChevronRight } from "lucide-react";
import { useState } from 'react';
import Modal from '@/common/ux/Modal';
import AuthInfoPage from "@/pages/member/auth-info/page";
import MyPage from "@/pages/member/my/page";

interface Props {
    member: any;
    onLogout: () => void;
    onClose: () => void;
}

const DefaultMyMenu = ({ member, onLogout, onClose }: Props) => {
    const [openedMenu, setOpenedMenu] =
        useState<"auth-info" | "my" | null>(null);

    return (
        <div className="w-72 overflow-hidden rounded-lg border border-border bg-surface shadow-xl">

            <div className="border-b border-border px-4 py-3">
                <div className="flex gap-3 items-center">
                    <div className="rounded-full font-bold bg-icon w-12 h-12 flex items-center justify-center text-icon-text">
                        A
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="font-bold text-primary ">
                                {member?.name}님
                            </p>
                            <p className="rounded-2xl bg-icon py-1 flex items-center px-2 text-xs font-semibold text-primary">
                                {member?.departmentName}
                            </p>
                        </div>
                        <p className="mt-1 text-sm text-secondary">
                            {member?.email}
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => {
                        onClose();
                        setOpenedMenu('auth-info');
                    }}
                    className="bg-icon hover:bg-icon-hover text-icon-text rounded-2xl w-full text-xs px-2 py-1.5 mt-3 flex justify-between items-center cursor-pointer"
                >
                    <span className="flex items-center gap-1">
                        회원님의 권한은 {member?.role} 입니다
                    </span>
                    <ChevronRight size={12} />
                </div>
                <Modal
                    open={openedMenu == 'auth-info' ? true : false}
                    onClose={() => setOpenedMenu(null)}
                    width="max-w-4xl"
                >
                    <AuthInfoPage/>
                </Modal>
                <div className="flex flex-col mt-5 border-t border-border">
                    <button
                        onClick={() => {
                            onClose();
                            setOpenedMenu('my');
                        }}
                        className="flex gap-0.5 text-sm mt-4 items-center text-primary">
                        <span>내 정보 관리</span>
                        <ChevronRight size={12} />
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onLogout();
                        }}
                        className="flex gap-0.5 text-sm mt-2 items-center text-red-600">
                        <span>로그아웃</span>
                        <ChevronRight size={12} />
                    </button>
                </div>
                <Modal
                    open={openedMenu == 'my' ? true : false}
                    onClose={() => setOpenedMenu(null)}
                    width="max-w-4xl"
                >
                    <MyPage/>
                </Modal>
            </div>
        </div>
    );
};

export default DefaultMyMenu;