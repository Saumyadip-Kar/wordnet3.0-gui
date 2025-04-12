//DefinitionList.jsx


export default function DefinitionList({ word, info, type="all-info", treeInfo="NA" }) {
  console.log("Dbg: checking in the list:", info)
  const parsedInfo = Array.isArray(info) ? info : [info];

  
  if(type=="all-info")
    return (
      <div className="h-[91%] p-4 bg-gray-800 rounded-md min-h-20 overflow-auto">
        {/* <h2 className="text-lg font-bold">Senses of "{word}"</h2> */}
        <ul className="mt-2 space-y-2">
          {parsedInfo.length === 0 || parsedInfo[0] === undefined ? (
            <li className="text-gray-400">No information available.</li>
          ) : (
            parsedInfo.map((item, index) => (
              <li key={index} className="border-l-4 border-blue-500 pl-2 text-left">
                <strong>{index + 1}.</strong>
                {typeof item === "string" ? (
                  <span> {item}</span>
                ) : typeof item === "object" && item !== null ? (
                  <ul className="ml-4 mt-1 space-y-1">
                    {Object.entries(item).map(([key, value], subIndex) => (
                      <li key={subIndex} className="text-sm text-gray-300">
                        <strong className="capitalize text-blue-400">{key}:</strong>{" "}
                        {Array.isArray(value) ? (
                          value.length > 0 ? (
                            key === "examples" ? (
                              <ul className="ml-8 list-disc">
                                {value.map((v, i) => (
                                  <li key={i}>{v}</li>
                                ))}
                              </ul>
                            ) : (
                              <span>{value.join(", ")}</span> // Inline for other lists
                            )
                          ) : (
                            <span className="text-gray-500"> Not Available </span>
                          )
                        ) : typeof value === "object" && value !== null ? (
                          JSON.stringify(value, null, 2) // Handle nested objects
                        ) : (
                          String(value)
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span> {String(item)}</span>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  
  //Plain text based view, doesn't have any problem
    if(type=="text"){
    return (
      <div className="h-[91%] p-4 bg-gray-800 rounded-md min-h-20 overflow-auto">
        <textarea
          readOnly
          wrap="off"
          value={String(treeInfo)}
          className="w-full h-full bg-gray-900 text-white p-2 rounded-md resize-none overflow-auto font-mono"
        />
      </div>
    );
  }

  //Rich text has some indentation problem
  // if (type === "text") {
  //   const lines = String(treeInfo).split("\n");
  //   return (
  //     <div className="h-[91%] p-4 bg-gray-800 rounded-md min-h-20 overflow-x-auto overflow-y-auto">
  //       <pre className="whitespace-pre font-mono text-sm text-white">
  //         {lines.map((line, index) => {
  //           const indentMatch = line.match(/^(\s*)/);
  //           const indent = indentMatch ? indentMatch[1] : "";
  
  //           // Convert spaces to non-breaking spaces
  //           const formattedIndent = indent.replace(/ /g, "\u00A0");
  
  //           const parts = line.trim().match(/^↳?\s*(.*?)\.(.*?)\s*\((.*)\)$/);
  
  //           if (parts) {
  //             const [_, concept, sense, definition] = parts;
  //             return (
  //               <div key={index}>
  //                 <span>{formattedIndent}</span>
  //                 <span className="text-red-400">↳</span>
  //                 <span className="text-cyan-400">{concept}</span>
  //                 <span className="text-yellow-400">.{sense}</span>
  //                 <span className="text-gray-200"> ({definition})</span>
  //               </div>
  //             );
  //           } else {
  //             return <div key={index}>{line}</div>;
  //           }
  //         })}
  //       </pre>
  //     </div>
  //   );
  // }
  
  
}
