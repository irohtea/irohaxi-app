<template>
    <main class="settings">
        <div class="settings__container">
            <!-- <div v-if="isLoader" class="settings__loader">
                <Loader></Loader>
            </div> -->
            <div class="settings__body">
                <div class="settings__upper">
                    <div class="settings__upper-profile">
                        <div class="settings__image-profile">
                            <img class="settings__avatar" :src="getData.avatar" alt="profile-image">
                            <label for="img">
                                <img src="../assets/img/camera.png" alt="camera">
                                <input
                                    id="img"
                                    type="file"
                                    name="picture"
                                    accept="image/png, image/jpg"
                                    @change="editImage"
                                />
                            </label>
                        </div>
                    </div>
                    <aside class="settings__sidebar">
                        <div class="settings__navigation">
                            <router-link to="/settings/account"> 
                                <div class="settings__item"> 
                                    <div class="settings__icon">
                                        <svg width="20px" height="20px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="profile_x2C__person"> <g> <g> <g>
                                            <path d="M16,31C7.729,31,1,24.271,1,16S7.729,1,16,1s15,6.729,15,15S24.271,31,16,31z M16,2C8.28,2,2,8.28,2,16      s6.28,14,14,14s14-6.28,14-14S23.72,2,16,2z" fill="#fff"/> </g> </g> </g> <g> <g id="team_3_"> <g> <g> <g> <g>
                                            <path d="M23.64,20.713l-4.762-1.652l-0.323-2.584c-0.215,0.307-0.523,0.546-0.924,0.671l0.293,2.345         c0.023,0.189,0.152,0.349,0.332,0.41l5.055,1.756c0.9,0.314,1.689,1.427,1.689,2.381v-0.007c0,0.276,0.224,0.5,0.5,0.5         c0.275,0,0.499-0.223,0.5-0.498C25.997,22.656,24.94,21.168,23.64,20.713z" fill="#fff"/> </g> </g> </g> </g> <g> <g> <g> <g>
                                            <path d="M6.5,24.532c-0.276,0-0.5-0.224-0.5-0.5v0.007c0-1.379,1.059-2.871,2.359-3.326l4.762-1.641         l0.012-0.28c0.034-0.274,0.289-0.465,0.559-0.434c0.273,0.034,0.468,0.284,0.434,0.559l-0.051,0.589         c-0.023,0.189-0.153,0.348-0.333,0.41l-5.054,1.742C7.789,21.973,7,23.086,7,24.039v-0.007C7,24.309,6.776,24.532,6.5,24.532         z" fill="#fff"/> </g> </g> </g> </g> <g> <g> <g> <g> <g>
                                            <path d="M16,18.039c-2.779,0-4.192-1.844-4.201-6.469c-0.002-1.174,0.123-2.363,1.227-3.469          C13.729,7.396,14.729,7.039,16,7.039s2.271,0.357,2.975,1.063c1.104,1.105,1.229,2.295,1.227,3.469          C20.192,16.195,18.779,18.039,16,18.039z M16,8.039c-1.009,0-1.75,0.252-2.267,0.769c-0.632,0.633-0.938,1.2-0.935,2.761          c0.008,4.018,1.055,5.471,3.201,5.471s3.193-1.453,3.201-5.471c0.003-1.561-0.303-2.128-0.935-2.761          C17.75,8.291,17.009,8.039,16,8.039z" fill="#fff"/> </g> </g> </g> </g> </g> </g> </g> </g>
                                        </svg>
                                    </div>
                                    <p class="settings__item-name">Account</p> 
                                </div> 
                            </router-link> 
                        </div>
                    </aside>
                </div>
                <div class="settings__tools">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
export default {
    setup() {
        const store = useStore()

        const avatar = ref([])
        const user = ref({})
        const isLoader = ref(true)
        const getData = computed(() => store.state.auth.myData)
        const editImage = async function(event) {
            const formData = new FormData()
            avatar.value = event.target.files[0]
            formData.append('file', avatar.value)
            store.state.auth.myData = await store.dispatch('edit/uploadImage', formData)
        }

        return {
            editImage,
            user,
            avatar,
            isLoader,
            getData
        }
    },
    components: {
        // Loader
    }
}
</script>
<style lang="scss" scoped>
.settings {
    &__loader {
        display: flex;
        align-items: center;
        height: 100vh;
    }
    &__body {
        display: flex;
        border-radius: 10px;
        padding: 0px;
        background-color: rgba(10, 10, 10, 0.3);
        height: 700px;
        margin: 50px 0px 0px 0px;
        @media (max-width: 560px){
            display: flex;
            flex-direction: column;
            justify-content:center;
            align-items: center;
        }
    }
   
    // .settings__header

    &__upper {
        display: flex;
        width: 100%;
        flex: 0 0 29%;
        flex-direction: column;
    }

    &__upper-profile {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 200px;
        border-right: 2px solid rgba(255, 255, 255, 0.09);
        border-bottom: 2px solid rgba(255, 255, 255, 0.09);
        @media (max-width: 560px){
            border: none;
        }
        
    }

    &__avatar {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    &__image-profile {
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-end; 
        label {
            position: absolute;
            margin: 0px 20px 0px 0px;
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
            }
            input {
                display: none;
            }
        }
        
    }
    // .settings__username
    &__item-name {
        font-size: 20px;
    }

    // .settings__sidebar

    &__sidebar {
        border-right: 2px solid rgba(255, 255, 255, 0.09);
        height: 100%;
        @media (max-width: 560px){
              border: none;
        }
    }

    // .settings__navigation

    &__item {
        display: flex;
        align-items: center;
        color: #fff;
        text-decoration: none;
        padding: 5px 0px 5px 20px;
        &:hover {
            color: $light;
            background-color: rgba(79, 103, 139, 0.16);
            border-right: 5px solid $light;
            box-shadow: 0 0 2px $light;
            transition: all 0.4s ease 0s;
            .settings__icon {
                svg {
                    path {
                        fill: $light;
                        transition: all 0.4s ease 0s;
                    }
                }
            }
        }
        
    }
    .settings__icon {
        display: flex;
        align-items: center;
        svg {
            margin-right: 5px;
            @media (max-width: 560px) {
                display: none;
            } 
        }
    }

    &__tools {
        width: 100%;
    }
}
</style>