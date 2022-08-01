import { useEffect, useState } from 'react'
import './index.css'
import Socket from '../socket'

function Body() {
    const socket = Socket()

    const [gameLevel, setGameLevel] = useState<string>()
    const [gameVerifications, setGameVerifications] = useState<number>(12)
    const [verifyEnabled, setVerifyEnabled] = useState<boolean>(false)
    const [gameMessage, setGameMessage] = useState<string>()
    const [tileSet, setTileSet] = useState<Array<Array<string>>>([])

    useEffect(() => {
        const gameLevel = localStorage.getItem('game_level')

        if (gameLevel) {
            socket.sendMessage(`new ${gameLevel}`)
            setGameLevel(gameLevel)
        } else {
            socket.sendMessage('new 1')
            localStorage.setItem('game_level', '1')
            setGameLevel('1')
        }
    }, [])

    useEffect(() => {
        if (socket && socket.lastMessage) {
            switch (socket.lastMessage.data) {
                case 'verify: Only 10 verifications allowed per attempt.':
                    setGameMessage('Game over.')
                    break
                case 'verify: Incorrect.':
                    setGameMessage(`Incorrect!`)
                    break
                case 'verify: Correct.':
                    setGameMessage('You won this level!')
                    break
                case 'new: OK':
                    socket.sendMessage('map')
                    break
                default:
                    if (socket.lastMessage.data.search(/map:\n/, '') > -1) {
                        let result = socket.lastMessage.data.replace(/map:\n/, '').split(/\n/)
                        result.pop()
                        setTileSet(result.map((x: string) => {
                            return x.split('')
                        }))
                    }
                    break
            }
        }
    }, [socket.lastMessage])

    const rotateTile = (x: number, y: number) => {
        socket.sendMessage(`rotate ${x} ${y}`)
        socket.sendMessage('map')
        setVerifyEnabled(true)
    }

    const verify = () => {
        socket.sendMessage('verify')
        if (gameVerifications > 0) {
            setGameVerifications(gameVerifications - 1)
        }
    }

    return (
        <>
            <div className="game-data">
                <div className="level">Level {gameLevel}</div>
                <div className="verifications">Verifications {gameVerifications}</div>
                {verifyEnabled && <button type="button" className="verify" onClick={() => verify()}>Verify</button>}
            </div>
            <div className="game-message">
                {gameMessage}
            </div>
            <div className={`tileset level-${gameLevel}`}>
                {tileSet.map((row, indexRow) => (
                    <div key={indexRow} className="row">
                        {row && row.map((tile, indexTile) => (
                            <div key={indexTile} className="tile" onClick={() => rotateTile(indexTile, indexRow)}>
                                {tile}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Body;
