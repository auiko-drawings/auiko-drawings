import React from "react";
import { useState } from "react";
import "./App.css";
import sk1 from "./assets/sk1.jpg";
import sk2 from "./assets/sk2.jpg";

const contentByFields = {
  maths: [
    {
      fieldName: { en: "maths", es: "mates", fr: "maths" },
      fieldImg: sk1,
    },
    {
      name: { en: "unit circle", es: "circulo unidad", fr: "cercle unitaire" },
      img: sk1,
      text: {
        en: "unit circle : this is what...",
        es: "esto es lo que ...",
        fr: "ca c'est...",
      },
    },
    {
      name: { en: "angles", es: "ángulos", fr: "angles" },
      img: sk2,
      text: {
        en: "this is text",
        es: "esto es",
        fr: "ca c'est",
      },
    },
  ],
  anatomy: [
    {
      fieldName: { en: "anatomy", es: "anatomía", fr: "colores" },
      fieldImg: sk1,
    },
    {
      name: { en: "anatomy", es: "anatomía", fr: "anatomie" },
      img: sk1,
      text: {
        en: "this is text",
        es: "esto es",
        fr: "ca c'est",
      },
    },
  ],
  perspective: [
    {
      fieldName: { en: "perspective", es: "perspectiva", fr: "perspective" },
      fieldImg: sk1,
    },
    {
      name: { en: "maths", es: "mates", fr: "maths" },
      img: sk2,
      text: {
        en: "this is text",
        es: "esto es",
        fr: "ca c'est",
      },
    },
  ],
  colors: [
    {
      fieldName: { en: "colors", es: "colores", fr: "couleurs" },
      fieldImg: sk1,
    },
    {
      name: { en: "colors cmy", es: "cmy", fr: "cmy" },
      img: sk1,
      text: {
        en: "this is text",
        es: "esto es",
        fr: "ca c'est",
      },
    },
  ],
  sketches: [
    {
      fieldName: { en: "sketches", es: "esbozos", fr: "esquisses" },
      fieldImg: sk1,
    },
    {
      name: { en: "city", es: "ciudad", fr: "ville" },
      img: sk2,
      text: {
        en: "this is text",
        es: "esto es",
        fr: "ca c'est",
      },
    },
  ],
};

function LanguageToggle({ lang, setLang, languages }) {
  const handleLangSwitch = (selectedLang) => {
    setLang(selectedLang);
    localStorage.setItem("selected_language", selectedLang); //save to browser memory
  };

  return (
    <div className="language-switch-section">
      {languages.map((l) => (
        <button
          key={l}
          className={`language-button ${lang === l ? "active" : " "}`}
          onClick={() => handleLangSwitch(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function CircularMenu({ lang, onSelectCategory, activeField }) {
  const fields = Object.entries(contentByFields);
  const fieldsTotal = fields.length;

  const radius = 100;
  const centerX = 470;
  const centerY = 110;

  return (
    <div
      className="circular-menu"
      style={{
        position: "relative",
        width: "80%",
        height: "80%",
        margin: "auto auto",
      }}
    >
      {fields.map(([catKey, catArray], i) => {
        const metaData = catArray[0];

        const angle = (i / fieldsTotal) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const isSelected = activeField === catKey;

        return (
          <div
            key={catKey}
            className={`field clickable ${isSelected ? "selected" : ""}`}
            style={{
              // position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              // transform: "translate(-50%, -50%)",
              cursor: "pointer",
            }}
            onClick={() => onSelectCategory(catKey)}
          >
            <img
              src={metaData.fieldImg}
              alt={metaData.fieldName[lang]}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <div>{metaData.fieldName[lang]}</div>
          </div>
        );
      })}
    </div>
  );
}

function Card({ title, img, text }) {
  return (
    <div
      className="card"
      style={{
        margin: "20px auto ",
        textAlign: "center",
        maxWidth: "500px",
        width: "90%",
      }}
    >
      <h3>{title}</h3>
      <img
        src={img}
        alt={title}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <p>{text}</p>
    </div>
  );
}
function App() {
  const languages = ["en", "es", "fr"];
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("selected_language") || "en";
  });

  const [activeField, setActiveField] = useState("sketches");
  const cardsOneFieldActive = activeField
    ? contentByFields[activeField].slice(1)
    : [];

  return (
    <div className="app-main">
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 20px",
          float: true,
        }}
      >
        <LanguageToggle lang={lang} setLang={setLang} languages={languages} />
      </header>

      <CircularMenu
        lang={lang}
        activeField={activeField}
        onSelectCategory={(key) => setActiveField(key)}
      />
      <hr style={{ border: "none", margin: "160px 0" }} />
      <main className="title-and-cards">
        <div>
          <h2 style={{ textAlign: "center" }}>
            {contentByFields[activeField][0].fieldName[lang].toUpperCase()}
          </h2>

          <div className="cards-of-one-active-field">
            {cardsOneFieldActive.map((card, index) => (
              <Card
                key={index}
                title={card.name[lang]}
                img={card.img}
                text={card.text[lang]}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
