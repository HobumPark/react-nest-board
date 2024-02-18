import { Controller,Get,Post,Put,Delete,Param,Body, Req, Query} from '@nestjs/common';
import { BoardService  } from './board.service';
import { BoardEntity } from './entities/board.entity';

@Controller('board/user')
export class BoardController {
  constructor(private readonly boardService: BoardService){}

  // http://localhost:4000/board/user/test
  @Get('/test')
  getAllBoardList(): Promise<BoardEntity[]> {
    console.log('/test');
    return this.boardService.findAll()
  }

  @Get('/count')
  getBoardCount(): Promise<number>{
    let count=this.boardService.count()
    return count
  }

  // http://localhost:4000/board/user?page=2
  @Get()
  getBoardList(@Query() query: { page: string }): Promise<BoardEntity[]> {
    console.log(query.page)
    console.log(typeof(query.page))
    
    const page=query.page
    const skip=(parseInt(page)-1)*10
    console.log(skip)
    console.log(typeof(skip))
    return this.boardService.findAndCount({
      order: {
      no: "DESC"
      },
      skip: skip,
      take: 10
    });
  }

  // http://localhost:4000/board/user/view
  @Get('/view')
  getBoardView(@Query() query: { no: string }): Promise<BoardEntity> {
    console.log('/view');
    console.log(query.no)
    return this.boardService.findOne(parseInt(query.no));
  }

  // http://localhost:4000/board/user
  // {"title":"제목222","contents":"내용222","author":"김철수","regDate":"2023-12-01","attach":"Y","hits":0}
  @Post()
  insertBoard(@Body() board: BoardEntity){
    console.log('insertBoard!');
    console.log(board);
    return this.boardService.create(board);
  }

  // http://localhost:4000/board/user?no=3
  // {"title":"수정된 제목!"}
  @Put()
  updateBoard(@Query() query: { no: string },@Body() board: BoardEntity){
    console.log('updateBoard!');
    const no=query.no
    return this.boardService.update(parseInt(no),board);
  }

  // http://localhost:4000/board/user?no=3
  @Delete()
  deleteBoard(@Query() query: { no: string }){
    console.log('deleteBoard!');  
    const no=query.no
    return this.boardService.delete(parseInt(no));
  }
}
