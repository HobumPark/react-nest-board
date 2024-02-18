
import '../../../css/board/user/UserPagination.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

function UserPagination(props) {
    const [isLoggedIn,setIsLoggedIn]=useState(false)

    useEffect(()=>{
        checkAccessToken()
    },[])

    const {total,boardCountPerPage,currentPage}=props
    const endPage = Math.ceil(total/boardCountPerPage)
    let pageNumbers=[]
    for(var i=1; i<=endPage; i++){
        pageNumbers.push(i)
    }
    console.log(pageNumbers)

    const result = pageNumbers.map(
        (page)=>(<span className={page===currentPage? 'active':''} 
            id="page" onClick={()=>pageClick(page)}>{page}</span>)
    )

    const pageClick=(page)=>{
        props.movePage(page)
    }

    const prevPage=()=>{
        const prevNo=currentPage-1
        if(prevNo < 1){
            return
        }
        props.movePage(prevNo)
    }
    const nextPage=()=>{
        const nextNo=currentPage+1
        const endPage=Math.ceil(total/boardCountPerPage)
        if(nextNo > endPage){
            return
        }
        props.movePage(nextNo)
    }

    const userBoardWrite=()=>{
        window.location.href='/write'
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

    return (
        <div id='user-pagination'>
            <div id='user-pagination-inner'>
                <span id="page" onClick={()=>prevPage()}>&lt;</span>
                {result}
                <span id="page" onClick={()=>nextPage()}>&gt;</span>
            </div>
            <div id='write-btn-area'>
                {
                    isLoggedIn===false?
                    '':<button onClick={userBoardWrite}>등록</button>
                }
            </div>
        </div>
    )
}

export default UserPagination;