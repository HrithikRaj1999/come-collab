import { useState } from 'react'
import LiveCursor from './cursor/LiveCursor'
import { useOthers } from '@/liveblocks.config'
import useLiveCursor from '@/hooks/cursor/useLiveCursor'
import CursorChat from './cursor/CursorChat'
import { CursorMode } from '@/types/types'

//collections of live functionality
const Live = () => {
    const others = useOthers()
    const [handlePointerMove, handlePointerLeave, handlePointerDown, updateMyPresence,cursor, cursorState, setCursorState] = useLiveCursor()

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            // onPointerUp={handlePointerUp}
            className="h-[100vh] w-full flex justify-center items-center text-center"
        >
            <h1 className='text-5xl text-white'>Live Collaboration application</h1>
            <LiveCursor others={others} />
            {cursor ? <CursorChat {...{ cursor, cursorState, setCursorState, updateMyPresence }} /> : null}

        </div>
    )
}

export default Live