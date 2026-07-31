// ---- STATION (z -> station) ----
// z가 감소할수록 station이 증가하는 구간별 선형보간 테이블
const STATION_SEGMENTS = [
    { zStart: 11.27, zEnd: 10.2, sStart: 130, sEnd: 178 },
    { zStart: 10.2, zEnd: 8.4, sStart: 178, sEnd: 251.5 },
    { zStart: 8.4, zEnd: 7.5, sStart: 251.5, sEnd: 312 },
    { zStart: 7.5, zEnd: 6.6, sStart: 312, sEnd: 360 },
    { zStart: 6.6, zEnd: -20.26, sStart: 360, sEnd: 1217 },
];

export const convertZToStation = (z: number): number | null => {
    if (z === null || z === undefined || Number.isNaN(z)) return null;

    const first = STATION_SEGMENTS[0];
    const last = STATION_SEGMENTS[STATION_SEGMENTS.length - 1];

    // 범위를 벗어나면 경계값으로 clamp
    if (z >= first.zStart) return first.sStart;
    if (z <= last.zEnd) return last.sEnd;

    for (const seg of STATION_SEGMENTS) {
        if (z <= seg.zStart && z >= seg.zEnd) {
            const ratio = (seg.zStart - z) / (seg.zStart - seg.zEnd);
            const station = seg.sStart + ratio * (seg.sEnd - seg.sStart);
            return Math.round(station * 10) / 10; // 소수점 첫째자리
        }
    }

    return null;
};

// ---- STATION -> Z (역변환) ----
export const convertStationToZ = (station: number): number | null => {
    if (station === null || station === undefined || Number.isNaN(station)) return null;

    const first = STATION_SEGMENTS[0];
    const last = STATION_SEGMENTS[STATION_SEGMENTS.length - 1];

    if (station <= first.sStart) return first.zStart;
    if (station >= last.sEnd) return last.zEnd;

    for (const seg of STATION_SEGMENTS) {
        if (station >= seg.sStart && station <= seg.sEnd) {
            const ratio = (station - seg.sStart) / (seg.sEnd - seg.sStart);
            const z = seg.zStart - ratio * (seg.zStart - seg.zEnd);
            return Math.round(z * 100) / 100; // 소수점 둘째자리
        }
    }

    return null;
};

// ---- STRINGER (x, y -> stringer) ----
// y <= Y_CUTOFF(1.14) -> "0" (동체 최하단, L/R 구분 없음)
// y: Y_CUTOFF(1.14) ~ Y_MAX(4.53) 구간을 27(하단) ~ 1(상단)으로 역매핑
// x 부호로 L/R 결정 (x >= 0 -> R, x < 0 -> L)
const Y_CUTOFF = 1.14;   // 이 이하는 "0"
const Y_MAX = 4.53;      // 최상단
const STRINGER_MIN = 1;  // 최상단 값 (y = Y_MAX)
const STRINGER_MAX = 27; // 최하단(컷오프 직전) 값 (y = Y_CUTOFF)

export const convertXYToStringer = (x: number, y: number): string | null => {
    if (x === null || x === undefined || y === null || y === undefined) return null;
    if (Number.isNaN(x) || Number.isNaN(y)) return null;

    const clampedY = Math.min(Math.max(y, 0), Y_MAX);

    // 최하단부: 넘버 없이 "0"
    if (clampedY <= Y_CUTOFF) {
        return '0';
    }

    // y가 클수록(위로 갈수록) 숫자는 작아지고, y가 작을수록(아래로 갈수록) 숫자는 커짐
    const ratio = (clampedY - Y_CUTOFF) / (Y_MAX - Y_CUTOFF); // 0(하단) ~ 1(상단)
    const rawNumber = STRINGER_MAX - ratio * (STRINGER_MAX - STRINGER_MIN);
    const number = Math.round(rawNumber * 10) / 10; // 소수점 첫째자리까지

    const numberLabel = Number.isInteger(number) ? String(number) : number.toFixed(1);
    const side = x >= 0 ? 'R' : 'L';

    return `${numberLabel}${side}`;
};

// ---- STRINGER -> X, Y (역변환) ----
// stringer 형식: "12.3R" / "5L" / "0"
// x는 부호 정보만 복원 가능 (크기는 xMagnitude 파라미터로 지정, 기본 1.59)
// "0"인 경우 y는 0 ~ Y_CUTOFF 구간의 중간값으로 반환, side 정보 없으므로 x = 0
export const convertStringerToXY = (
    stringer: string,
    xMagnitude: number = 1.59
): { x: number; y: number } | null => {
    if (!stringer) return null;

    const trimmed = stringer.trim();

    // "0" 케이스: 최하단부, side 없음
    if (trimmed === '0') {
        return { x: 0, y: Y_CUTOFF / 2 };
    }

    const match = trimmed.match(/^(\d+(\.\d+)?)([RL])$/i);
    if (!match) return null;

    const number = parseFloat(match[1]);
    const side = match[3].toUpperCase();

    if (number < STRINGER_MIN || number > STRINGER_MAX) return null;

    // 순변환의 역산: rawNumber = STRINGER_MAX - ratio * (STRINGER_MAX - STRINGER_MIN)
    // -> ratio = (STRINGER_MAX - number) / (STRINGER_MAX - STRINGER_MIN)
    const ratio = (STRINGER_MAX - number) / (STRINGER_MAX - STRINGER_MIN);
    const y = Y_CUTOFF + ratio * (Y_MAX - Y_CUTOFF);
    const roundedY = Math.round(y * 100) / 100;

    const x = side === 'R' ? xMagnitude : -xMagnitude;

    return { x, y: roundedY };
};