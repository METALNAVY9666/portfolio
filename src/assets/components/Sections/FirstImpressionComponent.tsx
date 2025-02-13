import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";
import { Typewriter } from "react-simple-typewriter";

interface DataSnippetProps {
  getUrl?: string;
  subText: string;
  delay: number;
  duration?: number;
  defaultValue?: number;
}

function DataSnippet({
  getUrl,
  subText,
  delay,
  duration = 0.7,
  defaultValue,
}: DataSnippetProps) {
  const [data, setData] = useState<number>(0);

  useEffect(() => {
    if (defaultValue) {
      setData(defaultValue);
    }
    console.log("get url : ", getUrl);
  }, [defaultValue]);

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      transition={{ delay, duration }}
      animate={{ scale: 1, opacity: 1 }}
      className="d-flex flex-column"
    >
      <motion.h4
        className="text-black d-flex justify-content-center"
        style={{ fontWeight: 750, fontSize: 50 }}
        initial={{ scale: 0.6, opacity: 0 }}
        transition={{ delay: delay + 0.3, duration }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {data}
      </motion.h4>
      <p className="text-secondary">
        <Typewriter words={[subText]} loop={1}></Typewriter>
      </p>
    </motion.div>
  );
}

export default function FirstImpression() {
  const snippets: DataSnippetProps[] = [
    {
      subText: "Années d'expérience",
      delay: 2.5,
      defaultValue: 3,
    },
    {
      subText: "Projets terminés",
      delay: 3.0,
      defaultValue: 3,
    },
    {
      subText: "Clients",
      delay: 3,
      defaultValue: 2,
    },
  ];

  return (
    <motion.div>
      <motion.h1
        initial={{ scale: 0.6, opacity: 0 }}
        transition={{ delay: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-white mb-3"
        style={{ fontWeight: 750, fontSize: isBrowser ? 75 : 50 }}
      >
        Le développeur Full-Stack qu'il vous faut est ici.
      </motion.h1>
      <motion.h3
        initial={{ scale: 0.6, opacity: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-secondary mb-3"
        style={{ fontWeight: 650, fontSize: isBrowser ? 40 : 30 }}
      >
        Apps web sur mesure, CRM, API, automations & déploiement sécurisé.
      </motion.h3>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 2.1, duration: 0.7 }}
        className="overflow-hidden d-flex justify-content-center"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 2.8, duration: 0.7 }}
          className="bg-white rounded-4 overflow-hidden d-flex justify-content-evenly mx-2"
        >
          {snippets.map((snippet, index) => (
            <DataSnippet
              key={`dataSnippet-${index}`}
              getUrl={snippet.getUrl}
              subText={snippet.subText}
              delay={2 + index}
              duration={0.3}
              defaultValue={snippet.defaultValue}
            ></DataSnippet>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
