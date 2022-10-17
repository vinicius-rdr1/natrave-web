import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup'; 
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(),
    awayTeamScore: yup.string().required()
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


            <form className='flex w-full space-x-4 justify-center items-center '>

                <span className='uppercase'>{homeTeam}</span>
                <img src={`~/../public/images/flags/${homeTeam}.png`} alt="" />

                <input 
                className='bg-red-700/[0.20] w-[55px] h-[55px] text-red-700 text-xl text-center font-bold' 
                type="number" 
                name="homeTeamScore"
                value={formik.values.homeTeamScore} 
                onChange={formik.handleChange}   
                onBlur={formik.handleSubmit}
                disabled={disabled}              
                />

                <span className='mx-4 text-red-500 font-bold'>X</span>

                <input 
                className='bg-red-700/[0.20] w-[55px] h-[55px] text-red-700 text-xl text-center font-bold'
                type="number" 
                name='awayTeamScore'
                value={formik.values.awayTeamScore}  
                onChange={formik.handleChange}
                onBlur={formik.handleSubmit}
                disabled={disabled}       
                />                   

                <img src={`~/../public/images/flags/${awayTeam}.png`} alt="" />
                <span className='uppercase'>{awayTeam}</span>                          

            </form> 

        </div>                   
)
}




