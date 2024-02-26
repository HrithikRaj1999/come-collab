import LiveCursor from "./cursor/LiveCursor";
import { useOthers } from "@/liveblocks.config";
import useLiveCursor from "@/hooks/cursor/useLiveCursor";
import CursorChat from "./cursor/CursorChat";
import ReactionSelector from "./reaction/ReactionButton";
import { CursorMode, Reaction } from "@/types/types";
import FlyingReaction from "./reaction/FlyingReaction";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
};
//collections of live functionality
const Live = ({ canvasRef }: Props) => {
  const others = useOthers();
  const [
    handlePointerMove,
    handlePointerLeave,
    handlePointerDown,
    setReactions,
    setCursorState,
    handlePointerUp,
    setCurrReactions,
    updateMyPresence,
    cursor,
    cursorState,
    reactions,
  ] = useLiveCursor();

  return (
    <div
      id="canvas"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="h-[100vh] w-full flex justify-center items-center text-center"
    >
      <canvas ref={canvasRef} />
      <LiveCursor others={others} />

      {reactions?.map((reaction: Reaction) => (
        <FlyingReaction
          key={reaction.timestamp.toString()}
          x={reaction.point.x}
          y={reaction.point.y}
          timestamp={reaction.timestamp}
          value={reaction.value}
        />
      ))}
      {cursor ? (
        <CursorChat
          {...{ cursor, cursorState, setCursorState, updateMyPresence }}
        />
      ) : null}

      {cursorState.mode == CursorMode.ReactionSelector ? (
        <ReactionSelector {...{ setCurrReactions }} />
      ) : null}
    </div>
  );
};

export default Live;
