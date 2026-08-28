import SearchSelect from '@/common/ui/SearchSelect';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';

import { useAirplaneType } from '@/hooks/airplane/useAriplaneType';
import { useAirplane } from '@/hooks/airplane/useAirplane';

const statusList = [
    {
        value: '12%',
        text: '지난달 대비',
        type: 'up',
    },
    {
        value: '8%',
        text: '전년 대비',
        type: 'up',
    },
    {
        value: '3%',
        text: '이전 기간 대비',
        type: 'down',
    },
];


const periodOptions = [
    { label: '전체 기간', value: 'all' },
    { label: '최근 1개월', value: '1month' },
    { label: '최근 3개월', value: '3month' },
    { label: '최근 6개월', value: '6month' },
    { label: '최근 1년', value: '1year' },
];

const StatCard = ({
    type,
    title,
    subtitle,
    value,
    filter,
    selectedStat,
    setSelectedStat
}: {
    type: string;
    title: string;
    subtitle: string;
    value: string;
    filter?: React.ReactNode;
    selectedStat?: string;
    setSelectedStat?: any;
}) => {

    const [statusIndex, setStatusIndex] = useState(0);

    const changeStatus = (direction: 'up' | 'down') => {
        setStatusIndex((prev) => {
            if (direction === 'up') {
                return prev === 0
                    ? statusList.length - 1
                    : prev - 1;
            }

            return prev === statusList.length - 1
                ? 0
                : prev + 1;
        });
    };

    const status = statusList[statusIndex];

    const [slideDirection, setSlideDirection] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideDirection(1);

            setStatusIndex((prev) =>
                prev === statusList.length - 1
                    ? 0
                    : prev + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div 
            onClick={() => {
                setSelectedStat(type);
            }}
            className={`cursor-pointer rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary ${selectedStat === type ? 'border-primary' : ''}`}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-secondary">
                        {title}
                    </p>
                    <p className="mt-1 text-xs text-secondary/60">
                        {subtitle}
                    </p>
                </div>
                {filter && (
                    <div className="shrink-0">
                        {filter}
                    </div>
                )}
            </div>
            <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-bold tracking-tight text-primary">
                    {value}
                </span>
                <span className="mb-1 text-sm text-secondary">
                    건
                </span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 gap-3">
                <div className="flex items-center justify-between gap-1 border border-border px-2.5 h-9 rounded-md w-full">
                    <div className="relative overflow-hidden">
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                        >
                            <motion.div
                                key={statusIndex}
                                initial={{
                                    y: 20,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                }}
                                exit={{
                                    y: -20,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.2,
                                    ease: 'easeOut',
                                }}
                                className="flex items-center"
                            >
                                <span
                                    className={`text-xs font-medium ${status.type === 'up'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                        }`}
                                >
                                    {status.type === 'up' ? '▲' : '▼'} {status.value}
                                </span>

                                <span className="ml-1 text-xs text-secondary">
                                    {status.text}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="flex flex-col">
                        <button
                            type="button"
                            onClick={() => changeStatus('up')}
                            className="flex h-2.5 items-center justify-center text-secondary/50 transition-colors hover:text-primary"
                        >
                            <ChevronUp size={12} />
                        </button>
                        <button
                            type="button"
                            onClick={() => changeStatus('down')}
                            className="flex h-2.5 items-center justify-center text-secondary/50 transition-colors hover:text-primary"
                        >
                            <ChevronDown size={12} />
                        </button>
                    </div>
                </div>
                <div className="">
                    <SearchSelect
                        options={periodOptions}
                    />
                </div>
            </div>
        </div>
    );
};

interface StatSectionProps {
    selectedStat: string;
    setSelectedStat: any;
}

const StatSection = ({ selectedStat, setSelectedStat }: StatSectionProps) => {

    const { data: airplaneTypeList } = useAirplaneType();
    const { data: airplaneList } = useAirplane();

    return (
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            <StatCard
                type="all"
                title="전체 수리이력"
                subtitle="전체 등록된 수리이력"
                value="1,246"
                selectedStat={selectedStat}
                setSelectedStat={setSelectedStat}
            />
            <StatCard
                type="airplaneType"
                title="기종별 수리이력"
                subtitle="선택한 기종의 수리이력"
                value="486"
                filter={
                    <SearchSelect
                        options={
                            airplaneTypeList?.map((item) => ({
                                label: item.name,
                                value: item.id,
                            })) ?? []
                        }
                    />
                }
                selectedStat={selectedStat}
                setSelectedStat={setSelectedStat}
            />
            <StatCard
                type="airplane"
                title="비행기별 수리이력"
                subtitle="선택한 항공기의 수리이력"
                value="128"
                filter={
                    <SearchSelect
                        options={
                            airplaneList?.map((item) => ({
                                label: item.registrationNumber,
                                value: item.id,
                            })) ?? []
                        }
                    />
                }
                selectedStat={selectedStat}
                setSelectedStat={setSelectedStat}
            />
            <StatCard
                type="chapter"
                title="챕터별 수리이력"
                subtitle="선택한 챕터의 수리이력"
                value="342"
                filter={
                    <SearchSelect
                        options={[]}
                    />
                }
                selectedStat={selectedStat}
                setSelectedStat={setSelectedStat}
            />
            <StatCard
                type="location"
                title="부위별 수리이력"
                subtitle="선택한 부위의 수리이력"
                value="91"
                filter={
                    <SearchSelect
                        options={[]}
                    />
                }
                selectedStat={selectedStat}
                setSelectedStat={setSelectedStat}
            />
        </div>
    );
};

export default StatSection;