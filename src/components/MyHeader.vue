<template>
   <header class="header">
      <div class="header__container">
         <div class="header__body">
            <div class="header__logo">
               <router-link to="/">
                  <svg width="438" height="438" viewBox="0 0 438 438" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M0.949219 387.081C0.949219 399.617 11.1262 409.797 23.6622 409.797C34.6552 409.797 43.8292 401.987 45.9232 391.624H46.3762C46.3762 381.633 54.5572 373.452 64.5492 373.452C74.5382 373.452 82.7192 381.633 82.7192 391.624V400.711C82.7192 420.789 98.9832 437.051 119.061 437.051H155.401C175.48 437.051 191.744 420.789 191.744 400.711V264.427C191.744 244.348 175.48 228.086 155.401 228.086H119.061C98.9822 228.086 82.7192 244.348 82.7192 264.427V273.513C82.7192 283.504 74.5382 291.685 64.5492 291.685C54.5572 291.685 46.3762 283.504 46.3762 273.513V219C46.3762 123.691 123.692 46.3752 219.001 46.3752C314.31 46.3752 391.624 123.691 391.624 219V273.513C391.624 283.504 383.444 291.685 373.452 291.685C363.465 291.685 355.284 283.504 355.284 273.513V264.427C355.284 244.348 339.017 228.086 318.938 228.086H282.598C262.52 228.086 246.257 244.348 246.257 264.427V400.711C246.257 420.789 262.52 437.051 282.598 437.051H318.938C339.017 437.051 355.284 420.789 355.284 400.711V391.624C355.284 381.633 363.465 373.452 373.452 373.452C383.444 373.452 391.624 381.633 391.624 391.624H392.075C394.161 401.987 403.346 409.797 414.34 409.797C426.876 409.797 437.051 399.617 437.051 387.081V219C437.051 98.5292 339.473 0.949219 219 0.949219C98.5292 0.949219 0.949219 98.5292 0.949219 219V387.081Z" fill="#010101"/>
                  </svg>
               </router-link>
            </div>
            <nav class="header__nav nav">
               <div class="nav__overlay" :class="`${isDrowerOpen ? 'menu-open' : ''}`"></div>
               <button class="nav__open" @click="isDrowerOpen = !isDrowerOpen, isDropdowned = !isDropdowned">
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0 1C0 0.44771 0.44772 0 1 0H21C21.5523 0 22 0.44771 22 1C22 1.55229 21.5523 2 21 2H1C0.44772 2 0 1.55229 0 1Z" fill="black"/>
                     <path d="M0 8C0 7.4477 0.44772 7 1 7H21C21.5523 7 22 7.4477 22 8C22 8.5523 21.5523 9 21 9H1C0.44772 9 0 8.5523 0 8Z" fill="black"/>
                     <path d="M1 14C0.44772 14 0 14.4477 0 15C0 15.5523 0.44772 16 1 16H21C21.5523 16 22 15.5523 22 15C22 14.4477 21.5523 14 21 14H1Z" fill="black"/>
                  </svg>
               </button>
               <div class="nav__body" :class="`${isDrowerOpen ? 'menu-open' : ''}`" ref="drawer">
                  <button class="nav__close" @click="isDrowerOpen = false" v-if="isDrowerOpen">
                     <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.29999 48.3L0 46L46 0L48.3 2.3L2.29999 48.3Z" fill="#134563"/>
                        <path d="M46 48.3L0 2.3L2.29999 0L48.3 46L46 48.3Z" fill="#134563"/>
                     </svg>
                  </button>
                  <ul class="nav__list">
                     <li class="nav__link">
                        <router-link to="/">
                           <div class="nav__item">
                              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M27.7073 13.793L14.7073 0.793006C14.3163 0.402006 13.6843 0.402006 13.2933 0.793006L0.29325 13.793C-0.09775 14.184 -0.09775 14.816 0.29325 15.207C0.68425 15.598 1.31625 15.598 1.70725 15.207L14.0002 2.91401L22.0142 10.928C22.0132 10.953 22.0002 10.975 22.0002 11V26H6.00025V16C6.00025 15.447 5.55225 15 5.00025 15C4.44825 15 4.00025 15.447 4.00025 16V27C4.00025 27.553 4.44825 28 5.00025 28H23.0002C23.5532 28 24.0002 27.553 24.0002 27V12.914L26.2932 15.207C26.4882 15.402 26.7442 15.5 27.0002 15.5C27.2562 15.5 27.5123 15.402 27.7073 15.207C28.0983 14.816 28.0983 14.184 27.7073 13.793Z" fill="black"/>
                              </svg>
                              <span>Home</span>
                           </div>
                        </router-link>
                     </li>
                     <li class="nav__link">
                        <router-link to="/library">
                           <div class="nav__item">
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M36 0H12C9.79 0 8 1.79 8 4V28C8 30.21 9.79 32 12 32H36C38.21 32 40 30.21 40 28V4C40 1.79 38.21 0 36 0ZM32 10H26V21C26 23.76 23.76 26 21 26C18.24 26 16 23.76 16 21C16 18.24 18.24 16 21 16C22.13 16 23.16 16.39 24 17.02V6H32V10ZM4 8H0V36C0 38.21 1.79 40 4 40H32V36H4V8Z" fill="black"/>
                              </svg>
                              <span>Library</span>
                           </div>
                        </router-link>
                     </li>
                  </ul>
                  <div class="nav__user user-dropdown" @mouseenter="openDropdown" @mouseleave="closeDropdown">
                     <button class="user-dropdown__button" >
                        <div class="user-dropdown__icon">
                           <img :src="getData.avatar" alt="" v-if="isTokenActive">
                           <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!isTokenActive">
                              <path d="M22 24C28.6 24 34 18.6 34 12C34 5.4 28.6 0 22 0C15.4 0 10 5.4 10 12C10 18.6 15.4 24 22 24ZM22 2C27.5 2 32 6.5 32 12C32 17.5 27.5 22 22 22C16.5 22 12 17.5 12 12C12 6.5 16.5 2 22 2Z" fill="black"/>
                              <path d="M31 26H13C5.8 26 0 31.8 0 39V44H2V39C2 32.9 6.9 28 13 28H31C37.1 28 42 32.9 42 39V44H44V39C44 31.8 38.2 26 31 26Z" fill="black"/>
                           </svg>
                        </div>
                        <span class="user-dropdown__account">{{ isTokenActive ? user.email: 'Account' }}</span>
                        <div class="user-dropdown__chevron" :class="`${ isDropdowned ? 'rotate' : '' }`">
                           <svg width="768" height="384" viewBox="0 0 768 384" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 0L383.75 383.75L767.5 0H0Z" fill="grey"/>
                           </svg>
                        </div>
                     </button>
               <transition name="fade">
                     <div class="user-dropdown__content" v-if="isDropdowned" >
                        <router-link to="/login" v-if="!isTokenActive">
                           <button class="user-dropdown__login" >
                              Login
                           </button>
                        </router-link>
                        <router-link to="/register" v-if="!isTokenActive">
                           <button class="user-dropdown__item">
                              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M17.293 30.707H23.707L47.707 6.70703L41.293 0.29303L17.293 24.293V30.707ZM44.879 6.70703L41.293 10.293L37.707 6.70703L41.293 3.12103L44.879 6.70703ZM19.293 25.121L36.293 8.12103L39.879 11.707L22.879 28.707H19.293V25.121Z" fill="black"/>
                                 <path d="M42.293 18.707H40.293V45.707H2.29297V7.70703H30.293V5.70703H0.292969V47.707H42.293V18.707Z" fill="black"/>
                              </svg>
                              <span>Register</span>
                           </button>
                        </router-link>
                        <router-link to="/settings/account" v-if="isTokenActive">
                           <button class="user-dropdown__item">
                                 <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.391 12.68L27.327 12.066C27.173 11.623 26.991 11.193 26.79 10.777L28.526 8.17295C29.055 7.37995 28.95 6.32295 28.276 5.64995L26.352 3.72595C25.965 3.33895 25.454 3.13995 24.936 3.13995C24.553 3.13995 24.166 3.24995 23.829 3.47595L21.225 5.21095C20.807 5.00895 20.377 4.82895 19.934 4.67495L19.32 1.60995C19.134 0.673953 18.312 0.00195312 17.359 0.00195312H14.639C13.686 0.00195312 12.865 0.674953 12.678 1.60995L12.064 4.67495C11.621 4.82895 11.191 5.00995 10.775 5.21095L8.172 3.47595C7.833 3.24995 7.447 3.13995 7.063 3.13995C6.546 3.13995 6.035 3.33895 5.648 3.72595L3.725 5.64995C3.051 6.32395 2.946 7.37995 3.475 8.17295L5.21 10.777C5.008 11.194 4.828 11.624 4.674 12.067L1.608 12.68C0.673 12.867 0 13.688 0 14.641V17.361C0 18.314 0.673 19.136 1.608 19.322L4.673 19.937C4.827 20.38 5.008 20.81 5.209 21.226L3.475 23.83C2.946 24.623 3.051 25.68 3.725 26.353L5.649 28.277C6.036 28.664 6.547 28.863 7.064 28.863C7.448 28.863 7.835 28.752 8.172 28.527L10.776 26.791C11.193 26.994 11.623 27.174 12.066 27.328L12.679 30.392C12.866 31.328 13.687 32.001 14.64 32.001H17.36C18.313 32.001 19.135 31.327 19.321 30.392L19.936 27.328C20.379 27.174 20.809 26.992 21.225 26.791L23.829 28.527C24.167 28.752 24.554 28.863 24.936 28.863C25.454 28.863 25.965 28.664 26.352 28.277L28.276 26.353C28.95 25.679 29.055 24.623 28.526 23.83L26.79 21.226C26.993 20.808 27.173 20.378 27.327 19.935L30.391 19.322C31.326 19.137 32 18.314 32 17.361V14.641C32 13.688 31.326 12.867 30.391 12.68ZM26.934 17.975C26.239 18.114 25.67 18.61 25.438 19.28C25.309 19.649 25.159 20.007 24.991 20.354C24.68 20.993 24.733 21.747 25.126 22.336L26.862 24.94L24.938 26.864L22.334 25.128C22 24.905 21.613 24.792 21.225 24.792C20.928 24.792 20.629 24.858 20.354 24.991C20.006 25.159 19.649 25.311 19.278 25.44C18.61 25.672 18.114 26.241 17.975 26.936L17.36 30.002H14.64L14.027 26.936C13.888 26.241 13.392 25.672 12.723 25.44C12.354 25.311 11.995 25.161 11.648 24.993C11.372 24.858 11.074 24.792 10.776 24.792C10.387 24.792 10.001 24.905 9.667 25.128L7.063 26.864L5.139 24.94L6.874 22.336C7.267 21.746 7.318 20.992 7.011 20.356C6.843 20.008 6.692 19.651 6.563 19.28C6.331 18.612 5.761 18.116 5.067 17.977L2.002 17.362L2 14.641L5.066 14.028C5.76 13.889 6.33 13.393 6.562 12.724C6.691 12.355 6.84 11.996 7.009 11.649C7.319 11.011 7.267 10.257 6.873 9.66795L5.139 7.06395L7.062 5.13995L9.666 6.87495C10 7.09795 10.387 7.21095 10.775 7.21095C11.072 7.21095 11.37 7.14495 11.646 7.01195C11.993 6.84395 12.351 6.69295 12.721 6.56395C13.39 6.33195 13.886 5.76195 14.025 5.06795L14.639 2.00295L17.359 2.00195L17.972 5.06795C18.111 5.76195 18.607 6.33195 19.277 6.56395C19.646 6.69295 20.004 6.84195 20.351 7.01095C20.628 7.14495 20.925 7.21095 21.224 7.21095C21.613 7.21095 21.999 7.09795 22.333 6.87495L24.937 5.13995L26.861 7.06395L25.125 9.66795C24.732 10.258 24.682 11.011 24.988 11.648C25.156 11.995 25.308 12.353 25.437 12.723C25.669 13.392 26.238 13.888 26.933 14.027L29.997 14.641L30 17.361L26.934 17.975Z" fill="#333333"/>
                                    <path d="M16 9.00098C12.135 9.00098 9 12.136 9 16.001C9 19.867 12.135 23.001 16 23.001C19.865 23.001 23 19.866 23 16.001C23 12.136 19.865 9.00098 16 9.00098ZM16 22.127C12.618 22.127 9.875 19.383 9.875 16.002C9.875 12.62 12.618 9.87698 16 9.87698C19.381 9.87698 22.125 12.62 22.125 16.002C22.125 19.383 19.381 22.127 16 22.127Z" fill="#333333"/>
                                    <path d="M16 12.001C13.79 12.001 12 13.791 12 16.001C12 18.21 13.79 20.001 16 20.001C18.209 20.001 20 18.21 20 16.001C20 13.792 18.209 12.001 16 12.001ZM16 19.002C14.344 19.002 13 17.658 13 16.002C13 14.346 14.344 13.002 16 13.002C17.656 13.002 19 14.346 19 16.002C19 17.658 17.656 19.002 16 19.002Z" fill="#333333"/>
                                 </svg>
                                 <span>Settings</span>
                           </button>
                        </router-link>
                        <button class="user-dropdown__item" @click="$store.dispatch('reg/logout')" v-if="isTokenActive">
                           <svg width="60" height="62" viewBox="0 0 60 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M41 62H1C0.45 62 0 61.55 0 61V1C0 0.45 0.45 0 1 0H41C41.55 0 42 0.45 42 1C42 1.55 41.55 2 41 2H2V60H41C41.55 60 42 60.45 42 61C42 61.55 41.55 62 41 62Z" fill="black"/>
                              <path d="M44.2701 46.73C44.0101 46.73 43.7601 46.63 43.5601 46.44C43.1701 46.05 43.1701 45.42 43.5601 45.03L57.5901 31L43.5601 16.98C43.1701 16.59 43.1701 15.96 43.5601 15.57C43.9501 15.18 44.5801 15.18 44.9701 15.57L59.7001 30.3C59.8901 30.48 60.0001 30.74 60.0001 31C60.0001 31.26 59.8901 31.52 59.7101 31.71L44.9801 46.44C44.7801 46.63 44.5201 46.73 44.2701 46.73Z" fill="black"/>
                              <path d="M19 32C18.45 32 18 31.55 18 31C18 30.45 18.45 30 19 30H59C59.55 30 60 30.45 60 31C60 31.55 59.55 32 59 32H19Z" fill="black"/>
                           </svg>
                           <span>Sign Out</span>
                        </button>
                     </div>
               </transition>
                  </div>
               </div>
            </nav>
         </div>
      </div>
   </header>
