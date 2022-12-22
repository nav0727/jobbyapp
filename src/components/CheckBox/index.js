/*  <div>
              <input
                type="checkbox"
                id="full"
                name="Employment"
                value="Full Time"
              />
              <label htmlFor="full">Full Time</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="part"
                name="Employment"
                value="Part Time"
              />
              <label htmlFor="part">Part Time</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="freelance"
                name="Employment"
                value="Freelance"
              />
              <label htmlFor="freelance">Freelance</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="intern"
                name="Employment"
                value="Internship"
              />
              <label htmlFor="intern">Internship</label>
            </div>
        */

const CheckBox = props => {
  const {checkItem, onChangeEmploy} = props
  const {label, employmentTypeId} = checkItem

  const updateEmploy = () => {
    onChangeEmploy(employmentTypeId)
  }

  return (
    <li>
      <input
        type="checkbox"
        id={employmentTypeId}
        name="employment"
        value={employmentTypeId}
        onChange={updateEmploy}
      />
      <label htmlFor={employmentTypeId}> {label} </label>
    </li>
  )
}

export default CheckBox
