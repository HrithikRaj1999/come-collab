import LiveCursor from './cursor/LiveCursor'
import { useOthers } from '@/liveblocks.config'
import useLiveCursor from '@/hooks/cursor/useLiveCursor'
import CursorChat from './cursor/CursorChat'
import ReactionSelector from './reaction/ReactionButton'
import { CursorMode, Reaction } from '@/types/types'
import FlyingReaction from './reaction/FlyingReaction'

//collections of live functionality
const Live = () => {
    const others = useOthers()
    const [handlePointerMove,
        handlePointerLeave,
        handlePointerDown,
        setReactions,
        setCursorState,
        handlePointerUp,
        setCurrReactions,
        updateMyPresence,
        cursor,
        cursorState,
        reactions,] = useLiveCursor()

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="h-[100vh] w-full flex justify-center items-center text-center"
        >
            <h1 className='text-5xl text-white'>Live Collaboration application</h1>
            <LiveCursor others={others} />
            {reactions?.map((reaction:Reaction) => (
                <FlyingReaction
                    key={reaction.timestamp.toString()}
                    x={reaction.point.x}
                    y={reaction.point.y}
                    timestamp={reaction.timestamp}
                    value={reaction.value} />
            ))}
            {cursor ? <CursorChat {...{ cursor, cursorState, setCursorState, updateMyPresence }} /> : null}

            {cursorState.mode == CursorMode.ReactionSelector ? (
                <ReactionSelector {...{ setCurrReactions }} />
            ) : null}

        </div>
    )
}

export default Live