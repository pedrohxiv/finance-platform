"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Props = {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { value: string; label: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export const Select = ({
  onChange,
  onCreate,
  options = [],
  value,
  disabled,
  placeholder,
}: Props) => {
  const onSelect = (option: SingleValue<{ value: string; label: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreatableSelect
      placeholder={placeholder}
      styles={{
        control: (base, { isFocused, isDisabled }) => ({
          ...base,
          height: 40,
          borderRadius: 6,
          borderColor: "#e2e8f0",
          fontSize: 14,
          outline: isFocused ? "2px solid #020817" : "none",
          boxShadow: "none",
          outlineOffset: 2,
          backgroundColor: "#FFF",
          opacity: isDisabled ? 0.5 : 1,
          ":hover": { borderColor: "#e2e8f0" },
        }),
        indicatorsContainer: (base) => ({
          ...base,
          cursor: "pointer",
        }),
        option: (base) => ({
          ...base,
          ":hover": { cursor: "pointer" },
        }),
        valueContainer: (base) => ({
          ...base,
          cursor: "text",
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
};
