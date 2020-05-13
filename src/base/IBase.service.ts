export interface IBaseService<T> {
    
  findAll(): Promise<T[]>;
  get(id: number): Promise<T>;
  update(entity: T): Promise<T>;
  create(entity: T): Promise<T>;
  delete(id: number);
}