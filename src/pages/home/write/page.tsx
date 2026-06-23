import WriteSection from "@/pages/home/write/components/WriteSection";
import ButtonSection from "@/pages/home/write/components/ButtonSection";

const WritePage = () => {
    
    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <WriteSection/>
                <ButtonSection />
            </div>
        </>
    );
};

export default WritePage;