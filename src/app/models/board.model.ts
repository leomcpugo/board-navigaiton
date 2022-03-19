import { Player } from "./player.model";
import { Tile, TileState } from "./tile.model";

export class Board {
    constructor(
        private readonly rows: number,
        private readonly columns: number,
    ) {
        this.tiles = [];

        for (let rIndex = 0; rIndex < rows; rIndex++) {
            this.tiles[rIndex] = [];
            for (let cIndex = 0; cIndex < columns; cIndex++) {
                this.tiles[rIndex][cIndex] = {
                    state: TileState.EMPTY,
                    content: null,
                };
            }
        }

        this.tiles[0][0].content = {};
    }

    public tiles: Tile[][] = [];

    getPlayerInfo(): { x: number, y: number, player: Player } {
        for (let rIndex = 0; rIndex < this.tiles.length; rIndex++) {
            const row = this.tiles[rIndex];
            for (let cIndex = 0; cIndex < row.length; cIndex++) {
                const tile = row[cIndex];
                if (tile.content) return {
                    x: rIndex,
                    y: cIndex,
                    player: tile.content
                }
            }
        }

        throw "No player found";
    }
}