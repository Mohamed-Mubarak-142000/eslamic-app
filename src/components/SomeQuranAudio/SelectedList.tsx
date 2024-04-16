import React, { useEffect } from "react";
import styled from "styled-components";
import { OneMoshaf, OneReciter } from "@app/apis/audio/apiSlice";

interface SelectOption {
  id: number;
  name: string;
}

interface SelectProps {
  options: (OneMoshaf | OneReciter | undefined)[];
  value: number | null;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
  background-color: ${(props) => props.theme.colors.block};
  color: ${(props) => props.theme.colors.secondary};
  border-color: ${(props) => props.theme.colors.border};
`;

const SelectedList: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  // Extract valid options
  const validOptions: SelectOption[] = options
    .filter(
      (option): option is OneMoshaf | OneReciter =>
        option !== undefined && "id" in option && option.name !== undefined
    )
    .map((option) => ({
      id: option.id,
      name: option.name!,
    }));

  // Trigger onChange for reciter select with default value
  useEffect(() => {
    if (value === null && validOptions.length > 0) {
      onChange({
        target: { value: validOptions[0].id.toString() },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, [value, onChange, validOptions]);

  return (
    <StyledSelect value={value || ""} onChange={onChange} disabled={disabled}>
      {validOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectedList;
