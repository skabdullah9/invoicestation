import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/utils/firestore'

type HTTPResponse = {
  [key: string]: any
}

export default defineEventHandler(async (event) => {
  const response: HTTPResponse = {}

  const userId = event?.context?.user?.userId

  if (!userId) {
    response.error = 'Cannot find user id'
    return response
  }

  const docRef = doc(db, `users`, userId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { ...docSnap.data() }
  } else {
    response.error = 'Cannot find user id in db'
  }

  return response
})
