import { useEffect, useState } from 'react'
import './index.css'
import Socket from '../socket'

function Body() {
    const socket = Socket()

    const [gameLevel, setGameLevel] = useState<number>()
    const [gameVerifications, setGameVerifications] = useState<number>(12)
    const [verifyEnabled, setVerifyEnabled] = useState<boolean>(false)
    const [gameMessage, setGameMessage] = useState<string>()
    const [tileSet, setTileSet] = useState<Array<Array<string>>>([])

    useEffect(() => {
        const gameLevel = localStorage.getItem('game_level')

        if (gameLevel) {
            reset(parseInt(gameLevel))
        } else {
            reset(1)
        }
    }, [])

    useEffect(() => {
        if (socket && socket.lastMessage) {
            setGameMessage(' ')
            switch (socket.lastMessage.data) {
                case 'verify: Only 10 verifications allowed per attempt.':
                    setGameMessage('Game over.')
                    break
                case 'verify: Incorrect.':
                    setGameMessage(`Incorrect!`)
                    break
                case 'new: OK':
                    socket.sendMessage('map')
                    break
                default:
                    if (socket.lastMessage.data.search(/verify: Correct!/) > -1) {
                        reset((gameLevel ?? 1) + 1)
                    }
                    else if (socket.lastMessage.data.search(/map:\n/) > -1) {
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
        setGameMessage('Loading...')
        socket.sendMessage(`rotate ${x} ${y}`)
        socket.sendMessage('map')
        setVerifyEnabled(true)
    }

    const verify = () => {
        setGameMessage('Loading...')
        socket.sendMessage('verify')
        if (gameVerifications > 0) {
            setGameVerifications(gameVerifications - 1)
        }
    }

    const reset = (gamelevelReset?: number) => {
        if (!gamelevelReset) {
            gamelevelReset = gameLevel
        }
        setGameMessage('Loading...')
        socket.sendMessage(`new ${gamelevelReset}`)
        localStorage.setItem('game_level', '' + gamelevelReset)
        setGameLevel(gamelevelReset)
        setGameVerifications(12)
        setVerifyEnabled(false)
    }

    return (
        <>
            <div className="game-data">
                <div className="level">Level {gameLevel}</div>
                <div className="verifications">Verifications {gameVerifications}</div>
                {verifyEnabled && <button type="button" className="verify" onClick={() => verify()}>Verify</button>}
                <button type="button" className="reset" onClick={() => reset()}>Reset</button>
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

export default Body