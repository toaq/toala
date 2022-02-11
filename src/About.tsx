import { Clue } from "./clue";
import { Row, RowState } from "./Row";
import { maxGuesses } from "./util";

export function About() {
  return (
    <div className="App-about">
      <p>
        <i>mí Toaly</i> is a Wordle clone for <a href="https://toaq.me">Toaq</a>
        , a constructed language.
      </p>
      <p>
        You get {maxGuesses} tries to guess a target word.
        <br />
        After each guess, you get Mastermind-style feedback.
      </p>
      <hr />
      <Row
        rowState={RowState.LockedIn}
        wordLength={4}
        cluedLetters={[
          { clue: Clue.Absent, letter: "t" },
          { clue: Clue.Absent, letter: "o" },
          { clue: Clue.Correct, letter: "a" },
          { clue: Clue.Elsewhere, letter: "ı" },
        ]}
      />
      <p>
        <b>T</b> and <b>O</b> aren't in the target word at all.
      </p>
      <p>
        <b className={"green-bg"}>A</b> is correct! The third letter is{" "}
        <b className={"green-bg"}>A</b>
        .<br />
        <strong>(There may still be a second A in the word.)</strong>
      </p>
      <p>
        <b className={"yellow-bg"}>I</b> occurs <em>elsewhere</em> in the target
        word.
        <br />
        <strong>(Perhaps more than once. 🤔)</strong>
      </p>
      <hr />
      <p>
        Let's move the <b>I</b> in our next guess:
      </p>
      <Row
        rowState={RowState.LockedIn}
        wordLength={4}
        cluedLetters={[
          { clue: Clue.Absent, letter: "k" },
          { clue: Clue.Correct, letter: "ı" },
          { clue: Clue.Correct, letter: "a" },
          { clue: Clue.Correct, letter: "q" },
        ]}
        annotation={"So close!"}
      />
      <Row
        rowState={RowState.LockedIn}
        wordLength={4}
        cluedLetters={[
          { clue: Clue.Correct, letter: "j" },
          { clue: Clue.Correct, letter: "ı" },
          { clue: Clue.Correct, letter: "a" },
          { clue: Clue.Correct, letter: "q" },
        ]}
        annotation={"Got it!"}
      />
    </div>
  );
}
