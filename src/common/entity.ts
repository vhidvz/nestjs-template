export class Entity {
  public _id?: string;

  public tags?: string[];

  public groups?: string[];
  public partners?: string[];

  public createdAt: Date;
  public createdBy: string;

  public updatedAt?: Date;
  public updatedBy?: string;

  public deletedAt?: Date;
  public deletedBy?: string;

  public restoredAt?: Date;
  public restoredBy?: string;

  constructor(entity?: Partial<Entity>) {
    this.createdBy = entity?.createdBy ?? 'system';
    this.createdAt = entity?.createdAt ?? new Date();

    if (entity.tags) this.tags = entity.tags;

    if (entity.groups) this.groups = entity.groups;
    if (entity.partners) this.partners = entity.partners;

    if (entity.updatedAt) this.updatedAt = entity.updatedAt;
    if (entity.updatedBy) this.updatedBy = entity.updatedBy;

    if (entity.deletedAt) this.deletedAt = entity.deletedAt;
    if (entity.deletedBy) this.deletedBy = entity.deletedBy;

    if (entity.restoredAt) this.restoredAt = entity.restoredAt;
    if (entity.restoredBy) this.restoredBy = entity.restoredBy;
  }
}
