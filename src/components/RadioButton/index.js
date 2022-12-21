const RadioButton = props => {
  const {radioItem} = props
  const {salaryRangeId, label} = radioItem

  return (
    <li>
      <input type="radio" id={label} name="salary" value={salaryRangeId} />
      <label htmlFor={label}> {label} </label>
    </li>
  )
}

export default RadioButton
