import React, { useCallback, useEffect, useState } from "react";
import { useMyPresence } from "@/liveblocks.config";
import { CursorMode } from "@/types/types";

const useLiveCursor = () => {
  const [cursorState, setCursorState] = useState({ mode: CursorMode.Hidden });
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

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
    updateMyPresence,
    cursor,
    cursorState,
    setCursorState,
  ];
};

export default useLiveCursor;
