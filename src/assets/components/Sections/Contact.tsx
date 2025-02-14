export default function Contact() {
  return (
    <div className="pb-5">
      <button
        style={{ fontWeight: 650 }}
        onClick={() =>
          window.open(
            "mailto:firas.zaazaa@gmail.com?Subject=Prenons%20contact",
            "_blank"
          )
        }
        className="fs-1 border-white btn btn-dark text-white w-100 d-flex justify-content-center"
      >
        {" "}
        Prendre contact
      </button>
    </div>
  );
}
