import { Dialog, Tab, Transition } from "@headlessui/react";
import { ArrowLeftIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import * as React from "react";
import { stringToTitleCase } from "../../../utils";
import { useDispatch } from "react-redux";
import { ADD_ITEM_TO_CART } from "../../../features/teams/teamSlice";

const tabItems = [
  { label: "About", value: "1" },
  { label: "Base Stat", value: "2" },
  { label: "Evolution", value: "4" },
];
export default function Modal({
  show = false,
  className = "",
  onModalClose,
  data,
  children,
}: {
  show: boolean;
  className?: string;
  data: any;
  onModalClose: () => void;
  children?: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const onAddToTeam = () => {
    dispatch(ADD_ITEM_TO_CART(data));
  };
  return (
    <Transition.Root show={show} as={React.Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0  z-[99] overflow-y-auto '
        onClose={() => {
          onModalClose();
        }}
      >
        <div className='flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-300 bg-opacity-60 backdrop-blur-none transition-opacity' />
          </Transition.Child>

          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-300'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={clsx(
                "inline-block transform  rounded-[2rem] bg-green-300 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle",
                className
              )}
            >
              <div className=''>
                <div className='h-[39rem] flex flex-col rounded-3xl'>
                  <div className='flex-1  p-4'>
                    <div>
                      <ArrowLeftIcon
                        className='h-7 w-7 cursor-pointer text-white'
                        onClick={onModalClose}
                      />
                    </div>
                    <div className='absolute top-4 right-5'>
                      <PlusCircleIcon
                        className='h-9 w-9 cursor-pointer text-white'
                        onClick={onAddToTeam}
                      />
                    </div>
                    <div className='flex justify-center items-center'>
                      <div>
                        <div className=' text-2xl font-extrabold text-white pb-2'>
                          {data?.name && stringToTitleCase(data?.name)}
                        </div>
                        <div className='flex gap-2 justify-center items-center'>
                          {data?.types?.map((type: any) => (
                            <div
                              key={type?.type?.name}
                              className=' px-2 mt-1 bg-gray-50 rounded-2xl bg-opacity-20 '
                            >
                              <p className='text-white font-normal '>
                                {stringToTitleCase(type?.type?.name)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='relative h-48 w-48 left-[15rem] top-[2.5rem]'>
                      <img src={data?.image} />
                    </div>
                  </div>
                  <div className='flex-1 rounded-[2rem] p-6 bg-white'>
                    <div className='  flex flex-col items-center justify-center'>
                      <Tab.Group className='w-full' as={"div"}>
                        <div></div>
                        <Tab.List
                          className={
                            "w-full flex bg-white flex-row justify-start gap-7 border-b-2 focus:ring-0 ri "
                          }
                        >
                          {tabItems?.map((el) => (
                            <Tab className={"border-0 focus:ring-0 focus:outline-none"} key={el.value}>
                              {({ selected }) => (
                                <div
                                  className={clsx(
                                    selected
                                      ? "text-gray-900 border-b-4    border-blue-500 focus:ring-0"
                                      : "text-gray-500",
                                    "p-2 font-medium uppercase "
                                  )}
                                >
                                  {el.label}
                                </div>
                              )}
                            </Tab>
                          ))}
                        </Tab.List>
                        <Tab.Panels className={"py-5   w-full"}>
                          <Tab.Panel>
                            <div className='w-full flex flex-col gap-4'>
                              <div className='grid grid-cols-3 w-full '>
                                <p className='text-gray-600 col-span-1 font-medium'>
                                  Species
                                </p>
                                <p className='text-gray-900 flex gap-3 col-span-2 font-medium'>
                                  {data?.types?.map((el: any) => (
                                    <span>{el?.type?.name}</span>
                                  ))}
                                </p>
                              </div>
                              <div className='grid grid-cols-3 w-full '>
                                <p className='text-gray-600 col-span-1 font-medium'>
                                  Height
                                </p>
                                <p className='text-gray-900 flex gap-3 col-span-2 font-medium'>
                                  {data?.about?.height}
                                </p>
                              </div>
                              <div className='grid grid-cols-3 w-full '>
                                <p className='text-gray-600 col-span-1 font-medium'>
                                  Weight
                                </p>
                                <p className='text-gray-900 flex gap-3 col-span-2 font-medium'>
                                  {data?.about?.weight}
                                </p>
                              </div>
                              <div className='grid grid-cols-3 w-full '>
                                <p className='text-gray-600 col-span-1 font-medium'>
                                  Ability
                                </p>
                                <p className='text-gray-900 flex gap-3 col-span-2 font-medium'>
                                  {data?.about?.ability?.map((el: any) => (
                                    <span key={el?.ability?.name}>{el?.ability?.name}</span>
                                  ))}
                                </p>
                              </div>
                            </div>
                          </Tab.Panel>
                          <Tab.Panel>
                            <div className='w-full flex flex-col gap-2'>
                              {data?.stats?.map((el: any) => (
                                <div key={el?.stat?.name} className='grid grid-cols-3 w-full '>
                                  <p className='text-gray-600  col-span-1 font-medium'>
                                    {stringToTitleCase(el?.stat?.name)}
                                  </p>
                                  <p className='text-gray-900 flex  col-span-2 font-medium'>
                                    <span>{el?.base_stat}</span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          </Tab.Panel>
                          <Tab.Panel>
                            <div className='w-full flex flex-col gap-4'>
                              {data?.evolution?.evolution_details?.map(
                                (el: any) => (
                                  <div className='grid grid-cols-3 w-full '>
                                    <p className='text-gray-600 flex flex-col col-span-1 font-medium'>
                                      <span>Min level</span>
                                      <span>Turns up side-down</span>
                                    </p>
                                    <p className='text-gray-900 flex flex-col  col-span-2 font-medium'>
                                      <span>{el?.min_level}</span>
                                      <span>{`${el?.turn_upside_down}`}</span>
                                    </p>
                                  </div>
                                )
                              )}
                              {data?.evolution?.evolves_to?.map((el: any) => (
                                <div className='grid grid-cols-3 w-full '>
                                  <p className='text-gray-600 flex flex-col col-span-1 font-medium'>
                                    <span>Evolves To</span>
                                    <span>Is baby</span>
                                  </p>
                                  <p className='text-gray-900 flex flex-col  col-span-2 font-medium'>
                                    <span>
                                      {stringToTitleCase(el?.species?.name)}
                                    </span>
                                    <span>{`${el?.is_baby}`}</span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
