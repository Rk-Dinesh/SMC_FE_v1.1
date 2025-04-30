export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],
  channels: [],
  p2p:[],
  isUploading: false,
  fileUploadProgress: 0,
  isDownloading: false,
  downloadProgress: 0,
  setIsUploading: (isUploading) => set({ isUploading }),
  setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }), 
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setDownloadProgress: (downloadProgress) => set({ downloadProgress }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setChannels: (channels) => set({ channels }),
  setP2p: (p2p) => set({ p2p }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  setDirectMessagesContacts: (directMessagesContacts) =>
    set({ directMessagesContacts }),
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipent
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  addChatMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "p2p"
              ? message.recipent
              : message.recipient._id,
          sender:
            selectedChatType === "p2p"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  addChannel: (channel) => {
    const channels = get().channels;
    set({ channels: [channel, ...channels] });
  },
  addP2P: (p2p) => {
    const p2pList = get().p2p;
    set({ p2p: [p2p, ...p2pList] });
  },
  addContactInDMContacts: (message) => {
    // console.log({ message });
    const userId = get().userInfo.id;
    const fromId =
      message.sender._id === userId
        ? message.recipient._id
        : message.sender._id;
    const fromData =
      message.sender._id === userId ? message.recipient : message.sender;
    const dmContacts = get().directMessagesContacts;
    const data = dmContacts.find((contact) => contact._id === fromId);
    const index = dmContacts.findIndex((contact) => contact._id === fromId);
    // console.log({ data, index, dmContacts, userId, message, fromData });
    if (index !== -1 && index !== undefined) {
      // console.log("in if condition");
      dmContacts.splice(index, 1);
      dmContacts.unshift(data);
    } else {
      // console.log("in else condition");
      dmContacts.unshift(fromData);
    }
    set({ directMessagesContacts: dmContacts });
  },
  addChannelInChannelLists: (message) => {
    const channels = get().channels;
    const data = channels.find((channel) => channel._id === message.channelId);
    const index = channels.findIndex(
      (channel) => channel._id === message.channelId
    );
    if (index !== -1 && index !== undefined) {
      channels.splice(index, 1);
      channels.unshift(data);
    }
  },
  addP2PInP2PLists: (message) => {
    const p2p = get().p2p;
    const data = p2p.find((p2p) => p2p._id === message.p2pId);
    const index = p2p.findIndex((p2p) => p2p._id === message.p2pId);
    if (index !== -1 && index !== undefined) {
      p2p.splice(index, 1);
      p2p.unshift(data);
    }
  },
});
