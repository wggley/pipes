import useWebSocket from 'react-use-websocket'

function Socket() {
    const { lastMessage, sendMessage } = useWebSocket('wss://hometask.eg1236.com/game-pipes/', {
        onOpen: () => console.log(`Connected to App WS`),
        onMessage: () => {
            if (lastMessage) {
                console.log(lastMessage)
            }
        },
        onError: (event) => {
            console.error(event)
        },
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 3000
    })

    return {
        lastMessage,
        sendMessage
    }
}

export default Socket