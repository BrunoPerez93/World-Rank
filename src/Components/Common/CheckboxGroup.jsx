import { useState } from "react";
import Checkbox from "./Checkbox";

const CheckboxGroup = ({ labels, onChange }) => {
  const [checkboxStates, setCheckboxStates] = useState(
    labels.reduce((acc, label) => {
      acc[label] = false;
      return acc;
    }, {})
  );

  const handleCheckboxChange = (label) => {
    setCheckboxStates({
      ...checkboxStates,
      [label]: !checkboxStates[label]
    });
    onChange(label);
  };

  return (
    <div>
      {labels.map((label) => (
        <Checkbox
          key={label}
          label={label}
          checked={checkboxStates[label]}
          onChange={() => handleCheckboxChange(label)}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;