import { Tab } from "@headlessui/react";
import clsx from "clsx";
const Tabs = ({
  data,
  setSelectedTab,
}: {
  data: { label: string; value: string }[];
  setSelectedTab: any;
}) => {
  return (
    <Tab.Group className='w-full' as={"div"}>
      <Tab.List
        className={
          "w-full flex bg-white flex-row justify-evenly  shadow-md  rounded-md "
        }
      >
        {data?.map((el) => (
          <Tab
            onClick={() => setSelectedTab(el.value)}
            className={"border-0 focus:ring-0  focus:ring-transparent"}
            key={el.value}
          >
            {({ selected }) => (
              <div
                className={clsx(
                  selected
                    ? "text-gray-700 border-b-2 px-4 bg-gray-100 border-blue-500 "
                    : "text-gray-700",
                  "p-2 "
                )}
              >
                {el.label}
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};

export default Tabs;
