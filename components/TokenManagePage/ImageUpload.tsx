import ImageBox from "@/components/TokenManagePage/ImageBox";
import {useRef} from "react";
import {useMomentManageProvider} from "@/providers/MomentManageProvider";

interface ImageUploadProps {
    imageUri: string | undefined | null;
    isOwner: boolean;
}

const ImageUpload = ({imageUri, isOwner}: ImageUploadProps) => {
    const {
        fileUpload,
    } = useMomentManageProvider();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        if (isOwner) {
            fileInputRef.current?.click()
        }
    }

    if (!imageUri)
        return null

    return (
        <div>
            <label className="font-archivo text-sm text-grey-moss-600 block mb-1">
                image
            </label>
            <div
                className="min-h-[400px] md:min-h-auto md:aspect-[571/692] relative bg-[url('/grid.svg')] bg-contain">
                <input
                    ref={fileInputRef}
                    id="media"
                    type="file"
                    className={`cursor-pointer z-2 size-full absolute opacity-0`}
                    onChange={fileUpload}
                />
                <ImageBox handleImageClick={handleImageClick}/>
            </div>
        </div>
    );
};

export default ImageUpload;
