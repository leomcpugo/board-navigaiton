import { TileContent } from "./tile.model";

export interface Player extends TileContent {

}

export enum PlayerActionType {
    MOVE_UP = 'MOVE_UP',
    MOVE_DOWN = 'MOVE_DOWN',
    MOVE_LEFT = 'MOVE_LEFT',
    MOVE_RIGHT = 'MOVE_RIGHT',
    ACTION = 'PAINT',
}