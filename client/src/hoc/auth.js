import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch} from 'react-redux';
import { auth } from '../_action/user_actioin'
import { useNavigate } from 'react-router-dom';
export default function (SpecificComponent, option, adminRoute = null){
    //null 아무나 출입이 가능한 페이지
    //true 로그인한 유저만 출입이 가능한 페이지
    //false 로그인한 유저는 출입이 불가능한 페이지
    function AuthenticationCheck(){
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 안한 상태
                if(!response.payload.isAuth){
                    if(option){
                        navigate('/login')
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAuth){
                        navigate('/')
                    }else{
                        if(option === false){
                            navigate('/')
                        }
                    }
                }
                
            })
            axios.get('/api/users/auth')
        },[])
        return(
            <SpecificComponent/>
        )
    }
    return <AuthenticationCheck/>;
}