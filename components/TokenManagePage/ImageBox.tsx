import Spinner from "../ui/spinner";
import {getFetchableUrl} from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import React, {Fragment} from "react";
import {useZoraManageProvider} from "@/providers/ZoraManageProvider";
import EditButton from "@/components/TokenManagePage/EditButton";
import {useTokenProvider} from "@/providers/TokenProvider";
import UploadSpinner from "@/components/TokenManagePage/UploadSpinner";

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
    } = useZoraManageProvider();

    if (fileUploading) {
        return <UploadSpinner pctComplete={pctComplete}/>
    }

    if (!imageUri) return <Fragment />;

    return (
        <div className="w-full cursor-pointer">
            {isOwner && <EditButton onClick={handleImageClick}/>}
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
