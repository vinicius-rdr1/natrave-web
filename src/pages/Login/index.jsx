import {Icon, Input} from '~/components'
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';   
import { useLocalStorage} from 'react-use'
import { Navigate } from 'react-router-dom';




export const Login = () => {

    const validationSchema = yup.object().shape({
    
        email: yup.string().email('Coloque um e-mail valido').required('Preencha seu e-mail'),
        password: yup.string().required('Preencha sua senha'),
     
       });
    
    const formik = useFormik({
        onSubmit: async (values) =>  {
            
            const res = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/Login',
                auth: {
                    username: values.email,
                    password: values.password,
                }
                     
                
            })
            setAuth(res.data)


            
        },
        initialValues: {
            email: '',
            password:'',
        }, 
        validationSchema,
    })  

    const [auth, setAuth] = useLocalStorage ("auth", {})      


    if(auth?.user?.id){
        return <Navigate to="/dashboard" replace={true}/>
    }

  

    return(
        <div>
            <header className=" p-4  border-b border-red-300">
                <div className="container max-w-xl flex justify-center">
                    <img src="/logo/logo-fundo-branco.svg" alt="" className="md:w-40 w-32 p-4"/>
                </div>
                
            </header>
            <main className="container max-w-xl p-4">
                <div className="p-4">
                    
                    <div className='flex p-4 space-x-4 items-center justify-left'>
                        <a href="/">
                        <Icon name="arrowBack" className="h-6"/>
                        </a>
                        
                        <h2 className="text-xl font-bold">Entre na sua conta</h2>

                    </div>

                    <form className="space-y-6 p-4" onSubmit={formik.handleSubmit}>
                        <Input 
                            type="text"
                            name="email"
                            label="Seu email"
                            placeholder="Digite seu e-mail"
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />

                        <Input 
                            type="password"
                            name="password"
                            label="Sua senha"
                            placeholder="Digite sua senha"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />

                        <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="block w-full text-center text-white bg-red-500 px-6 py-3 rounded-xl disabled:opacity-70"> {formik.isSubmitting ? 'Carregando' : 'Fazer Login'}</button>
                        
                       
                       
                    </form>
                </div>
            </main>
        </div>
    )
}