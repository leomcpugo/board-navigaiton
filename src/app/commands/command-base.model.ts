import { PlayerActionType } from "../models/player.model";

export abstract class CommandBase {
    public abstract get type(): PlayerActionType;
    public abstract CanExecute(): boolean;
    public abstract Execute(): any;
    public abstract Revert(): any;
}