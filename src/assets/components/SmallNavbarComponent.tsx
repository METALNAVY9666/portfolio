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
    <div className="bg-dark w-25 d-flex gap-3 justify-content-around py-2 rounded-5">
      {elements.map((element) => (
        <button
          className="btn"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={element.tooltip}
          key={`sm-navbar-${element.href}`}
          onClick={() => {
            document
              .querySelector(element.href)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <i className={`fs-5 text-white fa-solid fa-${element.icon}`}></i>
        </button>
      ))}
    </div>
  );
}
