import "./App.css";
import { maxGuesses, seed, urlParam } from "./util";
import Game from "./Game";
import { useEffect, useState } from "react";
import { About } from "./About";

function useSetting<T>(
  key: string,
  initial: T
): [T, (value: T | ((t: T) => T)) => void] {
  const [current, setCurrent] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (e) {
      return initial;
    }
  });
  const setSetting = (value: T | ((t: T) => T)) => {
    try {
      const v = value instanceof Function ? value(current) : value;
      setCurrent(v);
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (e) {}
  };
  return [current, setSetting];
}

const todaySeed = new Date().toISOString().replace(/-/g, "").slice(0, 8);

function App() {
  type Page = "game" | "about" | "settings";
  const [page, setPage] = useState<Page>("game");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useSetting<boolean>("dark", prefersDark);
  const [colorBlind, setColorBlind] = useSetting<boolean>("colorblind", false);
  const [difficulty, setDifficulty] = useSetting<number>("difficulty", 0);
  const [keyboard, setKeyboard] = useSetting<string>(
    "keyboard",
    "qwertyuiop-asdfghjkl'-BzxcvbnmE"
  );
  const [enterLeft, setEnterLeft] = useSetting<boolean>("enter-left", false);
  const [toaq, setToaq] = useSetting<boolean>("toaq", true);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    if (urlParam("today") !== null || urlParam("todas") !== null) {
      document.location = "?seed=" + todaySeed;
    }
    setTimeout(() => {
      // Avoid transition on page load
      document.body.style.transition = "0.3s background-color ease-out";
    }, 1);
  }, [dark]);

  const link = (emoji: string, label: string, page: Page) => (
    <button
      className="emoji-link"
      onClick={() => setPage(page)}
      title={label}
      aria-label={label}
    >
      {emoji}
    </button>
  );

  return (
    <div
      lang={toaq ? "art-toaq" : "en"}
      className={"App-container" + (colorBlind ? " color-blind" : "")}
    >
      <h1>mí Toaly</h1>
      <div className="top-right">
        {page !== "game" ? (
          link("❌", toaq ? "Tua poa" : "Close", "game")
        ) : (
          <>
            {link("❓", toaq ? "Sóakue" : "About", "about")}
            {link("⚙️", toaq ? "Settings" : "Cíoqtoq", "settings")}
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 5,
          visibility: page === "game" ? "visible" : "hidden",
        }}
      >
        <a href={seed ? "?random" : "?seed=" + todaySeed}>
          {toaq ? (seed ? "Neq" : "Po níchaq") : seed ? "Random" : "Today's"}
        </a>
      </div>
      {page === "about" && <About toaq={toaq} />}
      {page === "settings" && (
        <div className="Settings">
          <div className="Settings-setting">
            <label htmlFor="language-setting">Zu / Language:</label>
            <select
              name="language-setting"
              id="language-setting"
              value={toaq ? "toaq" : "english"}
              onChange={(e) => setToaq(e.target.value === "toaq")}
            >
              <option value="toaq">Toaqzu</option>
              <option value="english">English</option>
            </select>
          </div>
          <hr />
          <div className="Settings-setting">
            <input
              id="dark-setting"
              type="checkbox"
              checked={dark}
              onChange={() => setDark((x: boolean) => !x)}
            />
            <label htmlFor="dark-setting">
              {toaq ? "Moy chóqteı" : "Dark theme"}
            </label>
          </div>
          <div className="Settings-setting">
            <input
              id="colorblind-setting"
              type="checkbox"
              checked={colorBlind}
              onChange={() => setColorBlind((x: boolean) => !x)}
            />
            <label htmlFor="colorblind-setting">
              {toaq ? "Huaq heocheo réo" : "High-contrast colors"}
            </label>
          </div>
          <div className="Settings-setting">
            <input
              id="difficulty-setting"
              type="range"
              min="0"
              max="2"
              value={difficulty}
              onChange={(e) => setDifficulty(+e.target.value)}
            />
            <div>
              <label htmlFor="difficulty-setting">
                {toaq ? "Noane:" : "Difficulty:"}
              </label>
              <strong>
                {toaq
                  ? ["Nefaı", "Noa", "Jaq Noa"][difficulty]
                  : ["Normal", "Hard", "Ultra Hard"][difficulty]}
              </strong>
              <div
                style={{
                  fontSize: 14,
                  height: 40,
                  marginLeft: 8,
                  marginTop: 8,
                }}
              >
                {toaq
                  ? [
                      `Duaı hêq mí Toadua tóa käı há hóa da.`,
                      `Po mí Wordle ga "Hard Mode" da. Duaı tîshue baq rıq laı, cy ru hêq baq lue laı tu sıe leotoa da.`,
                      `Huaq noa ní mí Noa da. Duaı bû tıshue baq lue laı lu rıaq hóa lûe máq, cy ru jûaoruo há pó rúı laı da.`,
                    ][difficulty]
                  : [
                      `Guesses must be valid dictionary (Toadua) words.`,
                      `Wordle's "Hard Mode". Green letters must stay fixed, and yellow letters must be reused.`,
                      `An even stricter Hard Mode. Yellow letters must move away from where they were clued, and gray clues must be obeyed.`,
                    ][difficulty]}
              </div>
            </div>
          </div>
          <div className="Settings-setting">
            <label htmlFor="keyboard-setting">
              {toaq ? "Pó dáokaıchuo ga tıteı:" : "Keyboard layout:"}
            </label>
            <select
              name="keyboard-setting"
              id="keyboard-setting"
              value={keyboard}
              onChange={(e) => setKeyboard(e.target.value)}
            >
              <option value="qwertyuiop-asdfghjkl'-BzxcvbnmE">QWERTY</option>
              <option value="azertyuiop'-qsdfghjklm-BwxcvbnE">AZERTY</option>
              <option value="qwertzuiop-asdfghjkl'-ByxcvbnmE">QWERTZ</option>
              <option value="B'pyfgcrlE-aoeuidhtns-qjkxbmwvz">Dvorak</option>
              <option value="qwfpgjluy-arstdhneio'-BzxcvbkmE">Colemak</option>
            </select>
            <input
              style={{ marginLeft: 20 }}
              id="enter-left-setting"
              type="checkbox"
              checked={enterLeft}
              onChange={() => setEnterLeft((x: boolean) => !x)}
            />
            <label htmlFor="enter-left-setting">
              {toaq ? "Lıo cíoq mï Koe" : '"Enter" on left side'}
            </label>
          </div>
        </div>
      )}
      <Game
        maxGuesses={maxGuesses}
        hidden={page !== "game"}
        difficulty={difficulty}
        colorBlind={colorBlind}
        keyboardLayout={keyboard.replaceAll(
          /[BE]/g,
          (x) => (enterLeft ? "EB" : "BE")["BE".indexOf(x)]
        )}
        toaq={toaq}
      />
    </div>
  );
}

export default App;
