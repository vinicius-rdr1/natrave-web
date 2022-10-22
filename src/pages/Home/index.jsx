import { Navigate } from 'react-router-dom';
import { useLocalStorage} from 'react-use'

export function Home() {

  const [auth] = useLocalStorage ("auth", {})      


    if(auth?.user?.id){
        return <Navigate to="/dashboard" replace={true}/>
    }
  
  return (
    <div className="h-screen  bg-red-300 flex flex-col items-center md:w-full">
      <header className="container max-w-6xl p-4 flex justify-center">
        <img src="../assets-natrave/logo/logo-fundo-vinho.svg" alt="" className="md:w-50 w-40 p-4"/>
      </header>
      

      <div className="container max-w-5xl flex-1 p-4 text-white flex flex-col items-center space-y-4 md:space-y-0 md:space-x-4 md:flex-row">

        <div className="md:flex-1 flex justify-center">
          <img src="/img.png" alt="" className="w-full max-w-md"/>
        </div>
        
        <div className="flex flex-col space-y-6 md:flex-1 p-4">
          <h1 className="text-3xl text-center font-bold md:text-left">Dê o seu palpite na Copa do Mundo do Catar 2022!</h1>
          
          <a href="/Signup" className="text-center text-red-300 bg-white text-xl px-8 py-4 rounded-xl">Criar minha conta</a>
          
          <a href="/Login" className="text-white text-center border border-white text-xl px-8 py-4 rounded-xl">Fazer Login</a>
        </div>
    
      </div>
    </div>
   
  )
}


