import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary"
import { v2 as cloudinary } from "cloudinary"

// import { incrementApiLimit } from "~~/server/services/user-api-limit"
// import { validateUserStatus } from "~~/server/utils/validate-user-status"

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = formData.get("image") as File
  const object = formData.get("object")

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "No image provided" })
  }

  // const isPro = validateUserStatus(event.context.user.id)

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  await connectCloudinary()

  const uploadFromBuffer = (): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
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
  const finalImageUrl = cloudinary.url(result.public_id, {
    transformation: [{ effect: `gen_remove:${object}` }],
    resource_type: "image",
    secure: true,
  })

  // if (!isPro) {
  //   await incrementApiLimit(event.context.user.id)
  // }
  console.log(finalImageUrl)

  return finalImageUrl
})
