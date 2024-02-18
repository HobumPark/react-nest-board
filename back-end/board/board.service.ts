import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BoardEntity } from './entities/board.entity';
import {ReadBoardDto} from './dto/ReadBoardDto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>
  ) {}


  async findAll(): Promise<ReadBoardDto[]> {
    const boards= await this.boardRepository.find();
    return boards.map(board => this.mapToDto(board));
  }

  async count(): Promise<number> {
    const len= await this.boardRepository.count();
    return len
  }

  async findAndCount(p:Object): Promise<ReadBoardDto[]> {
    console.log(p)
    try{
      const [boards,count]= await this.boardRepository.findAndCount(p);
      console.log(boards)
      console.log(count)
      return boards.map(board => this.mapToDto(board));
    }catch (error) {
      console.error('Error in findAndCount:', error);
      throw error; // Optional: rethrow the error for better debugging
    }
    
  }

  async findOne(no:number): Promise<BoardEntity> {
    return this.boardRepository.findOneBy({'no':no});
  }


  async create(board:BoardEntity) {
    //{"no":40,"title":"제목222","contents":"내용222","author":"김철수","regDate":"2023-12-01","attach":"Y","hits":0}
    console.log(board);
    const newBoard = this.boardRepository.create(board);
    return this.boardRepository.save(newBoard);
    //위 코드에서 create 메서드는 새로운 BoardEntity 인스턴스를 생성하고, 
    //save 메서드를 사용하여 데이터베이스에 저장합니다. 
    //이것이 일반적인 게시글 추가의 패턴입니다. 그리고 반환 값으로는 저장된 엔터티가 반환됩니다.
  }

  async update(no:number,updatedData:BoardEntity){
    const board = await this.boardRepository.findOneBy({'no':no});

    if (!board) {
      throw new NotFoundException(`Board with no ${no} not found`);
    }

    // 찾은 게시글의 데이터를 업데이트합니다.
    Object.assign(board, updatedData);

    // 업데이트된 게시글을 저장하고 반환합니다.
    return await this.boardRepository.save(board);
  }

  async delete(no:number){
    const board = await this.boardRepository.findOneBy({'no':no});

    if (!board) {
      throw new NotFoundException(`Board with no ${no} not found`);
    }

    // 찾은 게시글을 삭제합니다.
    await this.boardRepository.remove(board);
  }

  private mapToDto(board): ReadBoardDto {
    // 여기에서 Entity에서 필요한 데이터만 추출하여 DTO로 매핑하는 로직을 추가합니다.
    return {
      no: board.no,
      title: board.title,
      contents:board.contents,
      author:board.author,
      reg_date:board.reg_date,
      attach:board.attach,
      hits:board.hits
    };
  }
} 