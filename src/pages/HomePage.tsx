import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { addElement } from '../store/searchListSlice'

import '../styles/HomePage.css'

const NotFoundPage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
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
					dispatch(addElement(values.VIN))
					navigate('/info')
				}}
			>
				{({ errors, touched }) => (
					<Form className="formik-form">
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
