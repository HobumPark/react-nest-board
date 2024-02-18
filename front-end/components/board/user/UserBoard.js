


import '../../../css/board/user/UserBoard.css';

function UserBoard(props) {
    return (
        <div id='user-board'>
            <span id="no">
                {props.no}
            </span>
            <span id="title">
                <a href={`/view?no=${props.no}`}>
                    {props.title}
                </a>
            </span>
            <span id="writer">
                {props.writer}
            </span>
            <span id="write-date">
                {props.write_date}
            </span>
            <span id="attach">
                {props.attach}
            </span>
            <span id="hits">
                {props.hits}
            </span>
        </div>
    )
}

export default UserBoard;