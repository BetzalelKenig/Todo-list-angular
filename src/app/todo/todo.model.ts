export class Todo {

  constructor(
    public id: string,
    public shortDescription: string,
    public description: string,
    public due: Date,
    public createAt: Date,
    public done: boolean
  ) {}
}
