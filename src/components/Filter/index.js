const Filter = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    onChangeSalary,
    onChangeEmploy,
  } = props

  const onChangeSalaryRangeFilter = event => {
    onChangeSalary(event.target.value)
  }

  const onChangeEmployment = event => {
    // onChangeEmploy(event.target.value)

    let updateEmployTypeList
    if (event.target.checked) {
      updateEmployTypeList = [event.target.value]
      updateEmployTypeList.push(event.target.value)
    } else {
      updateEmployTypeList = [event.target.value]
      const selectIndex = updateEmployTypeList.findIndex(
        each => each === event.target.value,
      )
      updateEmployTypeList.splice(selectIndex, 1)
    }

    onChangeEmploy(updateEmployTypeList)
  }

  const renderEmployTypeFilter = () => (
    <div className="filter-container-check">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="ul-list-con">
        {employmentTypesList.map(eachItem => {
          const {label, employmentTypeId} = eachItem

          return (
            <li key={eachItem.employmentTypeId}>
              <input
                type="checkbox"
                id={eachItem.employmentTypeId}
                onChange={onChangeEmployment}
                name="employ"
                value={employmentTypeId}
              />
              <label htmlFor={employmentTypeId}> {label} </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderSalaryRangeFilter = () => (
    <div className="filter-container-check">
      <h1 className="filter-heading"> Salary Range</h1>

      <ul className="ul-list-con">
        {salaryRangesList.map(each => {
          const {label, salaryRangeId} = each
          return (
            <li key={each.salaryRangeId}>
              <input
                type="radio"
                id={each.salaryRangeId}
                onClick={onChangeSalaryRangeFilter}
                value={salaryRangeId}
                name="salary"
              />
              <label htmlFor={salaryRangeId} name="salary">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <>
      {renderEmployTypeFilter()}
      <hr className="hr-line" />

      {renderSalaryRangeFilter()}
    </>
  )
}

export default Filter
