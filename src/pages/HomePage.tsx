import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

const NotFoundPage = () => {
	const SearchSchema = Yup.object().shape({
		VIN: Yup.string()
			.min(17, 'Too Short!')
			.max(17, 'Too Long!')
			.required('Required'),
	})

	return (
		<>
			<Formik
				initialValues={{
					VIN: '',
				}}
				validationSchema={SearchSchema}
				onSubmit={values => {
					// same shape as initial values
					console.log(values.VIN.length)
				}}
			>
				{({ errors, touched }) => (
					<Form>
						<Field name="VIN" />
						{errors.VIN && touched.VIN ? (
							<div>{errors.VIN}</div>
						) : null}
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default NotFoundPage
