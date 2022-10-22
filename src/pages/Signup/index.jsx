import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom'
import { useLocalStorage} from 'react-use'


import {Icon, Input} from '~/components'


const validationSchema = yup.object().shape({
   name: yup.string().required('Preencha seu nome'),
   username: yup.string().matches(/^[aA-zZ\s]+$/, "Este campo não aceita caracteres especiais!").required('Preencha seu nome de usuario'),
   email: yup.string().email('Coloque um e-mail valido').required('Preencha seu e-mail'),
   password: yup.string().required('Preencha sua senha'),

  });

export const Signup = () => {  
    
    const [auth, setAuth] = useLocalStorage ("auth", {})   
    const formik = useFormik({
        onSubmit: async (values) => { 
        

            const res = await axios({
                
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: "/users",
                data: values,
                
            })
            
            const login = await axios ({
                
                    method: 'get',
                    baseURL: import.meta.env.VITE_API_URL,
                    url: '/Login',
                    auth: {
                        username: values.email,
                        password: values.password,
                    }
                
            })

            setAuth(login.data)
            window.localStorage.setItem('auth', JSON.stringify(login.data))     


        },  
        initialValues: {
          name: '',
          username: '',
          email: '',
          password: '',
        },
        validationSchema
                    
        
    });   

    if(auth?.user?.id){
        return <Navigate to="/dashboard" replace={true}/>
    }

   


    return(
        <>      
    
            <div>
                <header className=" p-4  border-b border-red-300">
                    <div className="container max-w-xl flex justify-center">
                        <img src="../assets-natrave/logo/logo-fundo-branco.svg" alt="" className="md:w-40 w-32 p-4"/>
                    </div>
                    
                </header>
                <main className="container max-w-xl p-4">
                    <div className="p-4">
                        
                        <div className='flex p-4 space-x-4 items-center justify-left'>
                            <a href="/">
                            <Icon name="arrowBack" className="h-6"/>
                            </a>
                            
                            <h2 className="text-xl font-bold">Crie sua conta</h2>

                        </div>

                        <form className="space-y-6 p-4" onSubmit={formik.handleSubmit}>
                            <Input 
                              type="text"
                              name="name"
                              label="Seu nome"
                              placeholder="Digite um nome"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.name}
                              error={formik.touched.name && formik.errors.name}
                            />

                            <Input 
                                type="text"
                                name="username"
                                label="Seu nome de usuário"
                                placeholder="Digite um nome de usuário"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                error={formik.touched.username && formik.errors.username}
                            />
                            
                            
                            <Input 
                                type="text"
                                name="email"
                                label="Seu email"
                                placeholder="Digite seu e-mail"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.touched.email && formik.errors.email}
                            />

                            <Input 
                                type="password"
                                name="password"
                                label="Sua senha"
                                placeholder="Digite sua senha"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={formik.touched.password && formik.errors.password}
                            />

                        

                            <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="block w-full text-center text-white bg-red-500 px-6 py-3 rounded-xl disabled:opacity-70">
                                {formik.isSubmitting ? 'Carregando' : 'Criar minha conta'}
                            </button>                           
                        
                        
                        </form>
                    </div>
                </main>
            </div>

        </>
    )
}