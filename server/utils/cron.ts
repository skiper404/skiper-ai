export const initCron = () => {
  setInterval(
    async () => {
      await prisma.user.updateMany({
        data: { generations: 0 },
      })

      console.log("Reset free daily limit done")
    },
    24 * 60 * 60 * 1000,
  )
}
