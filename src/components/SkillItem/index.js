import './index.css'

const SkillItem = props => {
  const {skillItem} = props
  const {name, skillLogo} = skillItem

  return (
    <li className="skill-list-container">
      <img src={skillLogo} alt="job details company logo" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
