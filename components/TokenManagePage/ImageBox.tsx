import {getFetchableUrl} from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import React, {Fragment} from "react";
import {useMomentManageProvider} from "@/providers/MomentManageProvider";
import {useTokenProvider} from "@/providers/TokenProvider";
import UploadSpinner from "@/components/TokenManagePage/UploadSpinner";
import ResetButton from "@/components/MetadataCreation/ResetButton";

interface ImageBoxProps {
    handleImageClick: () => void;
}

const ImageBox = ({ handleImageClick }: ImageBoxProps) => {
    const {isOwner} = useTokenProvider();
    const {
        fileUploading,
        imageUri,
        pctComplete,
        previewSrc,
    } = useMomentManageProvider();

    if (fileUploading)  return <UploadSpinner pctComplete={pctComplete}/>

    if (!imageUri) return <Fragment />;

    return (
        <div className="w-full cursor-pointer">
            {isOwner && <ResetButton onClick={handleImageClick} disabled={fileUploading} />}
            <Image
                src={getFetchableUrl(imageUri) || previewSrc || ""}
                alt="Image Preview"
                onClick={handleImageClick}
                blurDataURL={previewSrc}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
            />
        </div>
    );
};

export default ImageBox;
