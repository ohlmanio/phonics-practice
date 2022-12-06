import { MutableRef, useEffect, useState } from "preact/hooks";
import { Letter } from "./alphabet.ts";
import { NoSay } from "./dictionary.ts";
import { soundManager } from "./soundManager.ts";

export default function Sound(
  { letter, player }: {
    letter: Letter;
    player?: MutableRef<undefined | (() => void | Promise<void>)>;
  },
) {
  useEffect(() => soundManager.preload(letter.slow), [letter.slow]);

  const onPlay = async () => {
    const promise = soundManager.play(letter.slow);
    setPlaying(true);

    const result = await promise;

    setPlaying(false);

    return result;
  };

  if (typeof player == "object") {
    player.current = onPlay;
  }

  const [playing, setPlaying] = useState(false);


  const fontClass = letter.letter == "I" ? " font-sans" : "font-sans";
  const playingClass = playing ? "text-red-500" : "hover:text-indigo-500";
  return (
    <div class={"flex flex-col " + fontClass + " " + "text-8xl"}>
      <div class="m-auto tracking-tight -mb-6">
        {letter.letter}
      </div>
      <div class={"m-auto cursor-pointer -mb-6 " + playingClass} onClick={onPlay}>
        •
      </div>
    </div>
  );
}

export function NoSaySound({ letter }: {
  letter: NoSay;
}) {
  return (
    <div class={"flex flex-col font-sans text-md"}>
      <div class="m-auto tracking-tight -mb-6">
        {letter.silent}
      </div>
      <div class={"m-auto"}>
        &nbsp;
      </div>
    </div>
  );
}