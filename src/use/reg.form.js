// import { computed, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'


export function useRegForm() {
   // const router = useRouter()
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

   const register = handleSubmit(async (values) => {
      await store.dispatch('reg/register', values)
   })
   return {
      register,
      email, eError, eBlur,
      password, pError, pBlur
   }
}