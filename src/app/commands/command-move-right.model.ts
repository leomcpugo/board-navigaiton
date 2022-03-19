import { Board } from "../models/board.model";
import { PlayerActionType } from "../models/player.model";
import { CommandBase } from "./command-base.model";

export class CommandMoveRight extends CommandBase {
    constructor(
        private readonly board: Board
    ) {
        super();
    }

    public get type(): PlayerActionType { return PlayerActionType.MOVE_RIGHT; }

    public CanExecute(): boolean {
        const playerInfo = this.board.getPlayerInfo();
        const newYCoordinate = playerInfo.y + 1;

        return newYCoordinate < this.board.tiles[playerInfo.x].length;
    }

    public Execute() {
        const playerInfo = this.board.getPlayerInfo();
        const newYCoordinate = playerInfo.y + 1;

        if (newYCoordinate >= this.board.tiles[playerInfo.x].length) return;

        this.board.tiles[playerInfo.x][playerInfo.y].content = null
        this.board.tiles[playerInfo.x][newYCoordinate].content = playerInfo.player;
    }

    public Revert() {
        const playerInfo = this.board.getPlayerInfo();
        const newYCoordinate = playerInfo.y - 1;
        this.board.tiles[playerInfo.x][playerInfo.y].content = null
        this.board.tiles[playerInfo.x][newYCoordinate].content = playerInfo.player;
    }
}