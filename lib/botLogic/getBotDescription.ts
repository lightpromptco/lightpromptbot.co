import { sanity } from '../sanityClient'

export async function getBotDescription(botName: string) {
  return sanity.fetch(`*[_type=="bot" && name==$botName][0]`, { botName })
}