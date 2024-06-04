import PropTypes from 'prop-types'

const UserInfo = ({ name, handleLogout }) => {
  //console.log(name)
  return <>
    <span>{`${name} logged in`}</span>
    <button type='button' onClick={handleLogout}>logout</button>
    <br />
    <br />
  </>
}
UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}
export default UserInfo