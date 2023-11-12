import { Clue } from "./clue";
import { Row, RowState } from "./Row";
import { maxGuesses } from "./util";

export function About(props: { toaq: boolean }) {
  return (
    <div className="App-about">
      {props.toaq ? (
        <>
          <p>
            <i>Mí Toala</i> bï, heno Toaqno tá mí Wordle.
          </p>
          <p>
            Sá toa shuı nä, chıo pêı {maxGuesses}, ꝡä sheı jıto há, ꝡä jeı tóa kú hí.
            <br />
            Heq tóa shuı sía o'aomo (').
            <br />
            Ca tú ë jıto há sá, ꝡä sho reomıa ké laı.
          </p>
        </>
      ) : (
        <>
          <p>
            <i>mí Toala</i> is a Wordle clone for{" "}
            <a href="https://toaq.me">Toaq</a>, a constructed language.
          </p>
          <p>
            You get {maxGuesses} tries to guess a target word.
            <br />
            There is never an apostrophe (') in the target word.
            <br />
            After each guess, you get Mastermind-style feedback.
          </p>
        </>
      )}
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
      {props.toaq ? (
        <>
          <p>
            Heq tóa shuı sía <b>tıtıeq</b> ra <b>oq'oguı</b>.
          </p>
          <p>
            Due pó ké <b className={"green-bg"}>aq'anı</b> da!{" "}
            <b className={"green-bg"}>Aq'anı</b> láı kọsaq da.
            <br />
            <strong>(Daı juna, ꝡä heq tóa shuı sá hezo aq'anı da.)</strong>
          </p>
          <p>
            Nıe sá <b className={"yellow-bg"}>ıq'ırue</b> tóa shuı{" "}
            <em>tî sá heo</em> da.
            <br />
            <strong>(Daı juna, ꝡä nıe sá puı tóa da. 🤔)</strong>
          </p>
          <hr />
          <p>
            Tíu tıtua há ké <b className={"yellow-bg"}>ıq'irue</b> sá meaheo ba:
          </p>
        </>
      ) : (
        <>
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
            <b className={"yellow-bg"}>I</b> occurs <em>elsewhere</em> in the
            target word.
            <br />
            <strong>(Perhaps more than once. 🤔)</strong>
          </p>
          <hr />
          <p>
            Let's move the <b>I</b> in our next guess:
          </p>
        </>
      )}
      <Row
        rowState={RowState.LockedIn}
        wordLength={4}
        cluedLetters={[
          { clue: Clue.Absent, letter: "k" },
          { clue: Clue.Correct, letter: "ı" },
          { clue: Clue.Correct, letter: "a" },
          { clue: Clue.Correct, letter: "q" },
        ]}
        annotation={props.toaq ? "Juı ꝡeı!" : "So close!"}
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
        annotation={props.toaq ? "Kıta!" : "Got it!"}
      />
    </div>
  );
}
