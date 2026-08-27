import * as THREE from "three";
import type { RepairDetailResponse } from "@/common/type/repair";
import { convertZToStation, convertXYToStringer, convertStationToZ, convertStringerToXY } from '@/models/b737/mapper';

// 특정 material 이름을 가진 mesh들만 모으기
const getMeshesByMaterialNames = (
    scene: THREE.Object3D,
    materialNames: string[]
): THREE.Mesh[] => {
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child: any) => {
        if (!child.isMesh) return;
        const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];
        const matched = materials.some((m: THREE.Material) =>
            materialNames.includes(m.name)
        );
        if (matched) meshes.push(child);
    });
    return meshes;
};

// meshes의 bounding box 중심을 기준축(대략 x, y 중심)으로 사용
const getAxisCenter = (meshes: THREE.Mesh[]): THREE.Vector2 => {
    const box = new THREE.Box3();
    meshes.forEach((mesh) => box.expandByObject(mesh));
    const center = box.getCenter(new THREE.Vector3());
    return new THREE.Vector2(center.x, center.y);
};

// 계산된 point를 실제 mesh 표면으로 스냅
const snapPointToSurface = (
    point: [number, number, number],
    meshes: THREE.Mesh[],
    axisCenter: THREE.Vector2
): [number, number, number] => {
    const [px, py, pz] = point;

    const dir2D = new THREE.Vector2(px - axisCenter.x, py - axisCenter.y);

    // point가 중심축과 거의 같은 위치면(방향 계산 불가) 원래 좌표 그대로 반환
    if (dir2D.lengthSq() < 1e-6) return point;

    dir2D.normalize();

    const FAR_DISTANCE = 20; // 모델 크기보다 충분히 큰 값으로 조정
    const origin = new THREE.Vector3(
        axisCenter.x + dir2D.x * FAR_DISTANCE,
        axisCenter.y + dir2D.y * FAR_DISTANCE,
        pz
    );
    const direction = new THREE.Vector3(-dir2D.x, -dir2D.y, 0).normalize();

    const raycaster = new THREE.Raycaster();
    raycaster.set(origin, direction);

    const intersects = raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
        const hit = intersects[0].point;
        return [
            Number(hit.x.toFixed(2)),
            Number(hit.y.toFixed(2)),
            Number(hit.z.toFixed(2)),
        ];
    }

    // 못 찾으면 원래 계산값 fallback
    return point;
};

// 정비이력 선택 시 해당 위치 표시 (convert 비행기좌표 to 3D좌표)
export const getAirplaneLocation = (scene: THREE.Object3D, repairDetail: RepairDetailResponse) => {

    // chapter -> mesh
    let meshNames: string[] = [];
    repairDetail?.locationItems.forEach((location) => {
        switch (location.chapterName) {
            case "door":
                meshNames = ["Material.027"];
                break;

            case "fuselage":
                meshNames = ["Material.005"];
                break;

            case "wing":
                meshNames = ["Material.030"];
                break;

            case "stabilizer":
                meshNames = ["Cylinder.013__0"];
                break;

            case "naccel":
                meshNames = [
                    "Material.010",
                    "Material.011",
                    "Material.012",
                    "Material.014",
                    "Material.023",
                ];
                break;
        }
    });

    // location -> xyz
    const points: [number, number, number][] = [];
    const locations = repairDetail?.locationItems ?? [];
    const fuselageLocations = locations.filter(
        (location) => location.chapterName === "fuselage"
    );

    const fuselageMeshes = getMeshesByMaterialNames(scene, ["Material.005"]);
    const axisCenter = getAxisCenter(fuselageMeshes);

    if (fuselageLocations.length > 0) {
        const stationStart = fuselageLocations.find(
            (location) =>
                location.locationCode === "STA" &&
                location.locationName === "station_start"
        );
        const stationEnd = fuselageLocations.find(
            (location) =>
                location.locationCode === "STA" &&
                location.locationName === "station_end"
        );
        const stringerStart = fuselageLocations.find(
            (location) =>
                location.locationCode === "STR" &&
                location.locationName === "stringer_start"
        );
        const stringerEnd = fuselageLocations.find(
            (location) =>
                location.locationCode === "STR" &&
                location.locationName === "stringer_end"
        );

        if (stationStart && stringerStart) {
            const z = convertStationToZ(Number(stationStart.value));
            const xy = convertStringerToXY(stringerStart.value);

            if (z !== null && xy) {
                const rawPoint: [number, number, number] = [xy.x, xy.y, z];
                const snapped = fuselageMeshes.length
                    ? snapPointToSurface(rawPoint, fuselageMeshes, axisCenter)
                    : rawPoint;
                points.push(snapped);
            }
        }

        if (stationEnd && stringerEnd) {
            const z = convertStationToZ(Number(stationEnd.value));
            const xy = convertStringerToXY(stringerEnd.value);

            if (z !== null && xy) {
                const rawPoint: [number, number, number] = [xy.x, xy.y, z];
                const snapped = fuselageMeshes.length
                    ? snapPointToSurface(rawPoint, fuselageMeshes, axisCenter)
                    : rawPoint;
                points.push(snapped);
            }
        }
    }

    return {
        mesh: meshNames,
        points: points
    };
}

// 비행기 모델 클릭 시 해당 위치 입력 (convert 3D좌표 to 비행기좌표)
export const setAirplaneLocation = (
    event: any,
    chapter: string | null,
    setChapter: (chapter: string) => void,
    setLocation: (value: any) => void
) => {

    const mesh = event.object;
    if (!mesh.isMesh) return;
    switch (mesh.material.name) {
        case "Material.027":
            setChapter("door");
            break;

        case "Material.005":
            setChapter("fuselage");
            break;

        case "Material.030":
            setChapter("wing");
            break;

        case "Cylinder.013__0":
            setChapter("stabilizer");
            break;

        case "Material.010":
            setChapter("naccel");
            break;

        case "Material.011":
            setChapter("naccel");
            break;

        case "Material.012":
            setChapter("naccel");
            break;

        case "Material.013":
            setChapter("naccel");
            break;

        case "Material.014":
            setChapter("naccel");
            break;

        case "Material.015":
            setChapter("naccel");
            break;
    }

    const point: [
        number,
        number,
        number
    ] = [
        Number(event.point.x.toFixed(2)),
        Number(event.point.y.toFixed(2)),
        Number(event.point.z.toFixed(2)),
    ];

    if (chapter === 'fuselage') {
        const station = convertZToStation(point[2]);
        const stringer = convertXYToStringer(point[0], point[1]);
        setLocation({station: station, stringer: stringer});
    } else {
        // 다른 챕터 처리 방법
    }
}