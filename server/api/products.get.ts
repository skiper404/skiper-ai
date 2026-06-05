export default defineEventHandler(async () => {
  const products = await polar.products.list({ isArchived: false })
  return products?.result?.items ?? []
})
