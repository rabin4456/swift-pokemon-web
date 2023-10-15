import { useEffect, useState } from "react";
import { ADD_PERSISITED_DATA } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { getPokemon } from "../api";
import { useQuery } from "@tanstack/react-query";
import { stringToTitleCase } from "../utils";
import Modal from "../components/ui/modal";

const tabItems = [
  { label: "I", value: "1" },
  { label: "II", value: "2" },
  { label: "III", value: "3" },
  { label: "IV", value: "4" },
  { label: "V", value: "5" },
  { label: "VI", value: "6" },
  { label: "VII", value: "7" },
  { label: "VIII", value: "8" },
];

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [selectedItem, setSelectedItem] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const { data } = useQuery(["pokemon", selectedTab], () => getPokemon());
  console.log(data, "===data==");
  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    const discount: any = localStorage.getItem("discount");
    const total: any = localStorage.getItem("total");
    if (data) {
      dispatch(
        ADD_PERSISITED_DATA({
          cart: JSON.parse(data),
          total: total,
          discount: discount,
        })
      );
    }
  }, []);

  const handleClick = (item: any) => {
    setOpenModal(true);
    setSelectedItem(item);
  };
  console.log(data, "data");
  return (
    <>
      <div className=' bg-gray-50 z-0'>
        <div className='flex flex-col justify-center items-center  py-10'>
          <div className=' font-extrabold text-4xl text-gray-600'>Pokédex</div>
          <div className='h-1 w-16 bg-red-400 rounded-sm' />
        </div>
        {/* // */}
        <div className=' flex flex-col justify-center items-center '>
          <p className='text-blue-500 font-bold py-2'>Select Generation:</p>
          <div className='  flex flex-col items-center justify-center'>
            <Tab.Group className='w-full' as={"div"}>
              <div></div>
              <Tab.List
                className={
                  "w-full flex bg-white flex-row justify-evenly  shadow-md  rounded-md "
                }
              >
                {tabItems?.map((el) => (
                  <Tab
                    onClick={() => setSelectedTab(el.value)}
                    className={"border-0 focus:ring-0"}
                  >
                    {({ selected }) => (
                      <div
                        className={clsx(
                          selected
                            ? "text-gray-700 border-b-2 px-4 bg-gray-100 border-blue-500 focus:ring-0"
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
              {/* <Tab.Panels className={"p-5 grid grid-cols-4 gap-4 w-full"}>
              <Tab.Panel className={"p-5 pt-9"}>
                <div className='h-44 w-96 bg-gray-200 rounded-3xl'>
                  <div className='p-3'>asdasd</div>
                </div>
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels> */}
            </Tab.Group>
          </div>
          <div
            className={
              "p-5  grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-10"
            }
          >
            {data?.map((el: any) => (
              <div
                className='h-auto p-4 py-7 bg-green-300 rounded-3xl cursor-pointer '
                onClick={() => handleClick(el)}
              >
                <div className='grid grid-cols-2'>
                  <div>
                    <div className=' text-2xl font-extrabold text-white pb-2'>
                      {stringToTitleCase(el.name)}
                    </div>
                    {el?.types?.map((type: any) => (
                      <div className='flex flex-col  w-1/2 justify-start items-start'>
                        <div className=' px-2 mt-1 bg-gray-50 rounded-2xl bg-opacity-20 '>
                          <p className='text-white font-normal '>
                            {stringToTitleCase(type?.type?.name)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className=''>
                    <img src={el?.image} height={10} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal
          show={openModal}
          onModalClose={() => setOpenModal(false)}
          data={selectedItem}
        >
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            debitis fugiat ea quis, provident maxime alias quasi magnam enim
            commodi, adipisci rem quos impedit veniam praesentium similique,
            repellendus in id!
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Home;
