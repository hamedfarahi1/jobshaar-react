import React, { useState } from 'react'
import { useChipsStyles } from './styles'
import { Typography, Chip } from '@material-ui/core'
import { jobKeyValues } from '../../../shared/key-value/job-key-value'

function Chips({ job }) {
	const [keyValues] = useState(jobKeyValues)
	const classes = useChipsStyles()

	const GetValueByNameAndKey = ({ type }) => {
		if (!job.id)
			return ''
		switch (type) {
			case 1:
				return <Typography>
					{keyValues.cooperationTypeObj[job.cooperationTypeIndex]}
				</Typography>
			case 2:
				return <Typography>
					{keyValues.jobCategoryObj[job.categoryTypeIndex]}
				</Typography>
			case 3:
				return <Typography>
					{keyValues.genderObj[job.requiredGenderTypeIndex]}
				</Typography>
			case 4:
				return <Typography>
					{keyValues.companyTypeObj[job.company.categoryTypeIndex]}
				</Typography>
			default:
				return ''
		}
	}

	return (
		<div className={classes.chipContainer}>
			<div className={classes.chipRow1}>
				<div className={classes.item}>
					<div>نوع بازه زمانی</div>
					<div><Chip color='secondary' size="small" label={<GetValueByNameAndKey type={1}></GetValueByNameAndKey>} /></div>
				</div>
				<div className={classes.item}>
					<div>دسته بندی شغلی</div>
					<div><Chip color='secondary' size="small" label={<GetValueByNameAndKey type={2}></GetValueByNameAndKey>} /></div>
				</div>
			</div>
			<div className={classes.chipRow2}>
				<div className={classes.item}>
					<div>جنسیت</div>
					<div><Chip color='secondary' size="small" label={<GetValueByNameAndKey type={3}></GetValueByNameAndKey>} /></div>
				</div>
				<div className={classes.item}	>
					<div>دسته بندی شرکت</div>
					<div><Chip color='secondary' size="small" label={<GetValueByNameAndKey type={4}></GetValueByNameAndKey>} /></div>
				</div>
			</div>
		</div>
	)
}

export { Chips }