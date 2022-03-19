import { Component, HostListener, OnInit } from '@angular/core';
import { CommandAction } from './commands/command-action.model';
import { CommandBase } from './commands/command-base.model';
import { CommandMoveDown } from './commands/command-move-down.model';
import { CommandMoveLeft } from './commands/command-move-left.model';
import { CommandMoveRight } from './commands/command-move-right.model';
import { CommandMoveUp } from './commands/command-move-up.model';
import { Board } from './models/board.model';
import { Player, PlayerActionType } from './models/player.model';
import { Tile, TileState } from './models/tile.model';
import { BoardMasterService } from './services/board-master.service';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly boardMasterService: BoardMasterService,
  ) {

  }

  TileState = TileState;

  board: Board = new Board(1, 1);

  public get executedCommandList(): CommandBase[] {
    return this.boardMasterService.executedCommandList;
  }

  public get currentCommandIndex(): number {
    return this.boardMasterService.currentCommandIndex;
  }

  ngOnInit(): void {
    this.initBoard();
  }

  initBoard() {
    this.board = new Board(5, 6);
  }

  revertTo(index: number) {
    this.boardMasterService.goToCommand(index);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    let command: CommandBase | null = null;

    if ((event.ctrlKey || event.metaKey) && event.code === 'KeyZ') {
      this.boardMasterService.revert();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.code === 'KeyY') {
      this.boardMasterService.redo();
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        command = new CommandMoveUp(this.board);
        break;
      case 'ArrowDown':
        command = new CommandMoveDown(this.board);
        break;
      case 'ArrowLeft':
        command = new CommandMoveLeft(this.board);
        break;
      case 'ArrowRight':
        command = new CommandMoveRight(this.board);
        break;
      case ' ':
        command = new CommandAction(this.board);
        break;
      default:
        command = null;
        break;
    }

    if (command === null) return;

    this.boardMasterService.executeCommand(command);
  }
}
