import GitHubCalendar from "react-github-calendar";
import { Typewriter } from "react-simple-typewriter";

export default function Projects() {
  return (
    <div className="text-white p-5">
      <h1 className="d-flex justify-content-center" style={{ fontWeight: 650 }}>
        <Typewriter words={["Projets"]} loop={1} />
      </h1>
      <GitHubCalendar
        username="METALNAVY9666"
        year={2025}
        weekStart={1}
      ></GitHubCalendar>
      <button
        onClick={() =>
          window.open("https://github.com/metalnavy9666", "_blank")
        }
        className="mt-2 w-100 fs-3 btn btn-dark border-white text-white"
      >
        Voir sur GitHub <i className="fa-brands fa-github"></i>
      </button>
    </div>
  );
}
