import { Clue } from "./clue";
import { Row, RowState } from "./Row";
import { maxGuesses } from "./util";

export function About(props: { toaq: boolean }) {
  return (
    <div className="App-about">
      {props.toaq ? (
        <>
          <p>
            <i>mí Toaly</i> bı beokopı zé mí Wordle na ru no zé Tóaqzu.
          </p>
          <p>
            Leo sho jeıdua há sa shuı toa chà jîto há chìo sa bu huaq puı{" "}
            {maxGuesses} da.
            <br />
            Heq shúı toa sıa o'aomo (') da.
            <br />
            Cua jíoqkea tûshı jıto há cy sâ tua reomıa ja ke laı da.
          </p>
        </>
      ) : (
        <>
          <p>
            <i>mí Toaly</i> is a Wordle clone for{" "}
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
            Heq shúı toa sıa <b>tıtıeq</b> ra <b>oq'oguı</b> da.
          </p>
          <p>
            Due ke <b className={"green-bg"}>aq'anı</b> da!{" "}
            <b className={"green-bg"}>Aq'anı</b> saqko laı da.
            <br />
            <strong>(Daı heq shúı toa sa meaheo aq'anı da.)</strong>
          </p>
          <p>
            Nıe sa <b className={"yellow-bg"}>ıq'ırue</b> shúı toa <em>tì sa meaheo</em> da.
            <br />
            <strong>(Daı nıe sa puı máq da. 🤔)</strong>
          </p>
          <hr />
          <p>
            Tıu tıtua há ke <b className={"yellow-bg"}>ıq'irue</b> sa meaheo ba:
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
        annotation={props.toaq ? "Juı da!" : "So close!"}
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
        annotation={props.toaq ? "Aja!" : "Got it!"}
      />
    </div>
  );
}
