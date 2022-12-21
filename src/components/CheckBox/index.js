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
  const {checkItem} = props
  const {label, employmentTypeId} = checkItem

  return (
    <li>
      <input
        type="checkbox"
        id={label}
        name="salary"
        value={employmentTypeId}
      />
      <label htmlFor={label}> {label} </label>
    </li>
  )
}

export default CheckBox
