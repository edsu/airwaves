import React from "react"
import Layout from "../components/layout"

import "./about.css"

const AboutPage = () => (
  <Layout url="/about/">
    <div className="page-about">
      <section id="intro">
        <h1>About</h1>
        <h2>Project Introduction</h2>
        <p>
          <strong>
            Unlocking the Airwaves: Revitalizing an Early Public and Educational
            Radio Collection
          </strong>{" "}
          is a comprehensive online collection of early educational public radio
          content from the National Association of Educational Broadcasters
          (NAEB). The forerunner of CPB and its arms, NPR and PBS, the NAEB
          developed and distributed educational radio programs and accompanying
          print materials to schools and communities across the United States.
          What’s more, the NAEB lobbied extensively to unlock the airwaves—to
          access precious frequency space—in order to bring the voices of poet
          Robert Frost, architect Frank Lloyd Wright, anthropologist Margaret
          Mead, and conservationist “Ranger Mac,” among many other individuals,
          into American homes and classrooms.
        </p>
        <p>
          The NAEB’s collections have much to tell us about 20th century
          American culture, as well as today’s environment of online educational
          technology and podcasting. Despite its historic importance and
          contemporary relevance, however, most of the NAEB members’ programs
          were never heard again after their initial brief moments on the air.
          The archives for the radio programs and their related paper
          documentation have been split for over 25 years between two
          institutions: the University of Maryland and the Wisconsin Historical
          Society.
        </p>
        <p>
          Unlocking the Airwaves reunites the split collections, ﬁnally
          realizing the potential of the collections of the NAEB for
          exploration, research, and reflection. We anticipate the resource will
          provide useful to a wide range of users (including teachers, scholars,
          journalists, and genealogists) interested in an even wider range of
          subjects (civil rights, second wave feminism, the Cold War,
          environmental conservation, and poetry, to name just a few). But no
          matter what topic interests you, it is helpful to know some background
          information about the NAEB.
        </p>
      </section>
      <section id="naeb">
        <h2>The National Association of Educational Broadcasters (NAEB)</h2>
        <p>
          The NAEB’s institutional hands touched every item in this
          collection—in some cases at a creator, in others as a distributor, and
          sometimes merely filing away something of interest that arrived in the
          mail. Understanding the NAEB as an organization provides a richer
          context for interpreting the documents and recordings accessible
          through this website.
        </p>
        <p>
          The NAEB began in 1925 as the Association of College and University
          Broadcasting Stations. From its inception until its dissolution in
          1981, the faculty and staff at large public Midwestern universities
          played key leadership roles within the organization. The story of the
          NAEB is, therefore, the intertwined stories of broadcasting
          initiatives at the University of Wisconsin, University of Illinois,
          University of Minnesota, and the Ohio State University, to name just a
          few of the most active and prominent players. It is perhaps fitting
          that media archivists and scholars at two Big 10 universities are at
          the helm of Unlocking the Airwaves.
        </p>
        <p>
          {" "}
          The professors and university staff members who devoted themselves to
          the NAEB were idealists, believing in the utopian possibilities of
          technology for education and social uplift. Radio held the potential
          to bring dynamic voices into the classroom, as well as educate adults
          who never had the opportunity to attend college—or, in many cases,
          finish high school. The NAEB’s leaders faced considerable challenges
          in the pursuit of these goals, including economic depression, world
          war, and the scarcity of the electromagnetic spectrum.{" "}
        </p>
        <p>
          The NAEB Newsletter (pictured below, in three of its typographic
          iterations) provides a window into the organization’s efforts and
          priorities. During the 1930s, advocacy efforts to the FCC loomed took
          center stage; the NAEB lobbied the government for bigger and better
          frequency allocations for educational stations. While advocacy efforts
          did not go away during the 1940s, it did become subordinated to the
          war effort and the coordinated distribution of recorded programs.
        </p>
        <p>
          The NAEB’s most productive period as a creator of programs occurred
          during the 1950s, with its work on ambitious series such as People
          Under Communism and The Jeffersonian Heritage (featuring character
          actor Claude Rains in the role of Thomas Jefferson). In the
          late-1950s, the NAEB sponsored the innovative research study, “Project
          in Understanding New Media,” led by media theorist Marshal McLuhan.
          The organization also devoted considerable resources toward the
          development of educational television.
        </p>
        <p>
          Although the NAEB continued to exist until the early-1980s, the
          organization’s vitality gradually diminished across the 1960s and 70s.
          In some ways, the NAEB was a victim of its own success: the decades of
          federal lobbying contributed to the creation of CBP, PBS, and NPR.
          Additionally, the NAEB had a challenging time adapting to the shift
          from “educational media” to “public media”—a new landscape in which
          conversational broadcasting styles were preferred over on-air
          lectures. In the new environment of public media, large-market
          stations (e.g. WNYC, WGBH, KQED) wielded far more power than the
          university stations that had led the NAEB (e.g. Madison’s WHA and
          Columbus’s WOSU).
        </p>
        <p>
          Yet if the NAEB is today forgotten as an organization, the legacy of
          its initiatives, ideas, and actions are still widely felt. Anytime a
          listener downloads the TED Radio Hour podcast to their iPhone, or
          turns on the car radio and hears Terry Gross interviewing an author on
          Fresh Air, that listener is participating in a 100-year-old tradition
          of utilizing audio broadcasting to educate and inform the American
          public. And while it would take internet networks to provide an
          infrastructure for MOOCs (Massive Open Online Courses), the concept
          was championed by radio enthusiasts at Midwestern universities in the
          1920s and 30s.
        </p>
        <p>
          The NAEB made history—and preserved its own history, too. Newly
          digitized and reunited, the NAEB’s collection of recordings,
          publications, and manuscripts provide essential sources for the study
          of American broadcasting, society, and culture.
        </p>
      </section>
      <section id="tech_infrastructure">
        <h2>Technological Infrastructure</h2>
        <p>
          <i>Unlocking the Airwaves</i> employs a minimal computing application
          design, which combines static site generation, client-side web
          framework and indexing technologies to minimize server side
          dependencies, and greatly reduce the cost of deployment and long-term
          maintenance. The application design uses Airtable for distributed data
          curation, and the Internet Archive as a data publishing platform.
          These approaches allow us to examine facets of digital collection
          building and maintenance that have been explored with “standard”
          online platforms and software, but which have not been investigated in
          minimal computing frameworks.
        </p>
        <p>
          The application website itself is being generated as a static site
          using <a href="https://www.gatsbyjs.org/">Gatsby</a>, an open source
          framework based on <a href="https://reactjs.org/">React</a>, in
          conjunction with <a href="http://elasticlunr.com/">Elasticlunr</a>,
          which indexes the JSON files generated out of a) the Internet Archive
          (text from OCR derivatives of the scanned images) and b) Airtable
          (Dublin Core metadata about digitized folders, PBCore metadata about
          audio, and metadata for Authorities and Series titles).
        </p>
        <p>
          The digitized images of the paper collections are being redundantly
          stored on a RAID drive at the University of Wisconsin-Madison’s
          CommArts Instructional Media Center, as well as on Internet Archive
          servers. MITH Developer Ed Summers developed a{" "}
          <a href="https://github.com/umd-mith/airwaves-cli">
            custom uploader program
          </a>{" "}
          that utilizes the Airtable API to automatically take a folder of
          individual digitized images from a given folder, bundle them into one
          package, upload them to the NAEB collection on the Internet Archive,
          and map the metadata from Airtable into the Internet Archive’s
          metadata schema.
        </p>
        <p>
          Since the Internet Archive offers integration with the{" "}
          <a href="https://iiif.io/">
            International Image Interoperability Framework (IIIF)
          </a>
          , the project team made the decision to use the IA as part of our
          digitization workflow, not only for redundant storage/access points
          and creating derivatives for all scanned materials, but also so we
          could utilize the{" "}
          <a href="https://projectmirador.org/">Mirador image viewer</a>.
          Mirador supports the IIIF standard, and the new version is written in
          React, which dovetails nicely with Gatsby.
        </p>
        <p>
          Transcripts of the audio files are currently being stored as WebVTT
          files in an Amazon Web Services S3 bucket, which feeds into the
          application and merges the audio and transcripts for display in a{" "}
          <a href="https://github.com/umd-mith/webvtt-player">WebVTT player</a>{" "}
          designed by Summers.
        </p>
        <p>
          The CSS files comprising the front end design graphics are being
          generated by MITH designer Kirsten Keister using Dreamweaver, then
          published to the Airwaves application in GitHub. Tweaks and
          modifications to text on static pages can be modified directly in
          GitHub, but design changes must be separately committed by Keister.
          Realizing the design of Unlocking the Airwaves took a concise approach
          to development and styling. Using the{" "}
          <a href="https://www.w3schools.com/css/css_grid.asp">
            CSS Grid framework
          </a>
          , a base html structure was added to all the pages for a consistent
          layout on all pages. Custom functionality, scripts and connections to
          the pertinent data were added to each page by the developer, with
          attention to minimizing the injection of third-party styles. Overall,
          CSS specificity was kept low, and utilized global HTML and CSS
          wherever possible. Custom stylesheets were conditionally loaded only
          on specific pages, helping optimize page load performance.
        </p>
      </section>
      <section id="contributors">
        <h2>Contributors</h2>
        <h3>Project Directors</h3>
        <ul>
          <li>Stephanie Sapienza (Principal Investigator, MITH)</li>
          <li>Eric Hoyt (Principal Investigator, UW)</li>
        </ul>
        <h3>Advisory Team</h3>
        <ul>
          <li>Rebecca Fraimow (Archivist, WGBH)</li>
          <li>Megan McShea (Archivist, Smithsonian Institution)</li>
          <li>Allison Perlman (Associate Professor, UC Irvine)</li>
          <li>Laura Schnitker (Archivist/Curator, UMD Libraries)</li>
          <li>Josh Shepperd (Assistant Professor, Catholic University)</li>
        </ul>
        <h3>Project Team</h3>
        <ul>
          <li>J.J. Bersch (Production Assistant, UW)</li>
          <li>
            Matthew Blessing (Administrator of the Division of Library-Archives,
            WHS)
          </li>
          <li>Alison Bridger (Archivist, WHS)</li>
          <li>Paul Hedges (Emerging Technologies Archivist, WHS)</li>
          <li>Kirsten Keister (Designer, MITH)</li>
          <li>Jacob Mertens (Production Assistant, UW)</li>
          <li>Trevor Muñoz (Director, MITH)</li>
          <li>Connor Perkins (Production Assistant, UW)</li>
          <li>Matthew St. John (Production Assistant, UW)</li>
          <li>Ed Summers (Developer, MITH)</li>
        </ul>
      </section>
    </div>
  </Layout>
)

export default AboutPage
