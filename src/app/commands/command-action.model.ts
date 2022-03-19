import { Board } from "../models/board.model";
import { PlayerActionType } from "../models/player.model";
import { TileState } from "../models/tile.model";
import { CommandBase } from "./command-base.model";

export class CommandAction extends CommandBase {
    constructor(
        private readonly board: Board
    ) {
        super();
    }

    public get type(): PlayerActionType { return PlayerActionType.ACTION; }

    private previousState: TileState = TileState.EMPTY;

    public CanExecute(): boolean {
        const playerInfo = this.board.getPlayerInfo();
        return this.board.tiles[playerInfo.x][playerInfo.y].state === TileState.EMPTY;
    }

    public Execute() {
        const playerInfo = this.board.getPlayerInfo();
        this.previousState = this.board.tiles[playerInfo.x][playerInfo.y].state;
        this.board.tiles[playerInfo.x][playerInfo.y].state = TileState.PAINTED;
    }

    public Revert() {
        const playerInfo = this.board.getPlayerInfo();
        this.board.tiles[playerInfo.x][playerInfo.y].state = this.previousState;
    }
}