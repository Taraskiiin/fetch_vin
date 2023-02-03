import React, { FormEvent, useState } from 'react'
import { useAppSelector } from '../store/hooks'

import '../styles/components/InputComponents.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InputComponents: React.FC<any> = ({ field, ...props }) => {
	const [search, setSearch] = useState<string>('')
	const searchList = useAppSelector<string[]>(state => state.searchList)

	const handleOnChange = (event: FormEvent) => {
		setSearch((event.target as HTMLTextAreaElement).value)
	}

	field.value = search
	props.form.values.VIN = search

	return (
		<div className="input-block">
			<input
				type="text"
				{...field}
				{...props}
				onChange={handleOnChange}
				autoComplete="off"
				id="vin"
				className="vin_field"
			/>
			<label htmlFor="vin" className="form__label">
				your VIN:
			</label>
			<div className="dropdown">
				{searchList.length > 0 &&
					search !== '' &&
					searchList
						.filter((item: string) => {
							const searchTerm = item.toLowerCase()
							const searchLowerCase = search.toLowerCase()

							return searchTerm.includes(searchLowerCase)
						})
						.map((item: string, index: number) => (
							<div
								key={index}
								className="dropdown-row"
								onClick={() => setSearch(item)}>
								{item}
							</div>
						))}
			</div>
		</div>
	)
}

export default InputComponents
