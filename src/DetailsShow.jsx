import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/Context.jsx";
import { FaRegCheckCircle } from "react-icons/fa";

function DetailsShow({ CSS, updateDetailsData, show }) {
  let { details, setDetails, currentGroupTypes } = useContext(UserContext);

  let [change, setChange] = useState([]);

  function CHANGE() {
    let arr = [];
    details.forEach((data, index) => {
      arr.push({
        index: index,
        changeStatus: false,
      });
    });
    return arr;
  }

  useEffect(() => {
    if (change.length < 1) {
      setChange(CHANGE());
    }
  }, [details]);

  return (
    <div
      className={`
          w-[90%] border-2 border-orange-500 border-t-0 bg-slate-900 absolute z-[-40] 
          rounded-b-lg shadow-[0_2px_6px_rgba(0,0,0,0.8)] text-white p-5
           transition-all duration-500 ease-in-out
          ${
            show
              ? "top-[103.6%] opacity-100 pointer-events-auto z-[-40]"
              : "top-0 opacity-0 pointer-events-none z-[-40] "
          }
        `}
    >
      <table className="table-auto border border-dotted border-black w-full xl:text-[1vw] sm:text-[2vw]">
        <thead>
          <tr className="">
            <th className={`${CSS().optionalDisplay} p-2`}>SL</th>
            <th className={`${CSS().optionalDisplay} p-2`}>Student ID</th>
            <th className={`${CSS().optionalDisplay} p-2`}>Student Name</th>
            <th className={`${CSS().optionalDisplay} p-2`}>
              {" "}
              {currentGroupTypes || ""} Title
            </th>
          </tr>
        </thead>

        <tbody>
          {details.map(
            (
              {
                student_ObjID,
                title_ObjID,
                studentID,
                studentName,
                courseType,
                title,
                main_group_ObjectID,
              },
              index
            ) => (
              <tr key={index}>
                <td className={` ${CSS().optionalDisplay} h-10 p-2`}>
                  {index + 1}.
                </td>
                <td className={` ${CSS().optionalDisplay} h-10 p-2`}>
                  {studentID}
                </td>

                <td
                  className={` ${
                    CSS().optionalDisplay
                  } h-10 p-2 cursor-default`}
                >
                  {studentName}
                </td>

                <td className={` ${CSS().optionalDisplay} h-10`}>
                  <div className="w-ful h-full flex items-center justify-center">
                    <input
                      className="border-none w-[90%] h-full focus:outline-0 focus:bg-slate-700 pl-2"
                      onChange={(e) => {
                        setChange((prev) => {
                          return prev.map((item, mapIdx) => {
                            return mapIdx === index
                              ? { ...item, changeStatus: true }
                              : item;
                          });
                        });
                        setDetails((prev) =>
                          prev.map((data, dataIndex) =>
                            index === dataIndex
                              ? { ...data, title: e.target.value }
                              : data
                          )
                        );
                      }}
                      value={title}
                      type="text"
                    />

                    <span className="w-[10%] h-full flex justify-center items-center">
                      <span
                        onClick={() => {
                          setChange((prev) => {
                            return prev.map((item, mapIdx) => {
                              return mapIdx === index
                                ? { ...item, changeStatus: false }
                                : item;
                            });
                          });

                          updateDetailsData(
                            title_ObjID,
                            student_ObjID,
                            "title",
                            title,
                            main_group_ObjectID
                          );
                        }}
                        className="scale-150 text-slate-400 hover:text-lime-400 cursor-pointer"
                      >
                        {change[index]?.changeStatus ? (
                          <FaRegCheckCircle />
                        ) : null}
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DetailsShow;
