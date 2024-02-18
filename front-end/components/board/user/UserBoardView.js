

import '../../../css/board/user/UserBoardView.css';
import {useEffect,useState} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import {format} from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function UserBoardView() {

    const [userBoard,setUserBoard]=useState('')
    const [no,setNo]=useState('')
    const [edit,setEdit]=useState(false)
    const [title,setTitle]=useState('')
    const [contents,setContents]=useState('')

    useEffect(()=>{
        console.log('useEffect')
        console.log('UserBoardView')
        
        const query=window.location.search
        const queryObj=queryString.parse(query)
        const no = queryObj.no
        setNo(no)
        getUserBoardByNo(no)
    },[])

    const getUserBoardByNo=async(no)=>{
        await axios.get(`/board/user/view?no=${no}`)
        .then(response=>{
            console.log(response)
            const time = format(new Date(response.data.reg_date), 'yyyy-MM-dd')
            response.data.reg_date=time
            const title = response.data.title
            const contents = response.data.contents
            setTitle(title)
            setContents(contents)
            setUserBoard(response.data)
        })
        .catch(error=>{
            console.log(error)
        })   
    }

    const updateUserBoard=async()=>{
        alert('수정!')
        if(edit===true){//클릭시 수정가능상태면
            if(title==='' || contents===''){
                alert('제목과 내용을 입력하세요!')
                return
            }else{
                userBoard.title=title
                userBoard.contents=contents
                setUserBoard(userBoard)
                await axios.put(`/board/user?no=${no}`,userBoard)
                .then(response=>{
                    console.log(response)
                    window.location.href='/'
                })
                .catch(error=>{
                    console.log(error)
                })    
            }
        }
        setEdit(!edit)
    }

    const deleteUserBoard=async()=>{
        alert('삭제!')
        
        await axios.delete(`/board/user?no=${no}`)
        .then(response=>{
            console.log(response)
            window.location.href='/'
        })
        .catch(error=>{
            console.log(error)
        })   
    }
    if(edit===false){

        return (
            <div id='user-board-view'>
            <div id='user-board-head'>
                    <div id='user-board-title'>
                        <span>{userBoard.title}</span>
                    </div>
                    <div id='user-board-other'>
                        <ul>
                            <li>
                                <span>작성자</span>
                                <span>{userBoard.writer}</span>
                            </li>
                            <li>
                                <span>등록일</span>
                                <span>{userBoard.write_date}</span>
                            </li>
                            <li>
                                <span>조회수</span>
                                <span>{userBoard.hits}</span>
                            </li>
                        </ul>
                        <div id='btn-area'>
                            <button onClick={updateUserBoard}>수정</button>
                            <button onClick={deleteUserBoard}>삭제</button>
                        </div>
                    </div>
            </div>
            <div id='user-board-contents'>
                    <div id='user-board-contents-inner'>
                        {userBoard.contents}
                    </div>
            </div>
            </div>
        )
    }else{
        return (
            <div id='user-board-view'>
               <div id='user-board-head'>
                    <div id='user-board-title'>
                        <span id='user-board-title-edit'>
                            <input type='text' defaultValue={userBoard.title} 
                            onChange={(e)=>setTitle(e.target.value)}/>    
                        </span>
                    </div>
                    <div id='user-board-other'>
                        <ul>
                            <li>
                                <span>작성자</span>
                                <span>{userBoard.writer}</span>
                            </li>
                            <li>
                                <span>등록일</span>
                                <span>{userBoard.reg_date}</span>
                            </li>
                            <li>
                                <span>조회수</span>
                                <span>{userBoard.hits}</span>
                            </li>
                        </ul>
                        <div id='btn-area'>
                            <button onClick={updateUserBoard}>등록</button> 
                        </div>
                    </div>
               </div>
               <div id='user-board-contents'>
                    <div id='user-board-contents-inner'>
                        <ReactQuill  style={{height: "500px"}} 
                        theme="snow" defaultValue={userBoard.contents}
                        onChange={setContents}/>
                    </div>
               </div>
            </div>
        )
    }
}

export default UserBoardView;