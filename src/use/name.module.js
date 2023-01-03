import * as yup from 'yup'
import { useField } from 'vee-validate'

export function firstAndLastName() {
	
	const {value: fName, errorMessage: fError, handleBlur: fBlur } = useField(
		'firstName',
		yup.string().trim().required('Name cannot be empty!').min(1, 'Name cannot be less than 1 letter')
		)
	const {value: sName, errorMessage: sError, handleBlur: sBlur } = useField(
		'lastName',
		yup.string().trim().required('Surname cannot be empty!').min(1, 'Surename cannot be less than 1 letter')
	)

	return {
		fName, fError, fBlur,
		sName, sError, sBlur,
	}
}