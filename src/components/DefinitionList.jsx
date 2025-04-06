import { FaRegCircle } from "react-icons/fa"; // Import an icon for N/A


export default function DefinitionList({ word, info, type="all-info" }) {
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
}
