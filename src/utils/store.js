import create from 'zustand';

export const useTransaction = create((set) => ({
    transaction: [],
    setTransaction: (transaction) => set({transaction}),
}));

export const useAccount = create((set) => ({
    account: [],
    setAccount: (account) => set({account}),
}));

export const useContract = create((set) => ({
    contract: [],
    setContract: (contract) => set({contract}),
}));

export const useTopic = create((set) => ({
    topic: [],
    setTopic: (topic) => set({topic}),
}));

export const useToken = create((set) => ({
    token: [],
    setToken: (token) => set({token}),
}));