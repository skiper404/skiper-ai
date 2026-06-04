import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary"
import { v2 as cloudinary } from "cloudinary"
import { connectCloudinary } from "~~/server/utils/cloudinary"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const formData = await readFormData(event)

  const file = formData.get("image") as File

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "No image provided" })
  }

  const user = await getUser(session.user.id)
  const isPro = await isUserPro(user.id)

  if (!isPro) {
    await incrementLimit(user)
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  await connectCloudinary()

  const uploadFromBuffer = (): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation: [
            {
              effect: "background_removal",
              background_removal: "remove_the_background",
            },
          ],
          folder: "bg-removed",
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            reject(error || new Error("Upload Failed"))
          }
          resolve(result!)
        },
      )
      return uploadStream.end(buffer)
    })
  }
  const result = await uploadFromBuffer()

  return result.secure_url
})
