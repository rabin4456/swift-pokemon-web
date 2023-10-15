import { useDispatch, useSelector } from "react-redux";
import { stringToTitleCase } from "../../../utils";
import { TrashIcon } from "@heroicons/react/20/solid";
import { REMOVE_ITEMS_FROM_CART } from "../../../features/teams/teamSlice";
import { Popover } from "@headlessui/react";

const TeamCart = () => {
  const teams = useSelector((state: any) => state?.TeamReducer?.teams);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(REMOVE_ITEMS_FROM_CART({ id }));
  };

  return (
    <>
      <Popover className=''>
        <Popover.Button>
          <div className='fixed right-20 top-10 h-16 border border-gray-100 bg-white shadow-md cursor-pointer flex justify-center items-center rounded-full p-2 '>
            <p className='font-bold text-green-500'>My Team</p>
          </div>
        </Popover.Button>

        <Popover.Panel className='absolute z-10'>
          <div className='fixed right-24 divide-y-2 divide-gray-200 max-h-[35rem] w-96 overflow-y-auto top-28 border border-gray-200 bg-white shadow-md  flex  flex-col  rounded-md p-2 '>
            {teams?.map((el: any) => (
              <div
                key={el.image}
                className='flex justify-between items-center  px-4 py-2'
              >
                <div className="flex gap-4">
                  <div>
                    <img src={el.image} className='h-20 w-20' />
                  </div>
                  <div className='flex justify-center items-center'>
                    <p className='font-bold text-gray-600'>
                      {stringToTitleCase(el?.name)}
                    </p>
                  </div>
                </div>

                <div>
                  <TrashIcon
                    className='h-6 w-10 text-red-600 cursor-pointer pl-4'
                    onClick={() => handleDelete(el.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
};

export default TeamCart;
