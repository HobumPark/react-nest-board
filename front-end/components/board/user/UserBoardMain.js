
import '../../../css/board/user/UserBoardMain.css';
import UserBoardHeader from './UserBoardHeader';
import UserBoardList from './UserBoardList';
import UserPagination from './UserPagination';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {format} from 'date-fns';

function UserBoardMain() {
    
    const [userBoardHeader,setUserBoardHeader]=useState([
        {no:'번호',title:'제목',writer:'작성자',reg_date:'등록일',attach:'첨부',hits:'조회'},
    ])

    const [userBoardList,setUserBoardList]=useState([])
    const [userBoardCount,setUserBoardCount]=useState(0)
    const [currentPage,setCurrentPage]=useState(1)
    const [boardCountPerPage,setBoardCountPerPage]=useState(10)
    
    useEffect(()=>{
        console.log('useEffect!')
        getFirstPage()
        getBoardCount()
    },[])

    const getFirstPage=async()=>{
        console.log('getFirstPage')
        const result = await axios.get('/board/user?page=1')
        console.log(result)
        console.log(result.data)
        const boardList = transFormDate(result.data)
        setUserBoardList(boardList)
    }
    const getBoardCount=async()=>{
        console.log('getBoardCount')

        await axios.get('/board/user/count')
        .then(response=>{
            setUserBoardCount(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const getCertainPage=async(page)=>{
        console.log('getCertainPage')

        await axios.get(`/board/user?page=${page}`)
        .then(response=>{
            const boardList = transFormDate(response.data)
            setUserBoardList(boardList)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const transFormDate=(userBoardList)=>{
        console.log('transFormDate')
        for(var i=0; i<userBoardList.length; i++){
            const time = format(new Date(userBoardList[i].reg_date), 'yyyy-MM-dd')
            console.log(time)
            userBoardList[i].write_date=time
        }
        return userBoardList
    }

    const movePage=(page)=>{
        getCertainPage(page)
        setCurrentPage(page)
    }

    return (
        <div id='user-board-main'>
            <UserBoardHeader userBoardHeader={userBoardHeader}/>
            <UserBoardList userBoardList={userBoardList}/>
            <UserPagination   total={userBoardCount}
                              boardCountPerPage={boardCountPerPage}
                              currentPage={currentPage}
                              movePage={movePage}/>
        </div>
    )
}

export default UserBoardMain;