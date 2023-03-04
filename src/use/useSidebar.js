import { ref } from 'vue'

export function useSidebar() {
   const isToggled = ref(localStorage.getItem('isToggled') === "true")
   const isDropdowned = ref(false)

   const menuToggle = () => {
      isToggled.value = !isToggled.value
      localStorage.setItem('isToggled', isToggled.value)
   }
   const openDropdown = () => {
      isToggled.value = true
      isDropdowned.value = true
   }
   const closeDropdown = () => {
      isDropdowned.value = false
   }
   return {
      isToggled,
      menuToggle,
      openDropdown,
      closeDropdown
   }
}