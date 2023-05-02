import state from "../state";

// get user data from page's local storage
type AuthModel = {
    bio: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    expand: Object;
    id: string;
    name: string;
    updated: string;
    username: string;
    verified: boolean;
};

const getUserData = () => {
    const userData = localStorage.getItem('pocketbase_auth');
    if (userData) {
        const { model, token }: { model: AuthModel, token: string } = JSON.parse(userData);
        chrome.storage.local.set({ userData: { ...model, token } });
        state.userData = { ...model, token };
    }
};
getUserData();
