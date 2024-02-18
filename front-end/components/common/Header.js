
import '../../css/common/Header.css';
import $ from 'jquery'
import {useEffect,useState} from 'react';
import axios from 'axios';
import React from 'react';

function Header(props) {
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    useEffect(()=>{
        menu()
        checkAccessToken()
    },[])

    const menu=()=>{
        $("#gnb>li").on({
            "mouseover":function(){
                var idx = $(this).index()
                console.log(idx)
                $("#gnb>li").eq(idx).find("#lnb-wrap").show()
            },
            "mouseout":function(){
                $("#gnb>li").find("#lnb-wrap").hide()
            }
        }
            
        )
    }

    const checkAccessToken=()=>{
        console.log('checkAccessToken')
        const token = sessionStorage.getItem('token')
        if(token===null){
            console.log('토큰정보 존재하지 않음')
            return
        }

        axios({
            url:'/v1/user/access_token_info',
            method:'get',
            headers:{'Authorization':`Bearer ${token}`},
        }).then(
            response=>{
                console.log('checkAccessToken then')
                console.log(response)
                console.log(response.data.expires_in)
                const time_left=response.data.expires_in
                if(time_left > 0){
                    console.log('time remain')
                    setIsLoggedIn(true)
                }else{
                    setIsLoggedIn(false)
                    sessionStorage.removeItem('token')
                }
            }
        ).catch(error => {
            console.log('error')
            console.log(error)
        })
    }

    const logoutAction=()=>{
        console.log('logoutAction')
        const token = sessionStorage.getItem('token')
        console.log(token)
        axios({
            method:'post',
            url:`/v1/user/logout`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`Bearer ${token}`
            },
            //body:`grant_type=authorization_code&client_id=${REST_API_KEY}$redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        }).then(
            response=>{
                console.log('logoutAction then')
                console.log(response)
                setIsLoggedIn(false)
                window.location.href='/'
            }
        )
    }

    return (
        <div id='header'>
            <div id='header-top'>
                <div id="logo">
                    <a href="/">
                        <img src={"/images/logo.png"}/>
                    </a>
                </div>
                <div id="util">
                    <ul>
                        <li>
                            {isLoggedIn===false? 
                            <a href="/login">통합허브시스템 로그인</a>:
                            <a onClick={logoutAction}>로그아웃</a>
                            }
                        </li>
                        <li>
                            <a href="/register">회원가입</a>
                        </li>
                        <li>
                            <a href="#">아이디찾기</a>
                        </li>
                        <li>
                            <a href="#">비밀번호찾기</a>
                        </li>
                        <li>
                            <a href="">통합회원인증</a>
                        </li>
                    </ul>
                </div>
                <div id="sns">
                    <a href="">
                        <img src={"/images/insta.png"}/>
                    </a>
                    <a href="/kakao">
                        <img src={"/images/kakao.png"}/>
                    </a>
                </div>
            </div>
            <div id='header-bottom'>
                <ul id="gnb">
                    <li>
                        <a href="">자료검색</a>
                        <div id="lnb-wrap">
                            <ul id="lnb">
                                <li>
                                    <a href="">자료검색</a>
                                </li>
                                <li>
                                    <a href="">신착자료</a>
                                </li>
                                <li>
                                    <a href="">대출베스트</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="">평생교육</a>
                        <div id="lnb-wrap">
                            <ul id="lnb">
                                <li>
                                    <a href="">강좌소개</a>
                                </li>
                                <li>
                                    <a href="">수강신청</a>
                                </li>
                                <li>
                                    <a href="">평생교육정보센터</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="">독서문화행사</a>
                        <div id="lnb-wrap">
                            <ul id="lnb">
                                <li>
                                    <a href="">독서문화행사</a>
                                </li>
                                <li>
                                    <a href="">온라인 독서문화행사</a>
                                </li>
                                <li>
                                    <a href="">독서회</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="">열린공간</a>
                        <div id="lnb-wrap">
                            <ul id="lnb">
                                <li>
                                    <a href="#">공지사항</a>
                                </li>
                                <li>
                                    <a href="#">이달의행사</a>
                                </li>
                                <li>
                                    <a href="#">자주묻는질문</a>
                                </li>
                                <li>
                                    <a href="#">묻고답하기</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="">정보공개</a>
                        <div id="lnb-wrap">
                            <ul id="lnb">
                                <li>
                                    <a href="#">입찰정보</a>
                                </li>
                                <li>
                                    <a href="#">수의계약내역공개</a>
                                </li>
                                <li>
                                    <a href="#">학교장터(S2B)</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="">도서관안내</a>
                        <div id="lnb-wrap">
                            <ul id="lnb">
                                <li>
                                    <a href="#">인사말</a>
                                </li>
                                <li>
                                    <a href="#">일반현황</a>
                                </li>
                                <li>
                                    <a href="#">이용안내</a>
                                </li>
                            </ul>  
                        </div>
                    </li>
                    <li>
                        <a href="">나의도서관</a>
                        <div id="lnb-wrap">
                            <ul id="lnb">
                                <li>
                                    <a href="">대출현황</a>
                                </li>
                                <li>
                                    <a href="">예약현황</a>
                                </li>
                                <li>
                                    <a href="">희망도서 신청현황</a>
                                </li>
                            </ul>  
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default React.memo(Header);