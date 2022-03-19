import { Board } from "../models/board.model";
import { PlayerActionType } from "../models/player.model";
import { CommandBase } from "./command-base.model";

export class CommandMoveLeft extends CommandBase {
    constructor(
        private readonly board: Board
    ) {
        super();
    }

    public get type(): PlayerActionType { return PlayerActionType.MOVE_LEFT; }

    public CanExecute(): boolean {
        const playerInfo = this.board.getPlayerInfo();
        const newYCoordinate = playerInfo.y - 1;

        return newYCoordinate >= 0;
    }

    public Execute() {
        const playerInfo = this.board.getPlayerInfo();
        const newYCoordinate = playerInfo.y - 1;

        this.board.tiles[playerInfo.x][playerInfo.y].content = null
        this.board.tiles[playerInfo.x][newYCoordinate].content = playerInfo.player;
    }

    public Revert() {
        const playerInfo = this.board.getPlayerInfo();
        const newYCoordinate = playerInfo.y + 1;
        this.board.tiles[playerInfo.x][playerInfo.y].content = null
        this.board.tiles[playerInfo.x][newYCoordinate].content = playerInfo.player;
    }
}