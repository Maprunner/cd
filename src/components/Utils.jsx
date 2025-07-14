import React from "react"
import { t } from "./Quiz.jsx"
import { mapImg } from "../data/data.js"
import Image from "react-bootstrap/Image"

export const getImage = (id) => {
  const key = "c" + id
  return <Image src={mapImg[key]} className="cd-card-map" roundedCircle />
}

export const availableLanguages = [
  "en",
  "cz",
  "de",
  "dk",
  "es",
  "fi",
  "fr",
  "hu",
  "id",
  "it",
  "lt",
  "ja",
  "no",
  "pl",
]

export function translateTitle(oldTitle) {
  let title = oldTitle.replace(" to ", " > ")
  title = title.replace(" and ", " + ")
  title = title.replace("Match", t("Match") + ":")
  title = title.replace("Symbols", t("Symbols"))
  title = title.replace("Text", t("Text"))
  title = title.replace("Map", t("Map"))
  return title
}
