import { useState } from "react";

const useCreateAdvancedValues = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [isOpenAdvanced, setIsOpenAdvanced] = useState<boolean>(false);

  const onChangeStartDate = (value: Date) => setStartDate(value);
  return {
    startDate,
    onChangeStartDate,
    isOpenAdvanced,
    setIsOpenAdvanced,
  };
};

export default useCreateAdvancedValues;
