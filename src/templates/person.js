import React from 'react'
import { graphql, Link } from 'gatsby'
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image'
import './person.css'

import Layout from '../components/layout'

const Field = ({label, value}) => {
  if (typeof(value) === 'string') {
    value = [value]
  }
  if (value === undefined || value === null || value.length === 0) {
    return ''
  }
  return (
    <>
      <span className="label">{label}</span>: {value.join(', ')} <br />
    </>
  )
}

const DocumentList = docs => {
  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {docs.map(d => (
          <li key={d.id}>
            <Link to={`/document/${d.iaId}/`}>{d.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const EpisodeList = (personId, episodes) => {
  console.log(episodes)

  // group episode information by series as a map keyed by the series id
  // so that we can output a list of episodes grouped by the series they are a part of
  const seriesMap = new Map()
  for (const e of episodes) {
    if (! seriesMap.has(e.series.id)) {
      seriesMap.set(e.series.id, {title: e.series.title, episodes: []})
    }
    seriesMap.get(e.series.id).episodes.push(e)
  }
  const seriesIds = Array.from(seriesMap.keys())

  return (
    <div>
      <h2>Episodes</h2>
      {seriesIds.map(seriesId => {
        const series = seriesMap.get(seriesId)
        return (
          <div key={seriesId}>
            <b><Link to={`/programs/${seriesId}/`}>{series.title}</Link></b>
            <ul>
              {series.episodes.map(e => {
                let role = ''
                for (const episode of episodes) {
                  const personRoles = joinLists(episode.creator, episode.contributor)
                  const personRole = personRoles.find(e => e.id === personId)
                  if (personRole) {
                    role = `(${personRole.role})`
                  }
                }
                return (
                  <li key={e.id}>
                    <Link to={`/episode/${e.aapbId}/`}>{e.title}</Link> {role}</li>
                )
              })}
            </ul>
            <br />
          </div>
        )
      })}
    </div>
  )
}

function joinLists(a, b) {
  if (!a) a = []
  if (!b) b = []
  return a.concat(b)
}

const Person = ({ data }) => {
  const person = data.peopleJson

  let image = <StaticImage 
    src='../images/missing-person.png' 
    width={300}
    alt='Unknown Image' />

  let abstract = ''

  if (data.wikipediaJson) {
    if (data.wikipediaJson.image) {
      const img = getImage(data.wikipediaJson.image)
      image = <GatsbyImage image={img} alt={person.name} />
    }
    if (data.wikipediaJson.abstract) {
      abstract = (
        <p>
          {data.wikipediaJson.abstract}
          <em>Read more at <a href={person.wikidata.wikipediaUrl}>Wikipedia</a>...</em>
        </p>
      )
    }
  }

  let birth = null
  if (person.wikidata.birthDate) {
    const t = new Date(person.wikidata.birthDate)
    birth = `${t.getUTCFullYear()}`
    if (person.wikidata.birthPlace) {
      birth += `, ${person.wikidata.birthPlace}`
    }
  }

  let death = null 
  if (person.wikidata.deathDate) {
    const t = new Date(person.wikidata.deathDate)
    death = `${t.getUTCFullYear()}`
    if (person.wikidata.deathPlace) {
      death += `, ${person.wikidata.deathPlace}`
    }
  }

  const relatedDocuments = DocumentList(joinLists(data.asDocumentCreator.nodes, data.asDocumentContributor.nodes))
  const relatedEpisodes = EpisodeList(person.id, joinLists(data.asEpisodeCreator.nodes, data.asEpisodeContributor.nodes))

  return (
    <Layout>
      <section>

        <h2>
          <Link to="/people/">People</Link> / {person.name}
        </h2>
        <div className="person">
          <div className="image">
            {image}
          </div>
          <div className="bio">
            <b>{person.wikidata.name}</b>
            {abstract}
            <p>
              <Field label="Born" value={birth} />
              <Field label="Died" value={death} />
            </p>
            <p>
              <Field label="Occuptation(s)" value={person.wikidata.occupation} /> 
              <Field label="Field(s) of Work" value={person.wikidata.occuptation} />
              <Field label="Field(s) of Work" value={person.wikidata.fieldOfWork} />
              <Field label="Employer(s)" value={person.wikidata.employer} />
              <Field label="Member of" value={person.wikidata.memberOf} />
            </p>
            <div className="related">
              {relatedEpisodes}
              {relatedDocuments}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wikipediaJson(id: {eq: $id}) {
      id
      abstract
      image {
        childImageSharp {
          gatsbyImageData(width: 300)
        }
      }
    }
    peopleJson(id: {eq: $id}) {
      id
      name
      type
      snac {
        airtableId
        altNames
        associatedWith
        birthDate
        deathDate
        description
        occupations
        places
        sameAs
        snacId
        subjects
      }
      wikidata {
        airtableId
        altNames
        birthDate
        birthPlace
        broadcastTo
        country
        deathDate
        description
        deathPlace
        employer
        geo
        fieldOfWork
        inceptionDate
        instanceOf
        lccn
        locatedIn
        name
        memberOf
        occupation
        ownedBy
        settlment
        state
        snacArk
        viaf
        website
        wikidataId
        wikipediaUrl
      }
    }
    asDocumentCreator: allDocumentsJson(
      filter: {creator: {elemMatch: {id: {eq: $id}}}}
    ) {
      nodes {
        id
        iaId
        title
        date
      }
    }
    asDocumentContributor: allDocumentsJson(
      filter: {contributor: {elemMatch: {id: {eq: $id}}}}
    ) {
      nodes {
        id
        iaId
        title
        date
      }
    }
    asEpisodeCreator: allEpisodesJson(
      filter: {creator: {elemMatch: {id: {eq: $id}}}}
      sort: {fields: [series___title, broadcastDate]}
    ) {
      nodes {
        aapbId
        title
        creator {
          id
          name
          role
        }
        contributor {
          id
          name
          role
        }
        series {
          title
          id
        }
        id
      }
    }
    asEpisodeContributor: allEpisodesJson(
      filter: {contributor: {elemMatch: {id: {eq: $id}}}}
      sort: {fields: [series___title, broadcastDate]}
    ) {
      nodes {
        aapbId
        title
        series {
          title
          id
        }
        id
        creator {
          id
          name
          role
        }
        contributor {
          id
          name
          role
        }
      }
    }
  }
`

export default Person