</template>
<script>
//========================================================================================================================================================
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

//styles========================================================================================================================================================
//========================================================================================================================================================
export default {
   setup() {
      const user = ref({})
      const store = useStore()
      const isTokenActive = ref(localStorage.getItem('jwt_token'))
      const getData = computed(() => store.state.auth.myData)
      // sidebar functional
      const isDropdowned = ref(false)

      const openDropdown = () => {
         isDropdowned.value = true
      }
      const closeDropdown = () => {
         if(isDrowerOpen.value) {
            isDropdowned.value = true
         } else {
            isDropdowned.value = false
         }
      }
      const isDrowerOpen = ref(false)
      const drawer = ref(null)
      onClickOutside(drawer, () => {
         isDrowerOpen.value = false
         isDropdowned.value = false

      })
      // get user info
      onMounted( async () => {
         if(isTokenActive.value) {
            user.value = await store.dispatch('auth/toUser')
         }
      })
     
      return {
         getData,
         user,
         isTokenActive,
         isDropdowned,
         openDropdown,
         closeDropdown,
         isDrowerOpen,
         drawer,
      }
   }
}

</script>
<style lang="scss" scoped>
a {
   width: 100%;
}
.header {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   z-index: 50;
   background-color: rgba(16, 29, 42, 0.7);
   box-shadow: 0 8px 32px rgb(2, 4, 24);
   border-bottom: 2px solid rgba(255, 255, 255, 0.09);
   transition: 0.2s ease-out;
   // .header__body
   &__body {
         height: 70px;
         display: flex;
         align-items: center;
         justify-content: space-between;
         gap: 30px;
         color: $blue;
      }
		// .header__logo
		&__logo {
         position: relative;
         z-index: 100;
         flex: 1 1 0%;
         
         img {
            height: 50px;
            width: 50px;
            object-fit: cover;
         }
         svg {
            height: 30px;
            width: 30px;
            path {
               fill: $blue;
            }
         }
         span {
            color: #007bee;
         }
      }
		// .header__nav
		&__nav {
      }

}
.nav {
       // nav__overlay
      &__overlay {
         position:fixed;
         top: 0;
         right: -100%;
         width: 100%;
         height: 100%;
         transition: all 0.3s ease 0s;
         z-index: 4;
         &.menu-open {
            right: 0%;
            background: rgba(0, 0, 0, 0.368);
            opacity: 1;
         }
      }
      // .nav__open
      &__open {
         display: none;
         @media (hover: none) {
            display: block;
            svg {
            width: 30px;
            height: 30px;
               path {
                  fill: $blue;
               }
            }
         }
      }

      &__body {
         position: relative;
         display: flex;
         gap: 30px;
         @media (hover: none) {
            flex-direction: column;
            position:fixed;
            top: 0%;
            width: 400px;
            height: 100%;
            right: -100%;
            overflow: auto;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
            background-color: rgba(10, 10, 10, 0.3);
            box-shadow: 0 8px 32px rgb(2, 4, 24);
            border-left: 2px solid rgba(255, 255, 255, 0.09);
            padding: 60px 15px 50px 15px;
            transition: all 0.3s ease 0s;
            z-index: 5;
            @media (max-width: 520px){
                 width: 220px;
            }
            &.menu-open  {
              right: 0%;
            }
         }
      }
      // .nav__close
      &__close {
         display: none;
         @media (hover: none) {
            display: flex;
            justify-content:center;
            align-items: center;
            position: absolute;
            top: 16px;
            right: 16px;
            padding: 10px;
            background-color: rgba(74, 111, 181, 0.3);
            border-radius: 5px;
            svg {
               width: 25px;
               height: 25px;
               path {
                  fill: $blue;
               }
            }
         }
      }
      // .nav__list
      &__list {
         display: flex;
         justify-content:center;
         align-items: center;
         flex-wrap: wrap;
         gap: 20px;
         @media (hover: none) {
            flex-direction: column;
            align-items: flex-start;
            justify-content: start;
            // order: 2;
         }
      }
      // .nav__link
      &__link {
         
      }
      // .nav__item
      &__item {
         display: flex;
         justify-content:center;
         align-items: center;
         gap: 10px;
         &:hover {
            span {
               color: $light;

            }
         }
         span {
            color: $white;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease 0s;
         }
         svg {
            display: none;
            width: 25px;
            height: 25px;
            transition: all 0.3s ease 0s;
            path {
                  fill: $blue;
            }
            @media (hover: none) {
               display: block;
            }
         }
      }
      // .nav__user
		&__user {

      }
}
.user-dropdown {
   position: relative;
   @media (hover: none) {
      display: flex;
      flex-direction: column;
      background-color: rgba(74, 111, 181, 0.3);
      margin: 0px -15px;
   }
		// .user-dropdown__button
		&__button {
         display: flex;
         align-items: center;
         gap: 7px;
         padding: 10px;
         border-radius: 5px;
         transition: all 0.3s ease 0s;
         margin-bottom: 15px;
         margin-top: 15px;
         width: 200px;
         max-width: 200px;
         @media (hover: none) {
            max-width: none;
            width: 100%;
            margin: 0;

         }
         &:hover {
            background-color: rgba(74, 111, 181, 0.3);
         }
      }
		// .user-dropdown__icon
		&__icon {
         img {
            width: 25px;
            height: 25px;
            object-fit: cover;
            border-radius: 50%;
            @media (hover: none) {
               width: 50px;
               height: 50px;
            }
         }
         svg {
            width: 25px;
            height: 25px;
            path {
               fill: $blue;
            }
         }
      }
		// .user-dropdown__account
		&__account {
         color: $white;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         max-width: 110px;
         @media (hover: none) {
            max-width: 150px;
         }
      }
		// .user-dropdown__chevron
		&__chevron {
         transition: transform 0.2s ease 0s;
         @media (hover: none) {
              display: none;
         }
         &.rotate {
            transform: rotate(180deg);
         }
         svg {
            width: 15px;
            height: 15px;
            path {
               fill: $blue;
            }
         }
      }
		// .user-dropdown__content
		&__content {
         position: absolute;
         left: 0%;
         width: 200px;
         padding: 20px;
         display: flex;
         flex-direction: column;
         gap: 20px;
         background: rgba(9, 33, 52, 1);
         box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
         border: 1px solid #323b48;
         border-radius: 5px;
         @media (hover: none) {
            position: relative;
            width: 100%;
            // order: 2;
            background: transparent;
            border: none;
            box-shadow: none;
            padding: 20px 15px;
            gap: 20px;
         }
      }
		// .user-dropdown__item
		&__item {
         display: flex;
         align-items: center;
         width: 100%;
         gap: 10px;
         color: $white;
         padding: 10px;
         border-radius: 5px;
         @media (hover: none) {
            padding: 0px;
            width: auto;
         }
         &:hover {
            background-color: rgb(42, 78, 108, 0.3);
            svg {
               path {
                  fill: $light;
               }
            }
            span {
               color: $light;
            }
         }
         svg {
            width: 25px;
            height: 25px;
            path {
               fill: $blue;
               transition: all 0.3s ease 0s;
            }
         }
         span {
            transition: all 0.3s ease 0s;
            @media (hover: none) {
               font-size: 18px;
               font-weight: 600;
            }
         }
      }
      // .user-dropdown__login
		&__login {
         width: 100%;
         align-items: center;
         gap: 5px;
         padding: 10px 15px;
         border-radius: 5px;
         background-color: $lightBlue;
         color: $white;
         font-weight: 700;
         transition: background-color 0.3s ease 0s;
         &:hover {
            background-color: #007bee;
         }
      }
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s cubic-bezier(0.68, 0.16, 0.42, 0.75);
}

.fade-enter-from,
.fade-leave-to {
   transform: scale(1.1);
   // transform: translateY(100%);
   opacity: 0;
}

</style>