import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getPokemon } from "../api";
import { useQuery } from "@tanstack/react-query";
import { stringToTitleCase } from "../utils";
import Modal from "../components/ui/modal";
import Header from "../components/ui/header";
import Loading from "../components/ui/loadingUi";
import TeamCart from "../components/ui/teamsCart";
import { ADD_PERSISITED_DATA } from "../features/teams/teamSlice";
import Tabs from "../components/ui/tab";

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

  const { data } = useQuery(["pokemon", selectedTab], () =>
    getPokemon(selectedTab)
  );

  useEffect(() => {
    const teams: any = localStorage.getItem("teams");

    if (teams) {
      dispatch(ADD_PERSISITED_DATA(JSON.parse(teams)));
    }
  }, []);

  const handleClick = (item: any) => {
    setOpenModal(true);
    setSelectedItem(item);
  };

  return (
    <>
      <div className=' h-screen bg-gray-50 z-0'>
        <Header />
        <TeamCart />
        <div className=' flex flex-col justify-center items-center '>
          <p className='text-blue-500 font-bold py-2'>Select Generation:</p>
          <div className='  flex flex-col items-center justify-center'>
            <Tabs data={tabItems} setSelectedTab={setSelectedTab} />
          </div>

          {/* tab body */}
          <div
            className={
              "p-5  grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-10"
            }
          >
            {data?.length ? (
              data.filter(Boolean)?.map((el: any) => (
                <div
                  className='h-auto p-4 py-7 bg-green-300 rounded-3xl cursor-pointer ring-green-100  ring-opacity-40 ring-4 '
                  onClick={() => handleClick(el)}
                  key={el?.id}
                >
                  <div className='grid grid-cols-2'>
                    <div>
                      <div className=' text-2xl font-extrabold text-white pb-2'>
                        {el?.name && stringToTitleCase(el?.name)}
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
              ))
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <Modal
          show={openModal}
          onModalClose={() => setOpenModal(false)}
          data={selectedItem}
        />
      </div>
    </>
  );
};

export default Home;
