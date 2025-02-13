import { isBrowser } from "react-device-detect";

export interface SmallNavbarElementProps {
  icon: string;
  tooltip: string;
  href: string;
}

interface SmallNavbarProps {
  elements: SmallNavbarElementProps[];
}

export function SmallNavbar({ elements }: SmallNavbarProps) {
  return (
    <div
      className={`border border-white bg-dark ${
        isBrowser ? "w-25" : ""
      } d-flex gap-3 justify-content-around py-2 rounded-5`}
    >
      {elements.map((element, index) => (
        <button
          className="btn btn-sm"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={element.tooltip}
          key={`sm-navbar-${index}`}
          onClick={() => {
            document
              .getElementById(element.href)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <i className={`fs-5 text-white fa-solid fa-${element.icon}`}></i>
        </button>
      ))}
    </div>
  );
}
