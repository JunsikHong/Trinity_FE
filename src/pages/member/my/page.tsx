import {
    UserRound,
    ShieldCheck,
    FileText,
    ChevronRight,
} from "lucide-react";
import { useMember } from "@/hooks/member/useMember";

const ROLE_NAME = {
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",
    VIEWER: "VIEWER",
} as const;


const MyPage = () => {
    const { data: member } = useMember();

    // TODO: 실제 API 연결
    const myPostList = [];


    if (!member) return null;


    return (
        <div className="p-6">

            {/* 내 정보 */}
            <section>
                <div className="flex items-center gap-2 mb-5">
                    <UserRound
                        size={20}
                        className="text-secondary"
                    />

                    <h2 className="text-lg font-bold text-primary">
                        내 정보
                    </h2>
                </div>


                <div className="
                    rounded-xl
                    border border-border
                    bg-card
                    p-5
                ">
                    <div className="flex items-center gap-3">

                        <div className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-icon
                            text-icon-text
                            text-xl
                            font-bold
                        ">
                            {member.name.charAt(0)}
                        </div>


                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="
                                    font-bold
                                    text-primary
                                ">
                                    {member.name}님
                                </p>

                                <span className="
                                    rounded-full
                                    bg-icon
                                    px-2
                                    py-1
                                    text-xs
                                    font-semibold
                                    text-icon-text
                                ">
                                    {member.departmentName}
                                </span>
                            </div>


                            <p className="
                                mt-1
                                text-sm
                                text-secondary
                            ">
                                {member.email}
                            </p>
                        </div>

                    </div>


                    <div className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        bg-icon
                        px-3
                        py-2
                    ">
                        <div className="flex items-center gap-2">
                            <ShieldCheck
                                size={16}
                                className="text-icon-text"
                            />

                            <span className="
                                text-sm
                                text-icon-text
                            ">
                                현재 권한
                            </span>
                        </div>

                        <span className="
                            text-sm
                            font-semibold
                            text-icon-text
                        ">
                            {
                                ROLE_NAME[
                                    member.role as keyof typeof ROLE_NAME
                                ]
                            }
                        </span>
                    </div>

                </div>
            </section>



            {/* 작성한 글 */}
            <section className="mt-8">

                <div className="flex items-center gap-2 mb-5">
                    <FileText
                        size={20}
                        className="text-secondary"
                    />

                    <h2 className="text-lg font-bold text-primary">
                        내가 작성한 글
                    </h2>

                    <span className="text-sm text-muted">
                        최근 5개
                    </span>
                </div>


                <div className="
                    overflow-hidden
                    rounded-xl
                    border border-border
                    bg-card
                ">

                    {myPostList.length > 0 ? (
                        myPostList.map((item: any) => (
                            <button
                                key={item.id}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    border-b
                                    border-border
                                    px-4
                                    py-3
                                    text-left
                                    transition
                                    last:border-none
                                    hover:bg-icon
                                "
                            >
                                <div>
                                    <p className="
                                        text-sm
                                        font-semibold
                                        text-primary
                                    ">
                                        #{item.id}
                                    </p>

                                    <p className="
                                        mt-1
                                        max-w-lg
                                        truncate
                                        text-xs
                                        text-secondary
                                    ">
                                        {item.description || "-"}
                                    </p>
                                </div>

                                <ChevronRight
                                    size={16}
                                    className="text-muted"
                                />
                            </button>
                        ))
                    ) : (
                        <div className="
                            py-10
                            text-center
                            text-sm
                            text-muted
                        ">
                            작성한 글이 없습니다.
                        </div>
                    )}

                </div>

            </section>

        </div>
    );
};

export default MyPage;