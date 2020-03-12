import React, { useState } from 'react'
import { useChipsStyles } from './styles'
import { Typography, Chip } from '@material-ui/core'
import { jobKeyValues } from '../../../shared/key-value/job-key-value'

function Chips(props) {
	const [keyValues] = useState(jobKeyValues)
	const classes = useChipsStyles()

	const GetValueByNameAndKey = (prop) => {
		if (!props.job.id)
			return ''
		switch (prop.type) {
			case 1:
				return <Typography>
					{keyValues.cooperationTypeKeyValue.find(({ key }) => key === props.job.cooperationTypeIndex).value}
				</Typography>
			case 2:
				return <Typography>
					{keyValues.jobCategoryKeyValue.find(({ key }) => key === props.job.categoryTypeIndex).value}
				</Typography>
			case 3:
				return <Typography>
					{keyValues.genderKeyValue.find(({ key }) => key === props.job.requiredGenderTypeIndex).value}
				</Typography>
			case 4:
				return <Typography>
					{keyValues.companyCategoryTypeKeyValue.find(({ key }) => key === props.job.company.categoryTypeIndex).value}
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
					<div><Chip size="small" label={<GetValueByNameAndKey type={1}></GetValueByNameAndKey>} /></div>
				</div>
				<div className={classes.item}>
					<div>دسته بندی شغلی</div>
					<div><Chip size="small" label={<GetValueByNameAndKey type={2}></GetValueByNameAndKey>} /></div>
				</div>
			</div>
			<div className={classes.chipRow2}>
				<div className={classes.item}>
					<div>جنسیت</div>
					<div><Chip size="small" label={<GetValueByNameAndKey type={3}></GetValueByNameAndKey>} /></div>
				</div>
				<div className={classes.item}	>
					<div>دسته بندی شرکت</div>
					<div><Chip size="small" label={<GetValueByNameAndKey type={4}></GetValueByNameAndKey>} /></div>
				</div>
			</div>
		</div>
	)
}

export { Chips }