export class GameTagDTO {
public Name: string;
public TagId: number;
public Enabled: boolean;

constructor(){
    this.Name= "";
    this.TagId= 0;
    this.Enabled= false;
  }
}
