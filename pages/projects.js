import React from 'react'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import Base from '../layouts/Base'
import FeaturedProject from '../components/FeaturedProject'
import { FeaturedProjects } from '../components/FeaturedProjects'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'

export async function getStaticProps() {
  const meta = {
    title: 'Projects // Dozzer Geeky',
    tagline: 'Work. Hobby. Open Source.',
    image: '/static/images/exportDP.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Projects(props) {
  const renderFeatured = () => {
    const featured = [
      'Eduminati',
      'Rustodian',
      'Old Portfolio',
    ]

    return items
      .map(item => {
        return item.projects.filter(project => featured.includes(project.title))
      })
      .filter(item => {
        if (item.length > 0) {
          return item
        }
      })
      .flat()
      .map((item, index) => {
        return <FeaturedProject key={index} project={item} />
      })
  }

  const renderAll = () => {
    const myProjects = []
    const contributedProjects = []

    // Categorize projects
    items.forEach(item => {
      item.projects.forEach(project => {
        // Projects I contributed to (typically forks or collaborative projects)
        if (project.title.includes('Awesome Public Datasets') || 
            project.title.includes('Challenge') ||
            project.title.includes('Template')) {
          contributedProjects.push(project)
        } else {
          // My original projects
          myProjects.push(project)
        }
      })
    })

    return (
      <>
        <div>
          <h3>My Projects</h3>
          <ul>
            {myProjects.map((project, pIndex) => {
              return <ProjectItem key={pIndex} project={project} />
            })}
          </ul>
        </div>
        <div>
          <h3>Projects I Contributed To</h3>
          <ul>
            {contributedProjects.map((project, pIndex) => {
              return <ProjectItem key={pIndex} project={project} />
            })}
          </ul>
        </div>
      </>
    )
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
  }

  const { title, image } = props
  const description = `I'm obsessed with side projects and <strong>exploring cool stuff</strong>. Here you can navigate to repos, apps, and libraries I built/contributed to and use all the time.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://dozzer.tech/projects" property="og:url" />
        <meta content={`https://dozzer.tech${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Projects</h2>
        <FeaturedProjects>{renderFeatured()}</FeaturedProjects>

        <h2>All Projects</h2>
        {renderAll()}
      </AnimateSharedLayout>
    </>
  )
}

function ProjectItem(props) {
  const { project } = props

  return (
    <li>
      <a href={project.url} target="_blank">
        {project.title}
      </a>
    </li>
  )
}

Projects.Layout = Base

export default Projects
