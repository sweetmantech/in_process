import { useState } from "react";

const useZoraMintComment = () => {
    const [isOpenCrossmint, setIsOpenCrossmint] = useState(false);

    const mintComment = async () => {

    }

    return {
        mintComment,
        isOpenCrossmint,
        setIsOpenCrossmint
    }
}

export default useZoraMintComment