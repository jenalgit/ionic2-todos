/**
 * Model for Item
 * @class Item
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class Item {
  public title: string;
  public description: string;
  public createdAt: string;
  public lastModified: string;
  public completed: boolean = false;
  public completedAt: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.createdAt = new Date().toString();
    this.lastModified = this.createdAt;
  }
}
