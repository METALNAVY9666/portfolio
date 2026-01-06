import socials from "../../data/socials.json";

export default function Contact() {
  const mailInfo = socials.filter((social) => social.id === "mail")[0];

  return (
    <div className="pb-5">
      <button
        style={{ fontWeight: 650 }}
        onClick={() => window.open(mailInfo.href, "_blank")}
        className="fs-1 border-white btn btn-dark text-white w-100 d-flex justify-content-center"
      >
        {" "}
        Prendre contact
      </button>
    </div>
  );
}
