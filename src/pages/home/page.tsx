import ModelCanvas from '@/pages/home/components/ModelCanvas';
import ModelStructure from '@/pages/home/components/ModelStructure';
import LogSection from '@/pages/home/list/page';
import WriteSection from '@/pages/home/write/page';
import useStateStore from '@/store/useStateStore';

const HomePage = () => {
    const { isOpenDetail } = useStateStore();

    return (
        <>
            <LogSection />
            <section className="flex flex-1 flex-col">
                <div className="flex-[3] border-b bg-slate-900 relative">
                    <ModelCanvas />
                </div>
                <div className="flex-[2] bg-white">
                    <ModelStructure />
                </div>
            </section>
            <WriteSection />
        </>
    );
};

export default HomePage;