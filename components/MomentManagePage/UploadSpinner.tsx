import Spinner from "../ui/spinner";

interface UploadSpinnerProps {
  pctComplete: number;
}

const UploadSpinner = ({ pctComplete }: UploadSpinnerProps) => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2">
      <Spinner />
      <p className="font-archivo text-xl">{Math.round(pctComplete)} %</p>
    </div>
  );
};

export default UploadSpinner;
