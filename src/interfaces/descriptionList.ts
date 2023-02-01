import IDescription from './description'

export default interface IDescriptionList {
	descriptionList: IDescription[] | []
	status: string | null
	error?: string
}
