export interface Tile {
    state: TileState;
    content: TileContent | null;
}

export enum TileState {
    EMPTY = 'EMPTY',
    PAINTED = 'PAINTED',
}

export interface TileContent {

}