import data from "./data";

import { useState } from "react";

function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(currentId) {
    setSelected(currentId === selected ? null : currentId);
  }

  function handleMultiSelection(currentId) {
    const findIndexOfCurrentId = multiple.indexOf(currentId);

    if (findIndexOfCurrentId === -1) {
      setMultiple([...multiple, currentId]);
    } else {
      setMultiple(multiple.filter((id) => id !== currentId));
    }
    console.log(selected, multiple);
  }

  return (
    <div className="flex min-h-screen w-full justify-center items-center  gap-1 flex-col">
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className={
          enableMultiSelection
            ? " bg-indigo-300 px-2 py-2 mb-5  font-semibold cursor-pointer"
            : "bg-indigo-200 px-2 py-2 mb-5  font-semibold cursor-pointer"
        }
      >
        {enableMultiSelection
          ? " Multi Selection Enabled"
          : "Enable Multi Selection"}
      </button>

      <div className=" w-xl cursor-pointer">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="bg-slate-200 mb-4 py-3 px-3">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="text-2xl flex justify-between items-center"
              >
                <h3 className="font-semibold">{dataItem.question}</h3>

                {selected === dataItem.id ? <span>-</span> : <span>+</span>}
              </div>

              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="pt-2 text-lg">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="pt-2 text-lg">{dataItem.answer} </div>
                  )}
            </div>
          ))
        ) : (
          <div>No Data found! </div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
