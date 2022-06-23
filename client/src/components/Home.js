import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';
import back from "../assets/Back.gif"
import mobile from "../assets/forMobile.gif"
import LoadingScreen from './LoadingScreen';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Footer from './Footer';
import Contact from './Contact';
import Newsletter from './Newsletter';
const { io } = require("socket.io-client");
const ENDPOINT = process.env.REACT_APP_ENDPOINT || "http://localhost:5000"

function Home() {
  const socket = useSelector(state => state.user.socket)
  const loading = useSelector(state => state.room.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    const getSocket = () => {
      if (socket === null) {
        dispatch(userActions.setSocket(io(ENDPOINT)))
      }
    }
    getSocket()
  }, [socket, dispatch]);

  return (
    loading ?
      <LoadingScreen />
      :
      <>
        <main>
          <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <img src={back} alt="back" className='w-screen h-screen absolute z-0 md:block hidden object-cover' />
            <img src={mobile} alt="back-mobile" className='w-screen h-screen absolute z-0 md:hidden object-cover' />

            <main className="flex flex-col justify-around md:flex-row relative z-10 top-14 md:top-16">
              <CreateRoom />
              <JoinRoom />
            </main>
          </div>
        </main>

        <section className='min-h-screen w-full'>
          <Newsletter />
          <Contact />
          <Footer />
        </section>
      </>
  )
}

export default Home