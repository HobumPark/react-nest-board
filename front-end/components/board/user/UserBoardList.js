


import '../../../css/board/user/UserBoardList.css';
import UserBoard from './UserBoard';

function UserBoardList(props) {

    const boardWrite=()=>{
        window.location.href='/write'
    }

    const result = props.userBoardList.map(
        (data)=>(<UserBoard key={data.no}
            no={data.no} title={data.title}
            writer={data.writer} write_date={data.write_date}
            attach={data.attach} hits={data.hits}/>)
    )
    return (
        <div id='user-board-list'>
            {result}
            <button id='write-btn' onClick={boardWrite}>글쓰기</button>
        </div>
    )
}

export default UserBoardList;