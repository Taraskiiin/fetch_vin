import { useAppSelector } from '../store/hooks'
import IDescription from '../interfaces/description'

const useDescription = (id: number) => {
	const descriptionList = useAppSelector<IDescription[]>(
		state => state.descriptionList.descriptionList,
	)

	const correctElem = descriptionList.find(
		(element: IDescription) => element.ID === id,
	)

	if (!correctElem) {
		return `<p>Can't find this description</p>`
	}

	return correctElem.Description
}

export default useDescription
