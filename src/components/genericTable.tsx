import { useState } from "react";

export default function GenericTable<T extends object>(props: {
  data: T[];
  fn?: undefined | ((t: T, action: string) => void);
  actions?: string[];
}) {
  const headerList = Object.keys(props.data[0]) as Array<keyof T>;
  const actionList = ["Delete", "Update", ...props?.actions || []];
  const [selectedRow, setSelectedRow] = useState<T | undefined>(undefined);
  const [selectedAction, setSelectedAction] = useState("");

  return (
    <div>
      <div className="overflow-x-auto">
        <select
          value={selectedAction}
          onChange={(event) => {
            setSelectedAction(event.target.value);
            props?.fn && selectedRow
              ? props?.fn(selectedRow, event.target.value)
              : console.log(selectedRow, event.target.value);
          }}
          className="select select-primary max-w-xs select-xs m-4"
        >
          <option value={""} key={"zero"}>
            {"==select action=="}
          </option>
          {actionList.map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SELECT</th>
              {headerList.map((e, i) => (
                <th key={i}>{e as string}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {props.data.map((e, i) => (
              <tr key={i}>
                <td>                  
                  <input
                    onChange={(event) => {
                      setSelectedRow(props.data[i]);
                      setSelectedAction("");
                    }}
                    type="radio"
                    name="radio-2"
                    className="radio radio-primary radio-xs"
                  />
                </td>
                {headerList.map((e1, i1) => (
                  <td key={i1}>{props.data[i][e1] as string}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*
Important article to iterate over object keys in typescript
https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
*/
