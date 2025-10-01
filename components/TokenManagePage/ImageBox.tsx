import Spinner from "../ui/spinner";
import {getFetchableUrl} from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import React, {Fragment} from "react";
import {useZoraManageProvider} from "@/providers/ZoraManageProvider";
import EditButton from "@/components/TokenManagePage/EditButton";
import {useTokenProvider} from "@/providers/TokenProvider";

interface ImageBoxProps {
    handleImageClick: () => void;
}
const Container = ({
                       children,
                       className = "",
                   }: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`size-full flex justify-center ${className}`}>{children}</div>
);

const ImageBox = ({ handleImageClick }: ImageBoxProps) => {
    const {isOwner} = useTokenProvider();
    const {
        fileUploading,
        imageUri,
        pctComplete,
        previewSrc,
    } = useZoraManageProvider();

    if (fileUploading) {
        return (
            <Container className="flex flex-col items-center gap-2">
                <Spinner />
                <p className="font-archivo text-xl">{pctComplete} %</p>
            </Container>
        );
    }
    if (imageUri) {
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
    }

    return <Fragment />;
};

export default ImageBox;
