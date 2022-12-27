<template>
  <div>
    <main class="user">
      <div class="container">
        <div class="both">
          <section class="user__image">
            <div class="user__image-container">
                <div class="user__image-avatar">
                    <img :src="user.avatar" alt="user avatar">
                </div>
            </div>
          </section>
          <section class="user__about">
            <div class="user__about-container">
              <div class="user__about-name">Leha</div>
              <div class="user__about-last-name">Abramec</div>
            </div>
          </section>
        </div>
        <section class="user__info">
          <div class="user__info-container">
            <div class="user__info-discription">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sint. Hic repellendus aperiam a maiores blanditiis culpa odit suscipit similique repudiandae. Incidunt, temporibus ipsum fuga asperiores unde placeat facere ducimus eum quam quae sunt ab dolorum officiis a nobis mollitia tempora? Cupiditate, debitis doloribus nihil unde iste magnam libero perferendis repellendus corrupti placeat tempora praesentium nam dolores laborum est voluptatem magni iusto quidem exercitationem numquam corporis provident! Id repudiandae quae esse distinctio quibusdam nulla, et iste nam perspiciatis nisi cupiditate.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
<script>
// import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted, ref} from 'vue'

export default {
  setup() {
    //   const router = useRouter()
      const store = useStore()
      const user = ref({})
      
      onMounted( async () => {
        user.value = await store.dispatch('auth/toUser')
      })
      
      console.log(user);

      return {
        //   logout: () => {
        //       store.commit('auth/logout')
        //       router.push('/auth')
        //   },
          user
      }
  }
}
</script>
<style lang="scss" scoped>
  .user {
    display: flex;
    justify-content: center;
    padding: 150px;
    width: 100%;
    height: 100%;
		// .user__image

		&__image {
      
		}

		// .user__image-container

		&__image-container {
		}

		// .user__image-avatar

		&__image-avatar {
      img {
      width: 150px;
      border-radius: 50%;
      }
		}

		// .user__about

		&__about {
      font-size: 30px;
		}

		// .user__about-container

		&__about-container {
      margin: 0px 0px 0px 10px;
      
		}

		// .user__about-name

		&__about-name {
      
		}

		// .user__about-last-name

		&__about-last-name {
		}

		// .user__info

		&__info {
      max-width: 800px;
      padding: 10px;
      font-size: 18px;
      border-radius: 10px;
      background: rgba(34, 28, 54, 0.81);
		}

		// .user__info-container

		&__info-container {
		}

		// .user__info-discription

		&__info-discription {
		}
}
.container {
  // position: absolute;
  // top: 150px;
  // left: 400px;
  max-width: 1000px;
}
.both {
  display: flex;
  align-items: center;
  margin: 0px 0px 30px 0px;
  
}


</style>

        