import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k2t1fziu',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)
export const client = sanityClient // Named export for convenience

// Set up a helper function for generating Image URLs with only the asset reference data in your documents
export const urlFor = (source: any) => imageUrlBuilder(config).image(source)

// Helper function to get all bike listings
export async function getBikeListings() {
  const query = `*[_type == "bikeListing" && isAvailable == true] | order(featured desc, _createdAt desc)`
  return await sanityClient.fetch(query)
}

// Helper function to get featured bike listings
export async function getFeaturedBikes() {
  const query = `*[_type == "bikeListing" && isAvailable == true && featured == true] | order(_createdAt desc)[0...2]`
  return await sanityClient.fetch(query)
}

// Helper function to get site settings
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]`
  return await sanityClient.fetch(query)
}

// Helper function to get service pages by location
export async function getServicePage(location: string) {
  const query = `*[_type == "servicePage" && location == "${location}"][0]`
  return await sanityClient.fetch(query)
}

// Helper function to get all service pages
export async function getServicePages() {
  const query = `*[_type == "servicePage"] | order(location asc)`
  return await sanityClient.fetch(query)
}

// Helper function to get a single bike listing by slug
export async function getBikeBySlug(slug: string) {
  const query = `*[_type == "bikeListing" && slug.current == "${slug}"][0]`
  return await sanityClient.fetch(query)
}
