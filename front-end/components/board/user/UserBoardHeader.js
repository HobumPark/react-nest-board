
import '../../../css/board/user/UserBoardHeader.css';
import UserBoard from './UserBoard';

function UserBoardHeader(props) {
    const result = props.userBoardHeader.map(
        (data)=>(<UserBoard key={data.no}
        no={data.no} title={data.title} writer={data.writer}
        write_date={data.write_date} attach={data.attach} hits={data.hits}/>)
    )
    return (
        <div id='user-board-header'>
            {result}
        </div>
    )
}

export default UserBoardHeader;