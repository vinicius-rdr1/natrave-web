import { Navigate } from 'react-router-dom';
import { useLocalStorage, useAsyncFn, useAsync } from 'react-use'
import axios from 'axios'
import { format, formatISO } from 'date-fns'
import { useEffect, useState } from 'react';

import {Icon, Card, DateSelect} from '~/components'


export const Dashboard = () => {    
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
    const [auth] = useLocalStorage ("auth", {})

    const [hunches, fetchHunches] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${auth.user.username}`,
        })

        const hunches = res.data.hunches.reduce((acc, hunch) => {
            acc[hunch.gameId] = hunch
            return acc
        }, {})   
        

        return {
            ...res.data,
            hunches}
        

    })

        
    const [games, fetchGames] = useAsyncFn(async (params) => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params,
        })      

        return res.data
    })

    const isLoading = games.loading || hunches.loading
    const hasError = games.error || hunches.error
    const isDone = !isLoading && !hasError

    useEffect(() => {
        fetchHunches()
    }, [])

    useEffect(() => {
        fetchGames({ gameTime: currentDate })
        
    }, [currentDate])

    if(!auth?.user?.id){
        return <Navigate to="/" replace={true}/>
    }

    return (
   
        <>
            <header className='bg-red-500 text-white p-4'>
                <div className=" container max-w-3xl  flex justify-between">
                    <img src="/logo/logo-fundo-vermelho.svg" alt="" className="md:w-50 w-40 p-4"/>
                    <a href={`/${ auth?.user?.username }`}><Icon name="profile" className="w-10"/></a>
                </div>
            </header>

                <main className='space-y-6'>
                    <section id="header" className='bg-red-500 text-white p-4'>
                        <div className="bg-red-500 container max-w-3xl space-y-2">
                            <span>Olá { auth.user.name }</span>
                            <h3 className='text-2xl font-bold'>Qual o seu palpite?</h3>
                        </div>
                    </section>


                    <section id="content" className='p-2 container max-w-3x space-y-4'>                        

                        <DateSelect currentDate={currentDate} onChange={setDate} />

                        <div id="cardList" className='space-y-4'>

                            {isLoading && 'Carregando jogos...'}
                            {hasError && 'Ops! Algo deu errado.'}                            

                            {isDone && games.value?.map(game => (
                                <Card 
                                    key={game.id}
                                    gameId={game.id}
                                    homeTeam={game.homeTeam}
                                    awayTeam={game.awayTeam}
                                    gameTime={format(new Date(game.gameTime), "HH:mm")}
                                    homeTeamScore={hunches.value?.hunches?.[game.id]?.homeTeamScore || ''}
                                    awayTeamScore={hunches.value?.hunches?.[game.id]?.awayTeamScore || ''}

                                />
                            ))}    

                        </div> 
                    </section>
                </main>          
            
        </> 
    ) 
   }
