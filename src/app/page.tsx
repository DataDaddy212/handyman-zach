import { getSiteSettings } from '../lib/sanity.client'
import HomeClient from './HomeClient'
// Fallback to static data if Sanity is not available
import staticSiteData from '../../content/site.json'

export default async function Home() {
  // Fetch data from Sanity CMS
  let siteData
  
  try {
    siteData = await getSiteSettings()
    
    // If no data from Sanity, fall back to static JSON
    if (!siteData) {
      console.warn('No data from Sanity, using static fallback')
      siteData = staticSiteData
    }
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    siteData = staticSiteData
  }

  return <HomeClient siteData={siteData} />
}