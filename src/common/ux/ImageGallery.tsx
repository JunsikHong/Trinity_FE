import { useState } from "react";
import ImageViewer from "@/common/ux/ImageViewer";
import type { RepairFileResponse } from "@/common/type/repair";

const ImageGallery = ({ images = [] }: { images?: RepairFileResponse[] }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images.length) return null;

    const handleOpen = (index: number) => {
        setSelectedIndex(index);
        setOpen(true);
        document.body.style.overflow = "hidden";
    };

    const handleClose = () => {
        setOpen(false);
        document.body.style.overflow = "";
    };

    return (
        <>
            <div className="m-2 space-y-4 rounded-md border border-border p-3">
                <div>
                    <h3 className="mb-3 text-xs font-semibold text-secondary">
                        FILE ({images.length})
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleOpen(index)}
                                className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card"
                            >
                                <img
                                    key={image.id}
                                    src={API_URL + 'repair-file/' + image.id}
                                    alt={image.originalName}
                                    className="object-cover w-[148px]"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {open && (
                <ImageViewer
                    images={images}
                    currentIndex={selectedIndex}
                    onClose={handleClose}
                />
            )}
        </>
    );
};

export default ImageGallery;