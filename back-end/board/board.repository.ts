import { BoardEntity } from './entities/board.entity';
import { DataSource } from 'typeorm';

export const boardRepository = [
  {
    provide: 'BOARD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BoardEntity),
    inject: ['DATA_SOURCE'],
  },
];