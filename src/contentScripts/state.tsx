const APP_VISIBLE_EVENT_NAME = 'appVisible';

type GenAPIReqBody = {
    user: {
        id: string;
        name: string;
        bio: string;
    };
    conn: {
        name: string;
        info: string;
    };
}

type GenAPIResBody = {
    message: string;
}

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

    private _connMsg: string;

    events = {
        appVisible: APP_VISIBLE_EVENT_NAME,
    };

    constructor() {
        this._appVisible = false;
        this._appVisibleEvent = new Event(APP_VISIBLE_EVENT_NAME);

        this._connectionName = undefined;
        this._connectionInfo = "";

        this._userData = undefined;

        this._connMsg = "";
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

    public get connMsg(): string {
        return this._connMsg;
    }

    public set connMsg(msg: string) {
        this._connMsg = msg;
    }

    public async genConnMsg(): Promise<string> {
        // don't generate message if we don't have all the data
        if (this._userData === undefined || this._connectionName === undefined || this._connectionInfo.length === 0) {
            console.log('genConnMsg() - invalid params');
            return "";
        }
        // generate message
        const data: GenAPIReqBody = {
            user: {
                id: this._userData.id,
                name: this._userData.name,
                bio: this._userData.bio,
            },
            conn: {
                name: this._connectionName,
                info: this._connectionInfo,
            }
        }
        const res = await fetch("https://app.reel.fyi/api/gen", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.status !== 200) {
            console.log(`error: ${res}`);
            return "";
        } else {
            const resBody: GenAPIResBody = await res.json();
            this._connMsg = resBody.message;
            return resBody.message;
        }
    }

    // resets the conn msg, conn name and info
    public resetConnState() {
        this._connMsg = "";
        this._connectionName = undefined;
        this._connectionInfo = "";
    }
}

const state = new State();
export default state;