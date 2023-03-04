<template>
   <main class="message">
      <div class="message__container">
         <div class="message__body">
            <h2 class="message__title">You are succsessfully registered!</h2>
            <p class="message__text">
               Please, check your email to activate your account
            </p>
            <div class="message__icon">
               <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3897 0.659974C11.3205 0.591577 11.2271 0.553223 11.1297 0.553223C11.0324 0.553223 10.939 0.591577 10.8697 0.659974L3.99974 8.38997L1.08974 6.05997C1.05206 6.02156 1.00664 5.99158 0.956498 5.97203C0.906357 5.95249 0.852636 5.94381 0.798891 5.94659C0.745146 5.94936 0.692603 5.96352 0.644741 5.98812C0.596878 6.01273 0.554787 6.04722 0.521256 6.08931C0.487724 6.13141 0.463515 6.18014 0.450233 6.23229C0.43695 6.28445 0.434896 6.33882 0.444207 6.39183C0.453518 6.44483 0.473982 6.49526 0.504243 6.53976C0.534505 6.58426 0.573874 6.62183 0.619744 6.64997L3.84974 9.19997C3.92019 9.26606 4.01315 9.30285 4.10974 9.30285C4.20633 9.30285 4.2993 9.26606 4.36974 9.19997L11.4297 1.19997C11.4629 1.16206 11.4883 1.11792 11.5042 1.07013C11.5202 1.02234 11.5265 0.971852 11.5228 0.9216C11.5191 0.871349 11.5054 0.822338 11.4825 0.777423C11.4597 0.732507 11.4282 0.692583 11.3897 0.659974Z" fill="black"/>
               </svg>
            </div>
      </div>
      </div>
   </main>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.message {
   background-color: rgba(20, 63, 101, 0.3);
   height: 100vh;
   display: flex;
   justify-content:center;
   align-items: center;
		// .message__body
		&__body {
         display: flex;
         flex-direction: column;
         text-align: center;
         min-height: 300px;
         padding: 32px 16px;
         backdrop-filter: blur(3px);
         -webkit-backdrop-filter: blur(3px);
         background-color: rgba(8, 31, 52, 0.3);
         box-shadow: 0 8px 32px rgb(2, 4, 24);
         border-right: 2px solid rgba(255, 255, 255, 0.09);
         border-radius: 15px;
      }
		// .message__title
		&__title {
         color: $light;
         font-size: 34px;
         margin-bottom: 30px;
         @media (max-width: 425px){
              font-size: 24px;
         }
      }
		// .message__text
		&__text {
         font-size: 24px;
         margin-bottom: 30px;
         @media (max-width: 425px){
              font-size: 20px;
         }
      }
		// .message__icon
		&__icon {
         text-align: center;
         svg {
            width: 100px;
            height: 100px;
            path {
               fill: $light;
            }
         }
      }

}

</style>