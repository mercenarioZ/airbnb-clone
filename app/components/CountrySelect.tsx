"use client";

import Select from "react-select";
import useCountries from "../hooks/useCountries";

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  region: string;
  latlng: number[];
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAllCountries } = useCountries();

  return (
    <div>
      <Select
        isClearable
        options={getAllCountries()}
        placeholder="Select your country..."
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex gap-1 items-center">
            <div>{option.label},</div>

            <div className="text-neutral-500">{option.region}</div>
          </div>
        )}
        classNames={{
          control: () => "p-2",
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "black",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
