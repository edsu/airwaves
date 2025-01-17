const chalk = require("chalk")
const { fetch, makeIdExpander, writeJson } = require("./mapper")

async function main() {

  const subjects = await fetch("Subjects", subjectsMap)
  // strip trailing periods from subjects if they are present
  subjects.map(s => (s.name = s.name.replace(/\.$/, "")))
  writeJson(subjects, "subjects.json")

  const snac = await fetch("SNAC Records", snacMap)
  writeJson(snac, "snac.json")

  const cpfPages = await fetch("CPF Pages", cpfPagesMap)
  writeJson(cpfPages, "cpf-pages.json")

  const cpf = await fetch("CPF Authorities", cpfMap)
  writeJson(cpf, "cpf.json")

  const places = (await fetch("Geographic Authorities", placesMap)).filter(p => p.type)
  writeJson(places, "places.json")

  const series = await fetch("Series", seriesMap)
  writeJson(series, "series.json")

  const genres = await fetch("Genre(s)", genresMap)
  writeJson(genres, "genres.json")

  const themes = flattenThemes(await fetch("Themes", themesMap))
  writeJson(themes, "themes.json")

}

const seriesMap = {
  slugId: "Series Title",
  strings: {
    "Series Title": "title",
    Description: "description",
  },
  things: {
    "Linked Documents-Folders": {
      property: "relatedFolders",
      expander: makeIdExpander("documents.json", d => {
        return {
          iaId: d.iaId,
          title: d.title,
        }
      }),
    },
    "Linked Documents-Items": {
      property: "relatedItems",
      expander: makeIdExpander("documents.json", d => {
        return {
          iaId: d.iaId,
          title: d.title,
        }
      })
    }
  }
}

const cpfMap = {
  slugId: "Name",
  strings: {
    Name: "name",
    "Entity Type": "type"
  },
  things: {
    "CPF Pages Wikidata QCode": {
      property: "cpfPage",
      expander: makeIdExpander("cpf-pages.json", d => d, allowMultiple=false)
    },
    "SNAC ID": {
      property: "snac",
      expander: makeIdExpander("snac.json", d => d, allowMultiple=false)
    }
  }
}

const subjectsMap = {
  slugId: "Name",
  strings: {
    Name: "name",
  },
}

const placesMap = {
  slugId: "Name",
  strings: {
    Name: "name",
    Type: "type",
    "Wikidata ID": "wikidataId",
    Geocoordinates: "geo",
    "LOC ID": "lccn",
    "Getty Thesaurus ID": "gettyId",
  }
}

const genresMap = {
  slugId: "Name",
  strings: {
    Name: "name",
  },
}

const themesMap = {
  slugId: "",
  strings: {
    Name: "name",
    "Parent Grouping": "group",
  },
  things: {
    "Related Subject(s)": {
      property: "subjects",
      expander: makeIdExpander("subjects.json", s => {
        return {
          id: s.id,
          name: s.name,
        }
      }),
    },
  },
}

const snacMap = {
  strings: {
    "SNAC ID": "snacId",
    "Description": "description",
    "Source for BiogHist": "descriptionSource",
    "Biographical or Historical Note": "description",
    "Date of Birth": "birthDate",
    "Date of Death": "deathDate",
  },
  lists: {
    "Alternate Names": "altNames",
    "Subject(s)": "subjects",
    "Places": "placeNames",
    "Occupation(s)": "occupations",
    "Relations (Associated With)": "associatedWith",
    "Relations (Same As)": "sameAs"
  },
 }

const cpfPagesMap = {
  strings: {
    "Wikidata ID": "wikidataId",
    "Wikidata label": "name",
    "Wikidata label description": "wikidataLabelDescription",
    "Wikipedia URL": "wikipediaUrl",
    "date of birth (P569)": "birthDate",
    "date of death (P570)": "deathDate",
    "place of birth (P19)": "birthPlace",
    "place of death (P20)": "deathPlace",
    "inception (P571)": "inceptionDate",
    "Description": "description",
    "Airwaves image path": "image"
  },
  lists: {
    "Wikidata altLabels": "altNames",
    "country (P17)": "country",
    "occupation (P106)": "occupation",
    "field of work (P101)": "fieldOfWork",
    "employer (P108)": "employer",
    "member of (P463)": "memberOf",
    "owned by (P127)": "ownedBy",
    "official website (P856)": "website",
    "LOC URLs": "lccn",
    "VIAF URLs": "viaf",
    "WorldCat URLs": "worldcat",
    "NARA URLs": "nara",
    "SNAC Ark URLs": "snacArk",
    "Associated Places": "placeNames"
  },
  things: {
    "Associated Subject(s)": {
      property: "subjects",
      expander: makeIdExpander("subjects.json", s => {
        return {
          id: s.id,
          title: s.name,
        }
      }),
    },
  }
}

function flattenThemes(themes) {
  const flatThemes = []
  themes.forEach(theme => {
    if (theme.subjects) {
      flatThemes.push({
        name: theme.name,
        group: theme.group,
        subjects: flattenSubjects(theme.subjects),
      })
    } else {
      console.log(chalk.red(`missing subjects for theme: ${theme.name}`))
    }
  })
  return flatThemes
}

function flattenSubjects(subjects) {
  const names = subjects.map(s => s.name).sort((a, b) => b.length - a.length)
  const newSubjects = []
  const seen = new Map()
  for (const subject of subjects) {
    let foundBroader = false
    for (const name of names) {
      if (subject.name == name) {
        continue
      } else if (subject.name.startsWith(name)) {
        foundBroader = true
        break
      }
    }
    if (!foundBroader && !seen.has(subject.name)) {
      newSubjects.push(subject)
      seen.set(subject.name, true)
    }
  }
  return newSubjects.sort((a, b) => a.name.localeCompare(b.name))
}

if (require.main === module) {
  main()
}
