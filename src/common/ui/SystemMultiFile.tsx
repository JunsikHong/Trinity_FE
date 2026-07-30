import { useRef } from "react";
import { X, CirclePlus } from "lucide-react";

interface UploadFile {
    id?: number;
    url: string;
    name: string;
    file?: File;
    isNew: boolean;
}

interface SystemMultiFileProps {
    label?: string;
    value: UploadFile[];
    error?: string;
    required?: boolean;
    onAddFiles: (files: File[]) => void;
    onRemoveFile: (params: {
        index: number;
        id?: number;
        isNew: boolean;
    }) => void;
}

const SystemMultiFile = ({
    label = "첨부 사진",
    value = [],
    error,
    required = false,
    onAddFiles,
    onRemoveFile,
}: SystemMultiFileProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const MAX_FILES = 10;
    const ALLOWED_FILE_TYPES = [
        "image/jpeg",
        "image/png",
        "image/gif",
    ];

    const handleFileSelect = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = Array.from(
            e.target.files || []
        );

        const remaining = MAX_FILES - value.length;
        const filesToAdd = selectedFiles.slice(0, remaining);

        if (selectedFiles.length > remaining) {
            alert(`최대 ${MAX_FILES}개까지 첨부할 수 있습니다.`);
        }

        if (filesToAdd.length > 0) {
            onAddFiles(filesToAdd);
        }

        e.target.value = "";
    };

    return (
        <div className="m-2 space-y-4 rounded-md border border-border p-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm text-primary">
                    {label}
                    {required && (
                        <span className="ml-1 text-danger">
                            *
                        </span>
                    )}
                </h3>

                <span className="text-xs text-muted">
                    ({value.length}/{MAX_FILES})
                </span>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ALLOWED_FILE_TYPES.join(",")}
                className="hidden"
                onChange={handleFileSelect}
            />

            <div className="flex flex-wrap gap-2">
                {value.map((file, index) => (
                    <div
                        key={`${file.name}-${index}`}
                        className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card"
                    >
                        <img
                            src={file.url}
                            alt={file.name}
                            className="object-cover w-[148px]"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                onRemoveFile({
                                    index,
                                    id: file.id,
                                    isNew: file.isNew,
                                })
                            }
                            className="
                                absolute right-1 top-1 w-6 h-6
                                flex items-center justify-center
                                rounded-full
                                bg-danger text-white
                                transition
                                hover:bg-danger-hover
                            "
                        >
                            <X size={13} />
                        </button>

                        {file.isNew && (
                            <span
                                className="
                                    absolute left-1 top-1
                                    rounded
                                    bg-primaryBtn
                                    px-1.5 py-0.5
                                    text-[10px]
                                    text-white
                                "
                            >
                                NEW
                            </span>
                        )}
                    </div>
                ))}

                {value.length < MAX_FILES && (
                    <button
                        type="button"
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                        className="
                            w-[150px]
                            aspect-square
                            rounded-lg
                            border border-border
                            bg-input
                            text-input-text
                            transition
                            hover:bg-input-hover
                        "
                    >
                        <div className="flex h-full flex-col items-center justify-center">
                            <CirclePlus
                                size={24}
                                className="text-muted"
                            />

                            <span
                                className="
                                    mt-1
                                    text-[11px]
                                    text-muted
                                "
                            >
                                사진 추가
                            </span>
                        </div>
                    </button>
                )}

                
            </div>

            {error && (
                <p className="text-xs text-danger">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SystemMultiFile;