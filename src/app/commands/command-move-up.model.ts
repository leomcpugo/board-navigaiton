import { Board } from "../models/board.model";
import { PlayerActionType } from "../models/player.model";
import { CommandBase } from "./command-base.model";

export class CommandMoveUp extends CommandBase {
    constructor(
        private readonly board: Board
    ) {
        super();
    }

    public get type(): PlayerActionType { return PlayerActionType.MOVE_UP; }

    public CanExecute(): boolean {
        const playerInfo = this.board.getPlayerInfo();
        const newXCoordinate = playerInfo.x - 1;

        return newXCoordinate >= 0;
    }

    public Execute() {
        const playerInfo = this.board.getPlayerInfo();
        const newXCoordinate = playerInfo.x - 1;

        this.board.tiles[playerInfo.x][playerInfo.y].content = null
        this.board.tiles[newXCoordinate][playerInfo.y].content = playerInfo.player;
    }

    public Revert() {
        const playerInfo = this.board.getPlayerInfo();
        const newXCoordinate = playerInfo.x + 1;
        this.board.tiles[playerInfo.x][playerInfo.y].content = null
        this.board.tiles[newXCoordinate][playerInfo.y].content = playerInfo.player;
    }
}