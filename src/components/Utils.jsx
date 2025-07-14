import React from "react"
import { mapImg } from "../data/data.js"
import Image from "react-bootstrap/Image"
import cz from "../lang/cz.js"
import de from "../lang/de.js"
import dk from "../lang/dk.js"
import es from "../lang/es.js"
import fi from "../lang/fi.js"
import fr from "../lang/fr.js"
import hu from "../lang/hu.js"
import id from "../lang/id.js"
import it from "../lang/it.js"
import lt from "../lang/lt.js"
import ja from "../lang/ja.js"
import no from "../lang/no.js"
import pl from "../lang/pl.js"

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

const dictionaries = {
  cz: cz,
  de: de,
  dk: dk,
  es: es,
  fi: fi,
  fr: fr,
  hu: hu,
  id: id,
  it: it,
  lt: lt,
  ja: ja,
  no: no,
  pl: pl,
}

let dictionary = {}

// translation function
export function t(str) {
  if (Object.prototype.hasOwnProperty.call(dictionary, str)) {
    return dictionary[str]
  }
  // default to hard-coded English
  return str
}

export function setLanguage(lang) {
  if (Object.prototype.hasOwnProperty.call(dictionaries, lang)) {
    dictionary = dictionaries[lang][lang]
  } else {
    dictionary = {}
    lang = "en"
  }
  return lang
}
