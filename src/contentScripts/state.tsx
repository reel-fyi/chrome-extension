const APP_VISIBLE_EVENT_NAME = 'appVisible';

class State {
    private _appVisible: boolean;
    private _appVisibleEvent: Event;

    private _connectionName: string | undefined;
    private _connectionInfo: string;

    events = {
        appVisible: APP_VISIBLE_EVENT_NAME,
    };

    constructor() {
        this._appVisible = false;
        this._appVisibleEvent = new Event(APP_VISIBLE_EVENT_NAME);
        
        this._connectionName = undefined;
        this._connectionInfo = "";
    }

    public get appVisible(): boolean {
        return this._appVisible;
    }

    public set appVisible(visible: boolean) {
        this._appVisible = visible;
        document.dispatchEvent(this._appVisibleEvent);
    }

    public get connectionInfo(): string {
        return this._connectionInfo;
    }

    public set connectionInfo(info: string) {
        this._connectionInfo = info;
    }

    public get connectionName(): string | undefined {
        return this._connectionName;
    }

    public set connectionName(name: string | undefined) {
        this._connectionName = name;
    }
}

const state = new State();
export default state;