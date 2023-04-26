const APP_VISIBLE_EVENT_NAME = 'appVisible';

class State {
    private appVisible: boolean = false;
    private appVisibleEvent: Event = new Event(APP_VISIBLE_EVENT_NAME);
    events = {
        appVisible: APP_VISIBLE_EVENT_NAME,
    };

    constructor() {}

    setAppVisible(visible: boolean) {
        this.appVisible = visible;
        document.dispatchEvent(this.appVisibleEvent);
    }

    getAppVisible() {
        return this.appVisible;
    }
}

const state = new State();
export default state;