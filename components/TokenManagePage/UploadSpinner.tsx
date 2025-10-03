import Spinner from "../ui/spinner";

interface UploadSpinnerProps {
    pctComplete: number;
}

const UploadSpinner = ({pctComplete}: UploadSpinnerProps) => {
    return (
        <div className="size-full flex justify-center flex-col items-center gap-2">
            <Spinner />
            <p className="font-archivo text-xl">{pctComplete} %</p>
        </div>
    );
};

export default UploadSpinner;
