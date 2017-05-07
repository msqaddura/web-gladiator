import { ILeaf } from '../Core/ILeaf';
export interface IStrategy extends ILeaf{
    execute();
}