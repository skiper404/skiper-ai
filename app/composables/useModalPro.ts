export const useModalPro = () => {
  const isOpen = useState("pro-modal", () => false)
  const toggleOpen = (val: boolean) => {
    isOpen.value = val
  }

  return { isOpen, toggleOpen }
}
