import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { addElement } from '../store/searchListSlice'
import { regex } from '../constants/regex'
import InputComponents from '../components/InputComponents'

import '../styles/pages/HomePage.css'

const NotFoundPage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const SearchSchema = Yup.object().shape({
		VIN: Yup.string()
			// .matches(regex, 'Not Valid Symbol!')
			.min(17, 'Too Short!')
			.max(17, 'Too Long!')
			.required('Required'),
	})

	const onSubmit = (vin: string) => {
		dispatch(addElement(vin))
		navigate('/info')
	}

	return (
		<>
			<Formik
				initialValues={{
					VIN: '',
				}}
				validationSchema={SearchSchema}
				onSubmit={values => {
					onSubmit(values.VIN)
				}}
			>
				{({ errors, touched }) => (
					<Form className="formik-form">
						<Field
							name="VIN"
							component={InputComponents}
							placeholder="VIN"
						/>
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
