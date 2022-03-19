import { Injectable } from "@angular/core";
import { CommandBase } from "../commands/command-base.model";

@Injectable()
export class BoardMasterService {

    private readonly _executedCommandList: CommandBase[] = [];
    public get executedCommandList(): CommandBase[] {
        return [...this._executedCommandList];
    }

    private _currentCommandIndex: number = -1;
    public get currentCommandIndex(): number { return this._currentCommandIndex; }

    executeCommand(command: CommandBase) {
        if (!command.CanExecute()) return;

        command.Execute();

        this._currentCommandIndex++;
        this._executedCommandList.length = this._currentCommandIndex;
        this._executedCommandList.push(command);
    }

    revert() {
        if (this.currentCommandIndex < 0) return;

        const lastCommand = this._executedCommandList[this.currentCommandIndex];
        lastCommand.Revert();
        this._currentCommandIndex--;
    }

    redo() {
        const nextCommand = this.executedCommandList[this._currentCommandIndex + 1];
        if (!nextCommand) return;

        nextCommand.Execute();
        this._currentCommandIndex++;
    }

    goToCommand(index: number) {
        while (index != this.currentCommandIndex) {
            if (index > this.currentCommandIndex) {
                this.redo();
            } else {
                this.revert();
            }
        }
    }
}