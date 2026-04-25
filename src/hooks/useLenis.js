export function useScrollTo() {
  const scrollTo = (targetId) => {
    const el = document.getElementById(targetId)
    if (el && window.lenis) {
      window.lenis.scrollTo(el, { offset: -80, duration: 1.2 })
    }
  }
  return { scrollTo }
}
