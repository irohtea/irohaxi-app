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
      yup.string().trim().required().email()
   )

   const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
      'password',
      yup.string().trim().required().min(3)
   )

   const onSubmit = handleSubmit(async (values) => {
      await store.dispatch('auth/login', values)
      router.push('/user')
         .then(() => { router.go() })
   })
   return {
      onSubmit,
      email, eError, eBlur,
      password, pError, pBlur
   }
}