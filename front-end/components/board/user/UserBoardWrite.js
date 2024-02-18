
import '../../../css/board/user/UserBoardWrite.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import  {useState,useEffect} from 'react';
import moment from 'moment';
import axios from 'axios';

function UserBoardWrite() {
    const [nickName,setNickName]=useState('')
    const [title,setTitle]=useState('')
    const [writer,setWriter]=useState('')
    const [contents,setContents]=useState('')

    useEffect(()=>{
        //getUserInfo()
    },[])

    const boardWrite=async()=>{
      alert(title)
      alert(writer)
      alert(contents)
      const nowTime = moment().format('YYYY-MM-DD');
      console.log(nowTime);

      const boardObj={title:title,contents:contents,writer:nickName
      ,write_date:nowTime,attach:'N',hits:0}
      boardWriteAction(boardObj)
      window.location.href='/'
    }

    const boardWriteAction=async(boardObj)=>{
        const result = await axios.post('/board/user/write',boardObj)
        console.log(result)
    }

    const getUserInfo=()=>{
        console.log('getUserInfo')
        const token = sessionStorage.getItem('token')
        axios({
            url:'/v2/user/me',
            method:'get',
            headers:{'Authorization':`Bearer ${token}`},
        }).then(
            res=>{
                console.log('getUserInfo')
                console.log(res)
                console.log(res.data.properties.nickname)
                setNickName(res.data.properties.nickname)
                //window.location.href=sessionStorage.getItem('page')
                //window.location.href='/'
            }
        )
    }

    const boardCancle=()=>{

    }

    return (
        <div id='user-board-write'>
            <div id='user-head'>
                <div id="title-label">
                    <span>
                        <b>*</b>제목
                    </span>
                </div>
                <div id="title-input">
                    <input type="text" 
                    onChange={(e)=>setTitle(e.target.value)}/>
                </div>
            </div>
            <div id='user-writer'>
                <div id="writer-label">
                    <span>
                        <b>*</b>작성자
                    </span>
                </div>
                <div id="writer-input">
                    <span>{nickName}</span>
                </div>
            </div>
            <div id='user-contents'>
                <div id="contents-label">
                    <span>
                        <b>*</b>글내용
                    </span>
                </div>
                <div id="contents-input">
                  <div id="contents-input-inner">
                    <ReactQuill  style={{height: "400px"}} 
                    theme="snow" onChange={setContents}/>
                    </div>
                </div>
            </div>
            <div id="btn-area">
              <div id="btn-area-inner">
                  <button id="register-btn"
                  onClick={boardWrite}>등록</button>
                  <button id="cancle-btn"
                  onClick={boardCancle}>취소</button>
              </div>  
            </div>
        </div>
    )
}

export default UserBoardWrite;