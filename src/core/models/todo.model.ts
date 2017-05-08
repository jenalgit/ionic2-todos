/**
 * Model for Todo
 * @class Todo
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class Todo {
  public title: string;
  public description: string;
  public createdAt: string;
  public lastModified: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.createdAt = new Date().toString();
    this.lastModified = this.createdAt;
  }
}
