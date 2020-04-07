import { companyKeyValues } from './company-key-value'

const genderObj = {
	0: 'آقا',
	1: 'خانم',
	2: 'مهم نیست'
}


const jobCategoryObj = {
	0: 'Backend Developer',
	1: 'Frontend Developer',
	2: 'برنامه نویس موبایل',
	3: 'UI/UX',
	4: 'Test Development',
	5: 'Devops',
	6: 'برنامه نویس',
	7: 'مدیریت پروزه',
	8: 'CTO',
	9: 'Industry',
	10: 'طراحی',
	11: 'تولید محتوا',
	12: 'کسب و کار',
	13: 'مالی',
	14: 'آموزش',
	15: 'معماری',
	16: 'مکانیک',
	17: 'صنایع',
	18: 'روانشناسی',
}

const cooperationTypeObj = {
	0: 'پاره وقت',
	1: 'تمام وقت',
	2: 'کار آموزی',
	3: 'دور کاری'
}

export const jobKeyValues = {
	jobCategoryObj,
	cooperationTypeObj,
	genderObj,
	companyTypeObj: companyKeyValues.companyTypeKeyValue

}