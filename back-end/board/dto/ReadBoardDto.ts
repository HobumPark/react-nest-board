export class ReadBoardDto {
    no: number;
    title: string;
    contents: string;
    author:string;
    reg_date:string;
    attach:string;
    hits:number;

    constructor(no:number,title:string,contents:string,author:string,reg_date:string,attach:string,hits:number) {
        this.no = no;
        this.title = title;
        this.contents=contents;
        this.author=author;
        this.reg_date=reg_date;
        this.attach=attach;
        this.hits=hits;
    }
}