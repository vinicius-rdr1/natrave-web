import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup'; 
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
    homeTeamScore: yup.number().integer("coloque um numero valido").min(0,"O seu palpite não pode ser menor do que Zero"),
    awayTeamScore: yup.number().integer("coloque um numero valido").min(0, "O seu palpite não pode ser menor do que Zero")
})



export const Card = ({gameTime, homeTeam, awayTeam, gameId, homeTeamScore, awayTeamScore, disabled}) => {

    const [auth] = useLocalStorage('auth')

    const formik = useFormik({
        onSubmit: (values) => {
            axios({
                method:'post',
                baseURL: import.meta.env.VITE_API_URL,
                url:'/hunches',
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
                data: {
                    ...values, 
                    gameId
                }

                

                
            })            

            
        },
        initialValues: {
            homeTeamScore,
            awayTeamScore,

        }, 
        validationSchema
    })

    return (

        <div className='border border-gray-700 rounded-xl p-4 text-center space-y-4'>
                                
            <span className='text-xs md:text-base text-gray-300 font-bold'>{ gameTime }</span>


            <form className='flex w-full space-x-2 md:space-x-4 justify-center items-center '>

                <span className='uppercase'>{homeTeam}</span>
                <img src={`/images/flags/${homeTeam}.png`} alt="" />

                <input 
                className='bg-red-700/[0.20] w-[55px] h-[55px] text-red-700 text-xl rounded text-center font-bold' 
                type="number" 
                name="homeTeamScore"
                value={formik.values.homeTeamScore} 
                onChange={formik.handleChange}
                onBlur={formik.handleSubmit}
                disabled={disabled}              
                />

                <span className='md:mx-4  mx-2 text-red-500 font-bold'>X</span>

                <input 
                className='bg-red-700/[0.20] w-[55px] h-[55px] rounded text-red-700 text-xl text-center font-bold'
                type="number" 
                name='awayTeamScore'
                value={formik.values.awayTeamScore}  
                onChange={formik.handleChange}
                onBlur={formik.handleSubmit}
                disabled={disabled}       
                />                   

                <img src={`/images/flags/${awayTeam}.png`} alt="" />
                <span className='uppercase'>{awayTeam}</span>                                     

            </form>
            <span className="p-2 text-sm text-red-700">{formik.errors.homeTeamScore || formik.errors.awayTeamScore}</span> 

        </div>                   
)
}




