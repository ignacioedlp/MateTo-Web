import { Player } from '@lottiefiles/react-lottie-player';

function Loader() {
  return <div className='container flex items-center justify-center h-screen mx-auto '>
    <div className='w-40 h-40'>
      <Player
        src="https://lottie.host/c347a01b-7544-489f-a889-bc6017eb6ea2/euwpGrghxm.json"
        className="player"
        loop
        autoplay
      />
    </div>
  </div>
}

export default Loader