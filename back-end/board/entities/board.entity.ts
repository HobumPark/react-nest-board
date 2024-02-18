import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'board' })
export class BoardEntity {

  @PrimaryGeneratedColumn({type:'int',name:'no'})
  no: number;

  @Column({type:'varchar',length:255,name:'title'})
  title: string;

  @Column({type:'varchar',length:255,name:'contents'})
  contents: string;

  @Column({name:'author'})
  author: string;

  @Column({name:'regDate'})
  reg_date: string;

  @Column({name:'attach'})
  attach: string;

  @Column({type:'int',name:'hits'})
  hits: number;
}