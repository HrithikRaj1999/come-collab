import React, { useCallback, useEffect, useState } from "react";
import { useBroadcastEvent, useEventListener, useMyPresence } from "@/liveblocks.config";
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/types";
import useInterval from "./useInterval";

const useLiveCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>({ mode: CursorMode.Hidden });
  const [reactions, setReactions] = useState<Reaction[]>([])
  const [{ cursor }, updateMyPresence] = useMyPresence() as any
  const boardcast = useBroadcastEvent()
  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent
    setReactions((reaction) => reaction.concat([
      {
        value: event.value,
        timestamp: Date.now(),
        point: { x: event.x, y: event.y }
      }
    ])
    )
  })
  useInterval(() => {
    if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      setReactions((reaction) => reaction.concat([
        {
          value: cursorState.reaction,
          timestamp: Date.now(),
          point: { x: cursor.x, y: cursor.y }
        }
      ])
      )
      boardcast({
        x: cursor.x, y: cursor.y, value: cursorState.reaction
      })
    }
  }, 200)
 //clear when the emojis are older than 4000
  useInterval(()=>{
    setReactions((reaction)=>reaction.filter((r)=>r.timestamp>Date.now()-4000))
  },1000)
  const setCurrReactions = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false })
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    if (cursor === null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction ?
        { ...state, isPressed: true }
        : state)
  }, [cursorState.mode, setCursorState])

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction
        ?
        { ...state, isPressed: true }
        :
        state)
  }, [cursorState.mode, setCursorState]);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          //@ts-ignore
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        setCursorState({
          mode: CursorMode.Chat,
          //@ts-ignore
          previousMessage: null,
          message: "",
        });
      }
    };
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);
  return [
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
  ];
};

export default useLiveCursor;
