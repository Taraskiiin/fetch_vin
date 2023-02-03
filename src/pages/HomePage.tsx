import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
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
			.matches(regex, 'Not Valid Symbol!')
			.min(17, 'Too Short!')
			.max(17, 'Too Long!')
			.required('Required'),
	})

	const onSubmit = (vin: string) => {
		dispatch(addElement(vin))
		navigate('/info')
	}

	return (
		<div className="form-block">
			<Formik
				initialValues={{
					VIN: '',
				}}
				validationSchema={SearchSchema}
				onSubmit={values => {
					onSubmit(values.VIN)
				}}>
				{({ errors, touched }) => (
					<Form className="formik-form">
						<Field
							name="VIN"
							component={InputComponents}
							placeholder="&nbsp;"
						/>
						{errors.VIN && touched.VIN ? (
							<div className="input-error">{errors.VIN}</div>
						) : null}
						<button type="submit" className="submit-btn">
							<FontAwesomeIcon icon={faLongArrowAltRight} />
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default NotFoundPage
