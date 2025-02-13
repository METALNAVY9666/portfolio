import { motion } from "framer-motion";
import { colors } from "../basics";
import skills from "../../data/skills.json";
import { Typewriter } from "react-simple-typewriter";

interface Skill {
  text: string;
  icon: string;
  href?: string;
  colorStart?: string;
  colorEnd?: string;
}

export default function Stack() {
  return (
    <div>
      <motion.h2 className="d-flex justify-content-center text-white mt-3 fs-1">
        Compétences
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.7 }}
        className="d-flex flex-wrap justify-content-center mt-2"
      >
        {(skills as Skill[]).map((skill, index) => (
          <motion.button
            key={`skill-${index}`}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 3.5 + index * 0.2, duration: 0.5 }}
            className="m-2"
            style={{
              width: 150,
              height: 150,
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "none",
            }}
            onHoverStart={() => ({ scale: 1.2 })}
            onHoverEnd={() => ({ scale: 1 })}
            onClick={() => window.open(skill.href, "_blank")}
          >
            <div
              style={{
                background: `linear-gradient(to right, ${
                  skill.colorStart ? skill.colorStart : colors[0]
                }, ${skill.colorEnd ? skill.colorEnd : colors[1]})`,
              }}
              className="rounded-2 text-white w-100 h-100 border"
            >
              <i
                style={{ fontWeight: 600, fontSize: 80 }}
                className={`pt-4 d-flex justify-content-center ${skill.icon}`}
              ></i>
              <p className="d-flex justify-content-center">
                <Typewriter words={[skill.text]} loop={1}></Typewriter>
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
