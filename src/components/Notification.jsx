const Notification = ({ notification }) => {
  if (notification === null) {
    return
  }
  return (
    <div style={notification.type === 'success' ?
      { color: 'green', border: '2px solid green', padding: '5px', margin: '20px' } :
      { color: 'red', border: '2px solid red', padding: '5px', margin: '20px' }}>
      <span >
        {notification.message}
      </span>
    </div>
  )



}

export default Notification