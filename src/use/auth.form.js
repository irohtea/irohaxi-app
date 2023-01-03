// import { computed, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export function useAuthForm() {
   const router = useRouter()
   const store = useStore()

   const { handleSubmit } = useForm()
   // isSubmitting, submitCount
   const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
      'email',
      yup.string().trim().required('This is a required field!').email('This must be a valid email!')
   )

   const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
      'password',
      yup.string().trim().required('This is a required field!').min(8, 'This must be at least 8 characters!')
   )

   const onSubmit = handleSubmit(async (values) => {
      try {
         await store.dispatch('auth/login', values)
         router.push('/user')
         .then(() => { router.go() })
      } catch(e) {
         console.log();
      }
   })
   return {
      onSubmit,
      email, eError, eBlur,
      password, pError, pBlur
   }
}