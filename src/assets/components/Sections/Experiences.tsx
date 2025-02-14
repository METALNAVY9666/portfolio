import { motion } from "framer-motion";
import experiences from "../../data/experiences.json";
import moment from "moment";
import { Typewriter } from "react-simple-typewriter";

interface Experience {
  business: string;
  url: string;
  position: string;
  icon: string | null;
  start_date: string; // format : DD-MM-YYYY
  end_date: string | null; // format : DD-MM-YYYY
  description: string | null;
}

export default function Experiences() {
  return (
    <div>
      <h2
        style={{ fontWeight: 650 }}
        className="text-white d-flex justify-content-center"
      >
        <Typewriter words={["Expériences"]} loop={1}></Typewriter>
      </h2>
      <div className="d-flex flex-column gap-2">
        {(experiences as Experience[])
          .sort(
            (a, b) =>
              moment(b.start_date, "DD-MM-YYYY").toDate().getTime() -
              moment(a.start_date, "DD-MM-YYYY").toDate().getTime()
          )
          .map((experience, index) => (
            <motion.div
              style={{ fontWeight: 650 }}
              className="bg-white border border-black rounded p-2"
              key={`exp-${index}`}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 3 + index / 2 }}
            >
              <motion.h2>
                <i
                  className={experience.icon ? experience.icon : undefined}
                ></i>{" "}
                {experience.position} avec{" "}
                <a
                  className="text-dark"
                  href={experience.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {experience.business}
                </a>
              </motion.h2>
              <motion.p>
                {experience.description
                  ? experience.description
                  : "Activité exacte confidentielle"}
              </motion.p>
              <motion.p>
                Début :{" "}
                {moment(experience.start_date, "DD-MM-YYYY")
                  .toDate()
                  .toLocaleDateString()}
              </motion.p>
              <motion.p>
                {experience.end_date
                  ? "Fin : " +
                    moment(experience.end_date, "DD-MM-YYYY")
                      .toDate()
                      .toLocaleDateString()
                  : "En cours"}
              </motion.p>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
