const APP_VISIBLE_EVENT_NAME = 'appVisible';

type UserData = {
    bio: string;
    email: string;
    id: string;
    name: string;
    username: string;
    token: string;
}
class State {
    private _appVisible: boolean;
    private _appVisibleEvent: Event;

    private _connectionName: string | undefined;
    private _connectionInfo: string;

    private _userData: UserData | undefined;

    events = {
        appVisible: APP_VISIBLE_EVENT_NAME,
    };

    constructor() {
        this._appVisible = false;
        this._appVisibleEvent = new Event(APP_VISIBLE_EVENT_NAME);
        
        this._connectionName = undefined;
        this._connectionInfo = "";

        this._userData = undefined;
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

    public get userData(): UserData | undefined {
        return this._userData;
    }

    public set userData(data: UserData | undefined) {
        this._userData = data;
    }
}

const state = new State();
export default state;