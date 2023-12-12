"use client"

// Option interface
interface Option {
    id: string | undefined;
    firstName: string | null;
  }
  
  // SelectProps interface
  interface SelectProps<T extends Option> {
    options: T[] | null | undefined;
    selectedOption: string | null;
    onSelectChange: (selectedOption: string | null) => void;
  }
  
  // Select component
  function GenericSelect<T>({ options, selectedOption, onSelectChange }: SelectProps<T>) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      //const chosenOption = options?.find((option) => option.id === selectedValue) || null;
      onSelectChange(selectedValue);
    };
  
    return (
      <select className="select select-primary   m-2" value={selectedOption || ''} onChange={handleChange}>
        <option key={"zero"} value="">==Select==</option>
        {options && options.map((option) => (
          <option key={option["id"]} value={option?.id || ""}>
            {option.firstName}
          </option>
        ))}
      </select>
    );
  }
  
  export default GenericSelect
  